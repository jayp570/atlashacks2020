const getTweets = function(handle, after) {

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

        request.open("GET", `/api/twitter?name=${handle}${after !== undefined ? "&max=" + after : ""}`);
        request.send();

    });

};

const embedTweet = function(authorName, id) {

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

        request.open("GET", `/api/twitter?name=${authorName}&id=${id}`);
        request.send();

    });

}