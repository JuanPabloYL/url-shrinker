const form = document.querySelector("#form") as HTMLFormElement;
const input = document.querySelector("#input-url") as HTMLInputElement;
const questionsHeader = document.querySelectorAll(
  ".question__header"
) as NodeListOf<HTMLDivElement>;

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is a URL shrinker?",
    answer:
      "A URL shrinker is a tool that takes a long URL and shortens it into a more manageable and shareable link.",
  },
  {
    question: "How do I use this URL shrinker?",
    answer:
      "Simply paste your long URL into the input field, click the 'Shrink' button, and your shortened URL will be generated.",
  },
  {
    question: "Is this URL shrinker free to use?",
    answer: "Yes, this URL shrinker is completely free to use!",
  },
  {
    question: "Do I need to create an account to use this tool?",
    answer:
      "No, you don't need an account. This tool is designed to be simple and accessible to everyone.",
  },
  {
    question: "Can I customize my shortened URL?",
    answer:
      "Currently, this tool does not support customizing shortened URLs. It generates a random, unique short link for you.",
  },
  {
    question: "Is my data safe with this URL shrinker?",
    answer:
      "Yes, we do not store or track any personal data. Your URLs are processed securely and anonymously.",
  },
  {
    question: "What happens if my shortened URL expires?",
    answer:
      "This tool does not currently support expiration dates for shortened URLs. Once generated, the link will remain active.",
  },
  {
    question: "Can I share my shortened URL on social media?",
    answer:
      "Absolutely! Shortened URLs are perfect for sharing on social media platforms, emails, or anywhere else.",
  },
];

const shortenURL = (originalURL: string): string => {
  const baseURL = "https://shortify.io/";
  const uniqueID = Math.random().toString(36).substring(2, 8);

  // Store the original URL in localStorage
  localStorage.setItem(uniqueID, originalURL);

  return baseURL + uniqueID;
};

const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const appendFAQToDOM = (faqs: FAQItem[]) => {
  const questionsContainer = document.querySelector(
    ".questions-container"
  ) as HTMLDivElement;
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

    const newQuestion = questionsContainer.lastElementChild as HTMLDivElement;

    const questionHeader = newQuestion.querySelector(
      ".question__header"
    ) as HTMLDivElement;

    if (questionHeader) {
      questionHeader.onclick = () => {
        const parentElement = questionHeader.closest(
          ".question"
        ) as HTMLDivElement;
        parentElement.classList.toggle("open");
      };
    }
  });
};

const toggleModalQuestion = (element: HTMLDivElement) => {
  const parentElement = element.closest(".question") as HTMLDivElement;

  parentElement.classList.toggle("open");
};

questionsHeader.forEach((question) => {
  question.addEventListener("click", () => toggleModalQuestion(question));
});

document.addEventListener("DOMContentLoaded", () => appendFAQToDOM(faqs));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userURL = input.value;

  const validURL = isValidURL(userURL);

  if (validURL) {
    console.log(shortenURL(userURL));
  } else {
    alert("No valid url");
  }
});
