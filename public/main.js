// Metdata for each feed
let feeds = [];

// DOM elements for search pane
// Destroyed every time a search occurs!
let searchResultElems = [];

// General feed elements
let feedContent = [];

// Info about YT loader state
let nextYTPageKey;

// Info about twitter state
let twitterMaxID;

// Is loading?
let loading = false;

// Constant HTML elements:
const feedArea = document.getElementById("feed");
const searchResultArea = document.getElementById("searchResults");
const bottom = document.getElementById("bottom");                       // Used for infinite scroll detection

// timestamp contents
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
const SECONDS_PER_MONTH = SECONDS_PER_DAY * 30.5;
const SECONDS_PER_YEAR = SECONDS_PER_MONTH * 12;

console.log(final_passed_array)

const monthToNum = {
	"Jan": 0,
	"Feb": 1,
	"Mar": 2,
	"Apr": 3,
	"May": 4,
	"Jun": 5,
	"Jul": 6,
	"Aug": 7,
	"Sep": 8,
	"Oct": 9,
	"Nov": 10,
	"Dec": 11
};

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

        printchecklist(item.snippet.channelTitle,item.id.channelId);
        // Destroy parent after click
        subDiv.remove();

        feeds.push({
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

// TODO:
// Make sure all items in feedContent have consistent timestamp format so it can be sorted.
// This means we will need functions to convert YT, Twitter timestamps, etc. to a single format.

// Convert YT date to timestamp
const convertYTDate = function(date) {
    return date.substring(0, 4) * SECONDS_PER_YEAR + 
        (date.substring(5, 7) - 1) * SECONDS_PER_MONTH +
        date.substring(8, 10) * SECONDS_PER_DAY + 
        date.substring(11, 13) * SECONDS_PER_HOUR +
        date.substring(14, 16) * SECONDS_PER_MINUTE +
        date.substring(17, 19);
};

// Convert twitter date to timestamp
const convertTwitterDate = function(date) {
    console.log(monthToNum[date.substring(4, 7)], date.substring(4, 7));
    return date.substring(26, 30) * SECONDS_PER_YEAR + 
        monthToNum[date.substring(4, 7)] * SECONDS_PER_MONTH +
        date.substring(8, 10) * SECONDS_PER_DAY + 
        date.substring(11, 13) * SECONDS_PER_HOUR +
        date.substring(14, 16) * SECONDS_PER_MINUTE +
        date.substring(17, 19);
};

const getNextReadyItemInFeed = function(index) {
    for(let i = index; i < feedContent.length; i++) {
        if(!feedContent[i].needsInsert)
            return feedContent[i];
    }
};

const updateFeedDOM = function() {

    for(let i in feedContent) {
        
        let item = feedContent[i];
        if(item.needsInsert) {

            let nextElem = getNextReadyItemInFeed();
            console.log(nextElem);

            if(nextElem === undefined) {
                feedArea.appendChild(item.DOMElement);
            } else {
                feedArea.insertBefore(item.DOMElement, nextElem);
            }

            item.needsInsert = false;
        }

    }

}

const insertIntoFeed = function(newItem) {

    for(let i in feedContent) {
        
        let item = feedContent[i];
        if(newItem.timestamp > item.timestamp) {

            // Use splice to insert new item at i
            feedContent.splice(i, 0, newItem);
            return;

        }

    }

    feedContent.push(newItem);

}

const addVideoToFeed = function(video) {

    let cardElem = document.createElement("div");
    cardElem.classList.add("csscard");
                        
    let embeddedVideo = document.createElement("iframe");
    embeddedVideo.src = `https://www.youtube.com/embed/${video.contentDetails.videoId}`;
    embeddedVideo.width = 960;
    embeddedVideo.height = 540;

    cardElem.appendChild(embeddedVideo);

    insertIntoFeed({
        type: "youtube",
        video: video,
        timestamp: convertYTDate(video.snippet.publishedAt),
        DOMElement: cardElem,
        needsInsert: true
    });

};

const getYoutubeContent = async function() {

    try {
            
        let playlists = await getVideosPlaylist(MARKIPLIER_ID);

        // Mark as loading to avoid loading extra posts while waiting for an initial request
        playlists = JSON.parse(playlists);
        isYTLoading = true;
                
        // Request videos in playlist
        let videos = await getVideosInPlaylist(playlists.items[0].contentDetails.relatedPlaylists.uploads, nextYTPageKey);
                    
        // Self-parse
        videos = JSON.parse(videos);
        nextYTPageKey = videos.nextPageToken;
                    
        for(let video of videos.items) {
            addVideoToFeed(video);
        }

    } catch(error) {
        console.log("Problems showing more videos: ", error);
    }   

};

const getTwitterContent = async function() {

    let tweets = await getTweets("markiplier", twitterMaxID);
    for(let tweet of tweets) {

        let elem = document.createElement("div");
        elem.innerHTML = embedTweet(tweet);

        twttr.widgets.load(elem);

        insertIntoFeed({
            type: "twitter",
            tweet: tweet,
            timestamp: convertTwitterDate(tweet.created_at),
            DOMElement: elem,
            needsInsert: true
        });

    }

    twitterMaxID = tweets[tweets.length - 1].id;

};

const updateFeed = async function() {
    if(!loading) {
        
        loading = true;

        await getYoutubeContent();
        await getTwitterContent();
        updateFeedDOM();

        loading = false;
    
    }
};

// Scroll features
window.addEventListener("scroll", () => {
    let scrollButton = document.getElementById("scrollButton");
    if(bottom.offsetTop - window.scrollY < 1100) {
        updateFeed();
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

updateFeed();