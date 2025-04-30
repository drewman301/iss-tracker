import { useState } from "react";
import './ApiFetcher.css';

/*
TODO: Fetch some data from an API, then show it on the page.

1. Render a button
2. Then, when clicked, the button will send an HTTP request to httpbin.org
3. When we get an HTTP response, show updated content on the page.
*/

function ApiFetcher(){
    let url = "";
    const [result, setResult] = useState("");
    const [buttonText, setButtonText] = useState("Send Request");

    function sendRequest(event){
        url = document.getElementById('urlbox').value;
        const request = new Request(url); //construct the HTTP request.
        fetch(request) //Sends the request, returns a Promise.
            .then((res) => res.text()) // decode JSON
            .then((object) => {
                console.log(object);

                setButtonText("Resend Request")
                setResult(object);
            });
    }

    return (
        <div className="api-fetcher">
            <h1>API Fetcher</h1>
            <input id='urlbox' defaultValue={'https://'} onSubmit={sendRequest} />
            <br />
            <button onClick={sendRequest}>{buttonText}</button>
            {result && <p>{result}</p>}
        </div>
    );
}

export default ApiFetcher;