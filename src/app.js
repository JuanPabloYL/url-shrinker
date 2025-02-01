"use strict";
const form = document.querySelector("#form");
const input = document.querySelector("#input-url");
const shortenURL = (originalURL) => {
    const baseURL = "https://shortify.io/";
    const uniqueID = Math.random().toString(36).substring(2, 8);
    // Store the original URL in localStorage
    localStorage.setItem(uniqueID, originalURL);
    return baseURL + uniqueID;
};
const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch (_) {
        return false;
    }
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userURL = input.value;
    const validURL = isValidURL(userURL);
    if (validURL) {
        console.log(shortenURL(userURL));
    }
    else {
        alert("No valid url");
    }
});
