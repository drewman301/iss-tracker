import { useState } from "react";
import './ISSTracker.css';

/*
TODO: Fetch some data from an API, then show it on the page.

1. Render a button
2. Then, when clicked, the button will send an HTTP request to httpbin.org
3. When we get an HTTP response, show updated content on the page.
*/

function ISSTracker(){
    let url = "https://api.wheretheiss.at/v1/satellites/25544";
    const [result, setResult] = useState();
    const [buttonText, setButtonText] = useState("Send Request");

    function sendRequest(event){
        const request = new Request(url); //construct the HTTP request.
        fetch(request) //Sends the request, returns a Promise.
            .then((res) => res.json()) // decode JSON
            .then((object) => {
                console.log(object);

                setButtonText("Resend Request")
                setResult(object);
            });
    }

    return (
        <div className="api-fetcher">
            <h1>Where ISS?</h1>
            <br />
            <button onClick={sendRequest}>{buttonText}</button>
            {result && 
            <a target="_blank" href={`https://www.google.com/maps/place/${result.latitude},${result.longitude}`}>
            <p>{`The ISS is in ${result.visibility} at ${result.latitude}, ${result.longitude}.`}</p>
            </a>
            }
        </div>
    );
}

export default ISSTracker;