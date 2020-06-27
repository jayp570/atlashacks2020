const go = function() {

    let channelName = document.getElementById("field-channelName").value;

    searchForChannel(channelName).then(
        (result) => {
            try {
                
                let response = JSON.parse(result);
                document.getElementById("searchGlobalText").innerHTML = `${response.pageInfo.totalResults} results for "${channelName}"`;
                
                let searchResultsArea = document.getElementById("searchResults");
                for(let item of response.items) {
                    
                    let subDiv = document.createElement("div");
                    searchResultsArea.appendChild(subDiv);

                }

                console.log(response);

            } catch(error) {
                console.log("Bad response from the server: ", error);
            }
        },
        (error) => {
            console.log("Error: ", error);
        }
    );

};