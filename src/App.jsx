import { useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useEffect } from 'react';
import './ISSTracker.css';


function App() {
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

  function ISSMarker({ position }) {
    const map = useMap();
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, 4, {
          duration: 2
        });
      }
    }, [position, map]);
  
    return (
      <Marker position={position}>
        <Popup>The ISS is here!</Popup>
      </Marker>
    );
  }

  return (
    <>
      <div className="card">
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
          <p hidden>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
      </div>
        <MapContainer style={{ height: '500px', width: '800px' }} className="main-map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {result && (
            <ISSMarker position={[result.latitude, result.longitude]} />
            )}
        </MapContainer>
    </>
  )
}

export default App;
