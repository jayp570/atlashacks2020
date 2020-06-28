const getTweets = function(handle) {

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

        request.open("GET", `/api/twitter?name=${handle}`);
        request.send();

    });

}