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

        request.onerror = () => {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };

        request.open("GET", `https://www.googleapis.com/youtube/v3/search?part=snippet&part=id&q=${channelName}&type=channel&key=${GOOGLE_API_KEY}`);
        request.send();
    
    });

};

const getChannelLinks = function(channelURL) {

    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        
        request.onload = () => {
            
            if(request.status >= 200 && request.status < 300) {
                
                let parser = new DOMParser();
                let doc = parser.parseFromString(request.response, "text/html");

                //let elems = doc.querySelectorAll(".about-channel-link.yt-uix-redirect-link.about-channel-link-with-icon");
                let elems = doc.querySelectorAll("a.about-channel-link");
                let redirects = [...elems].map(elem => elem.href);

                // Clever trick to parse URL easily
                let links = redirects.map((redirect) => {
                    return new URLSearchParams(redirect).get("q");
                });

                // Remove duplicates 
                console.log([...new Set(links)]);
                resolve([...new Set(links)]);

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

        request.open("GET", `/api/yt-passthrough?url=${encodeURIComponent(channelURL)}`);
        request.send();

    });

};

const getVideosPlaylist = function(channelID) {

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

        request.open("GET", `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelID}&key=${GOOGLE_API_KEY}`);
        request.send();

    });

};

const getVideosInPlaylist = function(playlistID, nextPageKey) {

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

        request.open("GET", `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistID}&key=${GOOGLE_API_KEY}${nextPageKey !== undefined ? "&pageToken=" + nextPageKey : ""}`);
        request.send();

    });    

};

const show = function() {

    try {
        let playlists = JSON.parse(getVideosPlaylist());
    } catch(error) {
        console.log("Problems showing more videos: ", error);
    }

};