let searchResultElems = [];

let shownVideoElements = [];
let nextYTPageKey;

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
                    subDiv.appendChild(channelThumbnailElem);


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

    try {
        let x = getVideosPlaylist(MARKIPLIER_ID);
        let playlists = JSON.parse(x);
        let y = getVideosInPlaylist(paylists.items.contentDetails.relatedPlaylist.uploads, nextYTPageKey);
        let videoIDs = JSON.parse(y);
        console.log(videoIDs);
    } catch(error) {
        console.log("Problems showing more videos: ", error);
    }

};