API_URL = 'Websiteportfolio-env.eba-2cemyy2v.us-west-1.elasticbeanstalk.com'

export function myFetch(url, ...args){
    if (url.startsWith('/')) {
        return fetch(API_URL + url, ...args);
    }
    else {
        return fetch(url, ...args)
    }
}