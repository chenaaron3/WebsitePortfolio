import React from 'react';
import "./Terminal.css"
import fileSystem from "./data/terminalFileSystem.json"
import systemsResume from '../Documents/systems.pdf';
import webDevResume from '../Documents/webDev.pdf';

class Terminal extends React.Component {
    static defaultProps = {
        welcomeMessage: <>Type '<span className="terminal-command">help</span>' to get a list of commands.</>,
        prompt: "$",
        user: "aaron@portolio",
        errorMessage: (command) => `Command '${command}' not found!`,
    }

    // show command values
    helpCommand = (args) => {
        Object.keys(this.state.commands).forEach(command => {
            let value = this.state.commands[command];
            this.pushText(<><span className="terminal-command">{command}</span>{value.usage ? value.usage : ""}: {value.description}</>);
        })
        this.setState({inputAvailable:true});
    }

    // clear state and buffer
    clearCommand = (args) => {
        this.setState({
            lines: [],
            inputValue: ""
        });
        this.buffer = [];
        this.setState({inputAvailable:true});
    }

    // change the directory
    cdCommand = (args) => {
        let dir = args[0];
        // no arg
        if (!dir) {
            return "Please provide a directory!";
        }
        let success, newDir, newDirRef, err;
        // resolve the path
        [success, newDir, newDirRef, err] = this.getDirectory(dir);
        if (!success) {
            return err;
        }
        else {
            this.setState({ currentDirectory: newDir, currentDirectoryRef: newDirRef });
        }
        this.setState({inputAvailable:true});
    }

    // list directory
    lsCommand = (args) => {
        let dirRef = this.state.currentDirectoryRef;
        // given a path as arg
        if (args[0]) {
            let success, newDir, newDirRef, err;
            // resolve the path
            [success, newDir, newDirRef, err] = this.getDirectory(args[0]);
            if (!success) {
                return err;
            }
            else {
                dirRef = newDirRef;
            }
        }
        // return a prettified version of each file/directory
        return (
            <div className="terminal-ls">
                {Object.keys(dirRef).map((value, index) => {
                    if (value == ".."){
                        return;
                    }
                    if (typeof this.state.currentDirectoryRef[value] === "object") {
                        return <span key={index} className="terminal-directory">{value}</span>
                    }
                    else {
                        return <span key={index} className="terminal-file">{value}</span>
                    }
                })}
            </div>);
    }

    // display file contents
    catCommand = (args) => {
        if (!args[0]) {
            return "Please provide a file!";
        }
        let directory = args[0].split("/");
        let file = directory.pop();
        let success, newDir, newDirRef, err;
        // resolve the path
        [success, newDir, newDirRef, err] = this.getDirectory(directory.join("/"));
        if (!success) {
            return err;
        }
        // file exists
        if (newDirRef.hasOwnProperty(file)) {
            // is type file
            if (typeof newDirRef[file] === "string") {
                // get current directory
                let directoryStack = newDir.split("/")
                let currentDirectory = directoryStack[directoryStack.length - 1]
                // open resumes in new window
                if (currentDirectory === "Resumes") {
                    let resume;
                    if(file == 'systems') {
                        resume = systemsResume;
                    }
                    else if (file == 'webDev') {
                        resume = webDevResume;
                    }
                    window.open(resume, "_blank")
                    this.setState({inputAvailable:true});
                    return;
                }
                // get string content
                let contents = newDirRef[file];
                // make api call
                if (contents.charAt(0) === "/") {
                    let ref = this;
                    // form component based on api call
                    fetch(contents)
                        .then(res => res.json())
                        .then(json => {
                            Object.keys(json).forEach(key => {
                                let text = json[key].toString();
                                text = text.includes("http") || text.charAt(0) == "/" ? <a href={text} target="_blank" rel="noopener noreferrer" className="terminal-link">{text}</a> : text;
                                this.pushText(<>
                                    <span className="terminal-file terminal-usage">
                                        {key}
                                    </span>
                                    : {text}
                                </>);
                            });
                            this.flush();
                            this.setState({inputAvailable:true}, this.focusInput);
                        })
                        .catch(err => {
                            console.log(err)
                            this.setState({inputAvailable:true}, this.focusInput);
                        })
                }
                else {
                    return contents;
                }
            }
            else {
                return `'${file}' is a directory not a file!`
            }
        }
        // not found
        else {
            return `'${file}' does not exist!`
        }
    }

    // create an empty directory
    mkdirCommand = (args) => {
        let dir = args[0];
        // no arg
        if (!dir) {
            return "Please provide a name for the directory!";
        }
        // alphanumeric only
        else if (dir.match(/[A-Za-z0-9]/g)) {
            // create empty directory
            this.state.currentDirectoryRef[dir] = { "..": this.state.currentDirectoryRef }
            this.setState({inputAvailable:true});
        }
        else {
            return `Directory name must be in alphanumeric form!`
        }
    }

