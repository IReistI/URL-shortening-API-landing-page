const content = document.querySelector("#content");
const callApi = (url) => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "cGWBBq08NPSA5SCbU3j4OtTl5u7Gn4k5");
    const raw = url;

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: raw
    };
    fetch("https://api.apilayer.com/short_url/hash", requestOptions)
        .then( response => response.json() )
        .then( result => saveLocal(result) )
        .catch( error => console.log('error', error) );
};
function saveLocal(result) {
    const {hash , long_url, short_url} = result;
    const objUrl = {
        hash,
        long_url,
        short_url
    };
    let urlsLocal = JSON.parse(localStorage.getItem("urls")) || [];
    urlsLocal = [...urlsLocal, objUrl];
    localStorage.setItem("urls" , JSON.stringify(urlsLocal) );
    createHTML(urlsLocal);
};
function createHTML(arrUrls) {
    cleanHTML();
    if(arrUrls.length > 0) {
        arrUrls.forEach( url => {
            const div = document.createElement("DIV");
            div.classList.add("content__card");

            const urlShort = document.createElement("P");
            urlShort.classList.add("content__short-url");
            urlShort.textContent = url.short_url;

            const urlLong = document.createElement("P");
            urlLong.classList.add("content__url");
            urlLong.textContent = url.long_url

            const button = document.createElement("BUTTON");
            button.classList.add("content__button");
            button.textContent = "Copy";
            button.onclick = (e) => {
                navigator.clipboard.writeText(e.target.parentElement.children[1].textContent);
                e.target.textContent = "Copied!";
                e.target.classList.add("content__button--copied");
            };

            div.appendChild(urlLong);
            div.appendChild(urlShort);
            div.appendChild(button);

            content.appendChild(div);
        });
    }
};
function cleanHTML() {
    while( content.firstChild ) {
        content.removeChild(content.firstChild);
    }
};
export default callApi;