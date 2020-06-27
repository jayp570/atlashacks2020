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
