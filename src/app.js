"use strict";
const form = document.querySelector("#form");
const input = document.querySelector("#input-url");
const questionsHeader = document.querySelectorAll(".question__header");
const faqs = [
    {
        question: "What is a URL shrinker?",
        answer: "A URL shrinker is a tool that takes a long URL and shortens it into a more manageable and shareable link.",
    },
    {
        question: "How do I use this URL shrinker?",
        answer: "Simply paste your long URL into the input field, click the 'Shrink' button, and your shortened URL will be generated.",
    },
    {
        question: "Is this URL shrinker free to use?",
        answer: "Yes, this URL shrinker is completely free to use!",
    },
    {
        question: "Do I need to create an account to use this tool?",
        answer: "No, you don't need an account. This tool is designed to be simple and accessible to everyone.",
    },
    {
        question: "Can I customize my shortened URL?",
        answer: "Currently, this tool does not support customizing shortened URLs. It generates a random, unique short link for you.",
    },
    {
        question: "Is my data safe with this URL shrinker?",
        answer: "Yes, we do not store or track any personal data. Your URLs are processed securely and anonymously.",
    },
    {
        question: "What happens if my shortened URL expires?",
        answer: "This tool does not currently support expiration dates for shortened URLs. Once generated, the link will remain active.",
    },
];
const shortenURL = (originalURL) => {
    const baseURL = "shortify/";
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
const appendFAQToDOM = (faqs) => {
    const questionsContainer = document.querySelector(".questions-container");
    faqs.forEach((question) => {
        const htmlElement = `<div class="question">
            <div class="question__header">
              <p>${question.question}</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#f5f7f8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m7 10l5 5l5-5"
                  />
                </svg>
              </span>
            </div>

            <div class="question__content">
              <p>
                ${question.answer}
              </p>
            </div>
          </div>`;
        questionsContainer.insertAdjacentHTML("beforeend", htmlElement);
        const newQuestion = questionsContainer.lastElementChild;
        const questionHeader = newQuestion.querySelector(".question__header");
        if (questionHeader) {
            questionHeader.onclick = () => {
                const parentElement = questionHeader.closest(".question");
                parentElement.classList.toggle("open");
            };
        }
    });
};
const toggleModalQuestion = (element) => {
    const parentElement = element.closest(".question");
    parentElement.classList.toggle("open");
};
questionsHeader.forEach((question) => {
    question.addEventListener("click", () => toggleModalQuestion(question));
});
document.addEventListener("DOMContentLoaded", () => appendFAQToDOM(faqs));
const displayURL = (originalUrl, shortUrl) => {
    const urlID = shortUrl.split("/").pop();
    const urlHTML = `<div class="display-url">
          <div class="display-url__url">
            <p>${originalUrl}</p>
          </div>
          <div class="display-url__shrink">
            <a href="${shortUrl}" data-id="${urlID}" class="shortened-link">${shortUrl}</a>
          </div>
          <div class="display-url__copy">Copy</div>
        </div>`;
    form.insertAdjacentHTML("afterend", urlHTML);
    const newDisplay = form.nextElementSibling;
    // Copy button functionality
    const copyButton = newDisplay.querySelector(".display-url__copy");
    if (copyButton) {
        copyButton.addEventListener("click", () => {
            navigator.clipboard
                .writeText(shortUrl)
                .then(() => {
                copyButton.textContent = "Copied!";
                setTimeout(() => (copyButton.textContent = "Copy"), 1500);
            })
                .catch((err) => console.error("Failed to copy:", err));
        });
    }
    // Shortened link redirection functionality
    const shortLink = newDisplay.querySelector(".shortened-link");
    if (shortLink) {
        shortLink.addEventListener("click", (event) => {
            event.preventDefault();
            const urlID = shortLink.getAttribute("data-id");
            if (urlID) {
                const original = localStorage.getItem(urlID);
                if (original) {
                    window.open(original, "_blank"); // Redirect to original URL
                }
                else {
                    alert("Invalid short URL");
                }
            }
        });
    }
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userURL = input.value;
    const validURL = isValidURL(userURL);
    if (validURL) {
        displayURL(userURL, shortenURL(userURL));
        // console.log(shortenURL(userURL));
    }
    else {
        alert("No valid url");
    }
});