    // gets full path from relative path
    getDirectory = (path) => {
        let directories = path.split("/");
        let newDirectory = this.state.currentDirectory.split("/");
        let newDirectoryRef = this.state.currentDirectoryRef;
        // check if first directory is home
        if (path.length > 0) {
            // synonymous for home directory
            if (path.charAt(0) == "/" || path.charAt(0) == "~") {
                newDirectoryRef = this.root;
                newDirectory = ["~"];
                directories.shift();
            }
        }
        // process each directory
        while (directories.length > 0) {
            let directory = directories[0]
            if (directory == "." || directory == "") {
                // stay in current directory
            }
            // move up directory
            else if (directory == "..") {
                // move ref to its parent
                newDirectoryRef = newDirectoryRef[".."];
                // only pop if not root directory
                if (newDirectory.length > 1)
                    newDirectory.pop();
            }
            // move down directory
            else if (newDirectoryRef.hasOwnProperty(directory)) {
                if (typeof newDirectoryRef[directory] === "object") {
                    newDirectoryRef = newDirectoryRef[directory];
                    newDirectory.push(directory)
                }
                else {
                    return [false, undefined, undefined, `${directory} is a file not a directory!`];
                }
            }
            else {
                return [false, undefined, undefined, `${directory} does not exist!`];
            }
            // move to next directory
            directories.shift();
        }
        return [true, newDirectory.join("/"), newDirectoryRef, undefined];
    }

    // links parents starting from the root node
    initFileSystem = () => {
        let root = this.root;
        this.linkParent(root, root)
    }

    // sets the ".." value to be the parent
    linkParent = (node, parent) => {
        if (!node) {
            return;
        }
        else if (typeof node === "string") {
            return;
        }
        else if (typeof node === "object") {
            node[".."] = parent;
            Object.keys(node).forEach(key => {
                if (key != "..") {
                    this.linkParent(node[key], node)
                }
            });
        }
    }

    constructor(props) {
        super(props)
        this.buffer = [];
        this.history = [""];
        this.historyIndex = 0;
        this.directoryRefStack = [];
        this.terminalRoot = React.createRef();
        this.terminalInput = React.createRef();
        this.root = fileSystem;
        this.initFileSystem();
        this.executableFunction = undefined;
        this.state = {
            lines: [],
            inputValue: "",
            inputAvailable: true,
            currentDirectory: "~",
            currentDirectoryRef: this.root,
            commands: {
                ...this.props.commands,
                help: {
                    fn: this.helpCommand,
                    description: "List available commands."
                },
                clear: {
                    fn: this.clearCommand,
                    description: "Empty the terminal."
                },
                ls: {
                    fn: this.lsCommand,
                    description: "List directory contents.",
                    usage: <> [<span className="terminal-directory terminal-usage">Directory</span>]</>
                },
                cd: {
                    fn: this.cdCommand,
                    description: "Change directories.",
                    usage: <> [<span className="terminal-directory terminal-usage">Directory</span>]</>
                },
                cat: {
                    fn: this.catCommand,
                    description: "Display file contents.",
                    usage: <> [<span className="terminal-file terminal-usage">file</span>]</>
                },
                mkdir: {
                    fn: this.mkdirCommand,
                    description: "Make a directory",
                    usage: <> [String]</>
                }
            }
        };
    }

    // print the welcome message and focus on the terminal
    componentDidMount() {
        this.pushText(this.props.welcomeMessage);
        this.flush();
        this.focusInput();
    }

    // keep the terminal scrolled to the bottom
    scrollToBottom = () => {
        const rootNode = this.terminalRoot.current;
        setTimeout(() => { rootNode.scrollTop = rootNode.scrollHeight }, 1);
    }

    // focus on the terminal input
    focusInput = () => {
        this.terminalInput.current.focus();
    }

    // get the JSX prompt component
    getPromptComponent = () => {
        return (<span className="terminal-prompt">
            {`${this.props.user}:${this.state.currentDirectory}${this.props.prompt}`}
        </span>);
    }

