const authenticate = function() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(
            () => {console.log("Signed in")},
            (error) => {console.log("Error signing in: ", error)}
        );
};

const loadClient = function() {
    gapi.client.setApiKey(GOOGLE_API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
            () => {console.log("GAPI client loaded for API")},
            () => {console.log("Error loading GAPI client for API: ", error)}
        );
};

const go = function() {
    return gapi.client.youtube.search.list({
        "part": [
            "snippet",
            "id"
        ],
        "q": document.getElementById("field-channelLink"),
        "type": [
            "channel"
        ]
    }).then((response) => {
        console.log(response);
    },
    (error) => {console.log("Error executing the request: ", error)});
};

gapi.load("client:auth2", () => {
    gapi.auth2.init({client_id: GOOGLE_API_KEY});
});
loadClient();