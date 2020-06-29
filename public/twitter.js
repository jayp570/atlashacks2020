const getTweets = function(handle, after) {

    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        
        request.onload = () => {
            if(request.status >= 200 && request.status < 300) {
                let result = JSON.parse(JSON.parse(request.response).body);
                result.shift();
                resolve(result);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.onerror = () => {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };

        request.open("GET", `/api/twitter?name=${handle}${after !== undefined ? "&max=" + after : ""}`);
        request.send();

    });

};

const embedTweet = function(tweet) {

    return `<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">dummy</p>&mdash; dummy <a href="https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}">dummy</a></blockquote>`; 

}