    // checks import key presses
    processKey = (e) => {
        // execute command
        if (e.key === 'Enter') {
            if (this.executableFunction) {
                // echo without prompt
                this.pushText(<span className="terminal-input">{this.state.inputValue}</span>);
                // execute with input
                this.executableFunction(this.state.inputValue);
                this.flush();
            }
            else {
                this.processCommand(this.state.inputValue);
            }
        }
        else if (e.key === 'Tab') {
            e.preventDefault();
            this.tabComplete();
        }
        // go up history
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.historyIndex = Math.max(0, this.historyIndex - 1);
            this.setState({ inputValue: this.history[this.historyIndex] });
        }
        // go down history
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.historyIndex = Math.min(this.history.length - 1, this.historyIndex + 1);
            this.setState({ inputValue: this.history[this.historyIndex] });
        }
    }

    // updates the input value
    handleChange = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    // tab complete
    tabComplete = () => {
        let words = this.state.inputValue.split(" ");
        if (words.length == 0) {
            return;
        }
        // get the last word to complete
        let lastWord = words.pop();
        // last word may be a path
        let directory = lastWord.split("/");
        // want to complete the file
        let file = directory.pop();
        if (file.length == 0) {
            return;
        }
        let success, newDir, newDirRef, err;
        // resolve the path
        [success, newDir, newDirRef, err] = this.getDirectory(directory.join("/"));
        // if path is valid
        if (success) {
            let possibleMatches = [];
            var re = new RegExp(`^${file.toLowerCase()}.*$`,"g");
            // find files in directory that match
            Object.keys(newDirRef).forEach(f => {
                if (f.toLowerCase().match(re)) {
                    possibleMatches.push(f)
                }
            })
            // if found 1 match
            if (possibleMatches.length == 1) {
                directory.push(possibleMatches[0])
                words.push(directory.join("/"));
                this.setState({ inputValue: words.join(" ")})
            }        
        }
    }

    // process command based on raw input string
    processCommand = (raw) => {
        let echo = <>{this.getPromptComponent()}<span className="terminal-input">{raw}</span></>;
        this.pushText(echo);
        let args = raw.split(" ");
        // do nothing if empty string
        if (!args[0]) {
            this.flush();
            return;
        }
        // add to history
        this.history.push(raw);
        this.historyIndex = this.history.length;
        // parse first word
        let command = args[0];
        // rest are args
        args.shift();
        // if command is valid
        if (this.state.commands.hasOwnProperty(command)) {
            // disable inputs
            this.setState({inputAvailable: false})
            // execute the command
            let result = this.state.commands[command].fn(args);
            // push to output
            if (result) {
                this.pushText(result);
                this.setState({inputAvailable: true})
            }
        }
        // if trying to execute a file
        else if (command.charAt(0) === ".") {
            this.processExecutable(command);
        }
        else {
            // push error message
            this.pushText(this.props.errorMessage(command));
        }
        if (command != "clear") {
            // flush the output
            this.flush();
        }
    }

    // process executable command
    processExecutable = (path) => {
        path = path.split("/");
        let file = path.pop();
        let success, newDir, newDirRef, err;
        // resolve the path
        [success, newDir, newDirRef, err] = this.getDirectory(path.join("/"));
        if (!success) {
            this.pushText(err);
        }
        else {
            // if file exists
            if(newDirRef.hasOwnProperty(file)) {
                if(typeof newDirRef[file] === "string") {
                    fetch(newDirRef[file])
                    .then(res => res.json())
                    .then(json => {
                        // if is an executable
                        if(json.executable) {
                            if (json.executable === "sendEmail") this.sendEmail();
                        }
                        else {
                            this.pushText(`'${file}' is a file!`);
                        }
                        this.flush();
                    })
                }
                // not a file
                else {
                    this.pushText(`'${file}' is a directory!`);
                }                
            }
            // file does not exist
            else {
                this.pushText(`'${file}' does not exist!`);
            }
        }
    }

    // push text to buffer
    pushText = (text) => {
        this.buffer.push(text);
    }

    // output everything in the buffer
    flush = () => {
        this.setState({
            lines: [...this.state.lines, ...this.buffer],
            inputValue: ""
        });
        this.buffer = [];
        this.scrollToBottom();
    }

    // send email
    sendEmail = () => {
        const msg = {
            to: 'chenaaron3@gmail.com',
            from: "",
            subject: "",
            text: ""
        };
        let readEmail, readSubject, readMessage;
        readEmail = (email) => {
            msg.from = email;
            this.pushText("Enter a subject:");
            this.executableFunction = readSubject;
        }
        readSubject = (subject) => {
            msg.subject = subject;
            this.pushText("Enter a message:");
            this.executableFunction = readMessage;
        }
        readMessage = (message) => {
            msg.text = message;
            let ref = this;
            fetch("/contact/email", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(msg)
            })
            .then(function(response) {
                ref.executableFunction = undefined;
                if(response.status === 200){
                    ref.pushText(<span className="terminal-file terminal-usage">Email Sent!</span>);
                    ref.flush();
                }
                else {
                    ref.pushText(<span style={{color:"red"}}>Invalid Email!</span>)
                    ref.flush();
                }
            });
        }
        this.pushText("Enter your email:");
        this.executableFunction = readEmail;
    }

    render() {
        return (<div className="terminal" ref={this.terminalRoot} onClick={this.focusInput}>
            <div className="terminal-content">
                {
                    this.state.lines.map((value, index) => (
                        <div className="terminal-text" key={index}>
                            {value}
                        </div>
                    ))
                }
                {
                    this.state.inputAvailable && 
                    <div className="terminal-input-area">
                        {!this.executableFunction && this.getPromptComponent()}
                        <input className="terminal-input"
                            type="text" onKeyDown={this.processKey}
                            onChange={this.handleChange}
                            value={this.state.inputValue}
                            ref={this.terminalInput}
                            spellCheck="false" />
                    </div>
                }
            </div>
        </div>)
    }
}

export default Terminal;