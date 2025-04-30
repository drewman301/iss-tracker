import { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
//import 'leaflet/dist/leaflet.css';
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
    <div>
        <div className="api-fetcher">
            <h1>Where ISS?</h1>
            <br />
            <button onClick={sendRequest}>{buttonText}</button>
            {result && 
            <p>The ISS is in {result.visibility} at{' '}
                <a className="coordslink" target="_blank" href={`https://www.google.com/maps/place/${result.latitude},${result.longitude}`}>
                    {result.latitude}, {result.longitude}.
                </a>
            </p>
            }
        </div>
            <MapContainer style={{ height: '500px', width: '100%' }} className="main-map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {result && (
                    <Marker position={[result.latitude, result.longitude]}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
    </div>
    );
}

export default ISSTracker;