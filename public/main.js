// Debug mode?
let debugMode = true;

// Metdata for each feed
let feedsData = [];

// DOM elements for search pane
// Destroyed every time a search occurs!
let searchResultElems = [];

// General feed elements
let feedElements = [];

// Info about YT loader state
let nextYTPageKey;
let isYTLoading = false;

// Constant HTML elements:
const feedArea = document.getElementById("feed");
const searchResultArea = document.getElementById("searchResults");
const bottom = document.getElementById("bottom");                       // Used for infinite scroll detection

// Generate a clickable YT search result by youtuber
const addYTSearchResult = function(item) {

    // Create div for channel
    let subDiv = document.createElement("div");
    subDiv.className = "searchResult";
    searchResultArea.appendChild(subDiv);
    searchResultElems.push(subDiv);

    // Add channel name
    let channelNameElem = document.createElement("p");
    channelNameElem.appendChild(document.createTextNode(`${item.snippet.channelTitle} (id <code>${item.id.channelId}</code>)`));
    subDiv.appendChild(channelNameElem);

    // Add channel thumbnail
    let channelThumbnailElem = document.createElement("img");
    channelThumbnailElem.src = item.snippet.thumbnails.default.url;
    channelThumbnailElem.setAttribute("position", "relative");
    subDiv.appendChild(channelThumbnailElem);

    // Set up click handler for thumbnail
    channelThumbnailElem.addEventListener("click", function() {

        // Destroy parent after click
        subDiv.remove();

        feedsData.push({
            youtuberName: item.snippet.channelTitle,
            id: item.id.channelId
        });

    });

};

// Populates feedElements with clickable YT search results
const doYTSearch = function() {

    // Get channel name
    let channelName = document.getElementById("field-channelName").value;

    // Do the API call
    searchForChannel(channelName).then(
        (result) => {
            try {

                let response = JSON.parse(result);
                document.getElementById("searchGlobalText").innerHTML = `${response.pageInfo.totalResults} results for "${channelName}"`;
                
                // Destroy existing search-result elements
                for(let elem of searchResultElems) {
                    elem.remove();
                }
                
                for(let item of response.items) {
                    addYTSearchResult(item);
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


let feedContent = []

const getYoutubeContent = function() {

    if(!isYTLoading) {
        try {
            getVideosPlaylist(MARKIPLIER_ID).then((playlists) => {
                playlists = JSON.parse(playlists);
                isYTLoading = true;
                getVideosInPlaylist(playlists.items[0].contentDetails.relatedPlaylists.uploads, nextYTPageKey).then((videos) => {
                    
                    videos = JSON.parse(videos);
                    nextYTPageKey = videos.nextPageToken;
                    
                    for(let video of videos.items) {

                        feedContent.push(
                            {
                                type: "youtube",
                                content: video
                            }
                        )
                        
                        // let cardElem = document.createElement("div");
                        // cardElem.classList.add("csscard");
                        
                        // let embeddedVideo = document.createElement("iframe");
                        // embeddedVideo.src = `https://www.youtube.com/embed/${video.contentDetails.videoId}`;
                        // embeddedVideo.width = 960;
                        // embeddedVideo.height = 540;

                        // cardElem.appendChild(embeddedVideo);
                        // feedArea.appendChild(cardElem);

                    }
                    console.log(feedContent);

                    isYTLoading = false;

                });    
            });
        } catch(error) {
            console.log("Problems showing more videos: ", error);
        }
    }    

    // for(let i = 0; i < 5; i++) {
    //     let cardElem = document.createElement("div");
    //     cardElem.classList.add("csscard");
        
    //     let embeddedVideo = document.createElement("iframe");
    //     embeddedVideo.src = `https://www.youtube.com/embed/oHg5SJYRHA0`;
    //     embeddedVideo.width = 960;
    //     embeddedVideo.height = 540;

    //     cardElem.appendChild(embeddedVideo);
    //     feedArea.appendChild(cardElem); 
    // }

};

const getTwitterContent = function() {
    getTweets("markiplier").then((tweets) => {
        for(let tweet of tweets) {
            feedContent.push(
                {
                    tpye: "twitter",
                    content: tweet
                }
            )
        }
        console.log(feedContent);
        // setTimeout(function() {}, 800);
        // twttr.widgets.load();
    });
}





function getDate(content) {
    if(content.type == "twitter") {
        let tweet = JSON.parse(JSON.stringify(content))
        let date = tweet.content.created_at;
        let month = date.substring(4,7);
        let day = parseInt(date.substring(8,10))
        let year = parseInt(date.substring(26,date.length))
        let hour = parseInt(date.substring(11,13));
        let minute = parseInt(date.substring(14,16));
        //console.log(month+" "+day+" "+year+" "+hour+":"+minute);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for(let i = 0; i < months.length; i++) {
            if(month == months[i]) {
                month = i+1;
                break;
            }
        }
        //console.log(month+" "+day+" "+year+" "+hour+":"+minute);
        hour*=60;
        day*=1440;
        month*=43800;
        year*=525600;
        console.log(content.type+" "+month+" "+day+" "+year+" "+hour+":"+minute);
        return month+day+year+hour+minute;
    } else if(content.type == "youtube") {
        let video = JSON.parse(JSON.stringify(content)) 
        let date = video.content.contentDetails.videoPublishedAt;
        let year = parseInt(date.substring(0,4))
        let month = parseInt(date.substring(5,7))
        let day = parseInt(date.substring(8,10))
        let hour = parseInt(date.substring(11,13))
        let minute = parseInt(date.subtring(14,16))
        hour*=60;
        day*=1440;
        month*=43800;
        year*=525600;
        console.log(content.type+" "+month+" "+day+" "+year+" "+hour+":"+minute);
        return month+day+year+hour+minute;
    }
}

function sortContent(tweets) {
    let list = JSON.parse(JSON.stringify(tweets))
    for(let i = 0; i < list.length-1; i++) {
        for(let j = 0; j < list.length-i-1; j++) {
            if(getDate(list[j]) < getDate(list[j+1])) {
                let temp1 = list[j];
                let temp2 = list[j+1];
                list[j] = temp2;
                list[j+1] = temp1;
            }
        }
    }
    console.log(list);
    return list;
}

function showFeed() {
    feedContent = sortContent(feedContent)
    console.log(feedContent);
    for(let post of feedContent) {
        if(post.type == "youtube") {

            let cardElem = document.createElement("div");
            cardElem.classList.add("csscard");
            
            let embeddedVideo = document.createElement("iframe");
            embeddedVideo.src = `https://www.youtube.com/embed/${post.content.contentDetails.videoId}`;
            embeddedVideo.width = 960;
            embeddedVideo.height = 540;

            cardElem.appendChild(embeddedVideo);
            document.getElementById("feed").appendChild(cardElem);

        } else if(post.type == "twitter") {

            let html = embedTweet(post.content);
            document.getElementById("feed").innerHTML += html;

        }
    } 
    setTimeout(function() {}, 800);
    twttr.widgets.load();
}






window.addEventListener("scroll", () => {
    let scrollButton = document.getElementById("scrollButton");
    if(bottom.offsetTop - window.scrollY < 1100) {
        show();
    }
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
});

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
