// Entry point!

// Dependencies
const express = require("express");
const requester = require("request");

// App variables
const app = express();
const PORT = 80;

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

app.post("/api/cors-passthrough", (request, response) => {
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

// Server definition
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});