import callApi from "./api.js";

const form = document.querySelector("#form");
const linkInput = document.querySelector("#link-input");
let urlValue;

document.addEventListener("DOMContentLoaded", () => {
    let urlsLocal = JSON.parse(localStorage.getItem("urls")) || [];
    linkInput.addEventListener("blur", verify);
    form.addEventListener("submit", e => {
        e.preventDefault();
        submitForm(urlValue);
    });
    if(urlsLocal.length > 0) {
        urlsLocal.forEach( url => {
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
});
function verify(e) {

    if(e.target.value.trim() === "") {
        createAlert("Please add a link");
        return;
    }
    if(!validateUrl(e.target.value.toLowerCase())) {
        createAlert("Enter a valid Url");
        return;
    }
    cleanAlert();
    return urlValue = e.target.value.trim().toLowerCase();
};
function createAlert(msj) {
    cleanAlert();
    const alert = document.createElement("P");
    alert.classList.add("form__alert");
    alert.textContent = msj;
    form.firstElementChild.appendChild(alert);

    linkInput.style.border = "2px solid hsl(0, 87%, 67%)";
};
function cleanAlert() {
    const exist = document.querySelector(".form__alert");
    if(exist) {
        exist.remove();
        linkInput.style.border = 'none';
    }
};
function validateUrl(url) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/ 
    const result = urlRegex.test(url);
    return result;
};
function submitForm(Url) {
    if(Url) {
        callApi(urlValue);
        urlValue = '';
        resetForm();
    }
};
function resetForm() {
    linkInput.value = "";
    form.reset();
};