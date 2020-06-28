// Entry point!

// Dependencies
const express = require("express");
const requester = require("request");
const auth = require("./auth_module.js");
const Twitter = require("twitter");
const auth_module = require("./auth_module.js");

// App variables
const app = express();
const PORT = 80;

// Init twitter
const twitter = new Twitter({
    consumer_key: auth_module.TWITTER_API_KEY,
    consumer_secret: auth_module.TWITTER_API_KEY_SECRET,
    access_token_key: auth_module.TWITTER_ACCESS_TOKEN,
    access_token_secret: auth_module.TWITTER_ACCESS_TOKEN_SECRET
});

// Routes
// Serve static pages from public dir
app.use(express.static("public"));

app.use((request, response, next) => {
    response.header("Access-Conrol-Allow-Origin", "*");
    next();
});

app.get("/api/cors-passthrough", (request, response) => {
    try {
        
        let URL = request.query.url;

        requester(
            {
                url: decodeURI(URL)
            },
            (error, response2, body) => {
                if(error || response2.statusCode != 200) {
                    console.log(response2.statusCode);
                    return response.status(500).json({type: "error"});
                }

                response.send(body);
            }
        );

    } catch(error) {
        console.log("Problem while handling CORS passthrough request: ", error);
    }
});

app.get("/api/twitter", (request, response) => {
    try {
        twitter.get("statuses/user_timeline", {screen_name: request.query.name}, (error, tweet, response2) => {
            if(!error) {
                response.send(response2);
            } else {
                response.status(400).json({type: "error"})   
            }
        });
    } catch(error) {
        console.log("Problem while handling Twitter request: ", error);
    }
});

app.get("/api/twitterembed", (request, response) => {
    try {
        twitter.get("statuses/oembed", {url: `https://twitter.com/${request.query.name}/status/${request.query.id}`, theme: "dark", dnt: true}, (error, tweet, response2) => {
            if(!error) {
                response.send(response2);
            } else {
                console.log(error, tweet, response2);
                response.status(400).json({type: "error"});
            }
        });
    } catch(error) {
        console.log("Problem while embedding tweet: ", error);
    }
});

// Server definition
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});