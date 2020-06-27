const getBearerAccessToken = function() {

    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        
        request.onload = () => {
            if(request.status >= 200 && request.status < 300) {
                resolve(request.response);
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

        request.open("POST", "/api/cors-passthrough?url=" + encodeURIComponent(`https://api.twitter.com/oauth2/token`));
        request.setRequestHeader("Authorization" , TWITTER_ACCESS_TOKEN_SECRET);
        request.send("grant_type=client_credentials");

    });  

};

const getTimeline = function(username) {

    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        
        request.onload = () => {
            if(request.status >= 200 && request.status < 300) {
                resolve(request.response);
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

        request.open("GET", "/api/cors-passthrough?url=" + encodeURIComponent(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=20`));
        request.send();

    });    

};