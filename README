# URL Shortener

A simple URL shortener built with TypeScript and pure front-end technologies. This tool allows users to convert long URLs into short, shareable links and provides a simple FAQ section.

## Features

- Shortens URLs with a randomly generated unique ID.
- Stores original URLs in `localStorage`.
- Automatically validates URLs before shortening.
- Displays generated short links with a copy-to-clipboard feature.
- Redirects shortened URLs to the original link in a new tab.
- Includes an FAQ section with toggle functionality.

## How It Works

1. Enter a long URL in the input field.
2. Click the "Shrink" button.
3. A shortened URL will be displayed.
4. Click the shortened URL to open the original link in a new tab.

## Installation & Usage

1. Clone the repository or download the source code.
2. Open `index.html` in a web browser.
3. Enter a URL and click the "Shrink" button.
4. Click the shortened link to be redirected to the original URL.

## Code Explanation

- `shortenURL(originalURL: string): string` - Generates a unique short URL and saves it in `localStorage`.
- `isValidURL(url: string): boolean` - Checks if the entered URL is valid.
- `displayURL(originalUrl: string, shortUrl: string)` - Displays the shortened URL and handles redirection.
- `appendFAQToDOM(faqs: FAQItem[])` - Dynamically loads FAQs into the page.
- `toggleModalQuestion(element: HTMLDivElement)` - Expands/collapses FAQ answers.

## Technologies Used

- TypeScript
- HTML
- CSS
- LocalStorage API

## Future Improvements

- Customizable short URLs.
- Expiration dates for shortened URLs.
- Backend integration for persistent storage.
