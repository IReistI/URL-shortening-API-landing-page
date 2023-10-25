import callApi from "./api.js";
const form = document.querySelector("#form");
const linkInput = document.querySelector("#link-input");
let urlValue;

document.addEventListener("DOMContentLoaded", () => {
    linkInput.addEventListener("blur", verify);
    form.addEventListener("submit", e => {
        e.preventDefault();
        submitForm(urlValue);
    });
});
function verify(e) {

    if(e.target.value.trim() === "") {
        createAlert("Please add a link");
        return;
    }
    if(!validateUrl(e.target.value)) {
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