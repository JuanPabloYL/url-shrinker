const form = document.querySelector("#form") as HTMLFormElement;
const input = document.querySelector("#input-url") as HTMLInputElement;
const questionsHeader = document.querySelectorAll(
  ".question__header"
) as NodeListOf<HTMLDivElement>;

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

const toggleModalQuestion = (element: HTMLDivElement) => {
  const parentElement = element.closest(".question") as HTMLDivElement;

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
  } else {
    alert("No valid url");
  }
});
