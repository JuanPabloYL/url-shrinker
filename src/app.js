"use strict";
const form = document.querySelector("#form");
const input = document.querySelector("#input-url");
const questionsHeader = document.querySelectorAll(".question__header");
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
const toggleModalQuestion = (element) => {
    const parentElement = element.closest(".question");
    parentElement.classList.toggle("open");
};
questionsHeader.forEach((question) => {
    question.addEventListener("click", () => toggleModalQuestion(question));
});
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
