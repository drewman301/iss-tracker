import { useState } from "react";
import './Owo.css';

function Owo(){
    const [result, setResult] = useState();
    const [nsfw, setNsfw] = useState(false);

    function nsfwToggle(e){
        setNsfw(e.target.value);
    }

    function makeRequest(){

        const headers = new Headers({'User-Agent': 'pic-bot-thing by dgiDREW'});
        const url = nsfw ? "https://e621.net/posts/random.json":"https://e926.net/posts/random.json";
        const options = {
            method: 'GET',
            headers: headers,
            mode: 'cors'
          };
        
        const request = new Request(url, options); //construct the HTTP request.
        console.log('Making request to', url);
        fetch(request) //Sends the request, returns a Promise.
            .then((res) => res.json()) // decode JSON
            .then((object) => {
                setResult(object);
                console.log(object);
                })
            .catch((err) => console.log(`OOPSIE WOOPSIE WE MADE A LITTLE FUCKY WUCKY! ERROR ${err}`));


    }

    return(
        <div>
            {result && 
                <div id="image-block">
                    <a href={nsfw?"https://e621.net/posts/":"https://e926.net/posts/"+result.post.id} target="_blank" title={result.post.description}>
                        <embed className="owo-embed" src={result.post.file.url} alt="Random furry post" />
                    </a>
                    <h3 className="artist-credit">By {result.post.tags.artist[0]}</h3>
                </div>
            }
            <div id='owo-form'>
                <button onClick={makeRequest} className={
                    result && ((result.post.rating === "e")?"explicit":(result.post.rating === "q")?"questionable":(result.post.rating === "s")?"safe":"safe")
                }>Fetch Random Image</button>
                <input className="nsfw-checkbox" type="checkbox" onChange={nsfwToggle} />
                <label>NSFW{nsfw?'!':'?'}</label>
            </div>
        </div>
    );
}

export default Owo;