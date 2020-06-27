let searchResultElems = [];

let shownVideoElements = [];
let nextYTPageKey;

const feedArea = document.getElementById("feed");
const bottom = document.getElementById("bottom");

const fillSearch = function() {

    let channelName = document.getElementById("field-channelName").value;

    searchForChannel(channelName).then(
        (result) => {
            try {

                let response = JSON.parse(result);
                console.log(response);
                document.getElementById("searchGlobalText").innerHTML = `${response.pageInfo.totalResults} results for "${channelName}"`;
                
                // Destroy search results
                for(let elem of searchResultElems) {
                    elem.remove();
                }

                let searchResultsArea = document.getElementById("searchResults");
                for(let item of response.items) {
                    
                    console.log(item);

                    let subDiv = document.createElement("div");
                    subDiv.className = "searchResult";
                    searchResultsArea.appendChild(subDiv);
                    searchResultElems.push(subDiv);

                    let channelNameElem = document.createElement("p");
                    channelNameElem.appendChild(document.createTextNode(`${item.snippet.channelTitle} (id ${item.id.channelId})`));
                    subDiv.appendChild(channelNameElem);

                    let channelThumbnailElem = document.createElement("img");
                    channelThumbnailElem.src = item.snippet.thumbnails.default.url;
                    channelThumbnailElem.setAttribute("position","relative");

                    channelThumbnailElem.onmouseover = function(){
                        channelThumbnailElem.style.animationName = "smalltobig";
                        console.log("dick");
                    };
                    
                    channelThumbnailElem.onmouseout = function(){
                        channelThumbnailElem.style.animationName = "bigtosmall";
                    };
                    
                    subDiv.appendChild(channelThumbnailElem);

                    channelThumbnailElem.onclick = function(){
                        console.log(item.snippet.channelTitle);
                    }; 
                     


                }

            } catch(error) {
                console.log("Bad response from the server: ", error);
            }
        
        },
        (error) => {
            console.log("Error: ", error);
        }
    );

};

const show = function() {

    /*
    try {
        getVideosPlaylist(MARKIPLIER_ID).then((playlists) => {
            playlists = JSON.parse(playlists);
            console.log(playlists);
            getVideosInPlaylist(playlists.items[0].contentDetails.relatedPlaylists.uploads, nextYTPageKey).then((videos) => {
                
                videos = JSON.parse(videos);
                nextYTPageKey = videos.nextPageToken;
                
                for(let video of videos.items) {
                    
                    let cardElem = document.createElement("div");
                    cardElem.classList.add("csscard");
                    
                    let embeddedVideo = document.createElement("iframe");
                    embeddedVideo.src = `https://www.youtube.com/embed/${video.contentDetails.videoId}`;
                    embeddedVideo.width = 960;
                    embeddedVideo.height = 540;

                    cardElem.appendChild(embeddedVideo);
                    feedArea.appendChild(cardElem);

                }

            });    
        });
    } catch(error) {
        console.log("Problems showing more videos: ", error);
    }
    */

    for(let i = 0; i < 5; i++) {
        let cardElem = document.createElement("div");
        cardElem.classList.add("csscard");
        
        let embeddedVideo = document.createElement("iframe");
        embeddedVideo.src = `https://www.youtube.com/embed/oHg5SJYRHA0`;
        embeddedVideo.width = 960;
        embeddedVideo.height = 540;

        cardElem.appendChild(embeddedVideo);
        feedArea.appendChild(cardElem); 
    }

};

window.addEventListener("scroll", () => {
    if(bottom.offsetTop - window.scrollY < 1100) {
        show();
    }
});