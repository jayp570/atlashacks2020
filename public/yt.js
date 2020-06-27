const searchForChannel = function(channelName) {
    
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

        request.onError = () => {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };

        request.open("GET", `https://www.googleapis.com/youtube/v3/search?part=snippet&part=id&q=${channelName}&type=channel&key=${GOOGLE_API_KEY}`);
        request.send();
    
    });

};