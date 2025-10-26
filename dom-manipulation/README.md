Objective: Learn to create and manipulate dynamic content in a web application using advanced DOM manipulation techniques. This task focuses on generating interactive elements directly through JavaScript without relying on frameworks.

Task Description:
Develop a web application that dynamically generates content based on user input and interactions. This project will provide hands-on experience with creating, modifying, and managing elements in the DOM, demonstrating the core capabilities of JavaScript for building interactive web pages.

Specific Project Details:
Application Overview:
Create a “Dynamic Quote Generator” that displays different quotes based on user-selected categories. Include functionality to add new quotes and categories dynamically through the user interface.
Step 1: Setup the Basic HTML Structure
HTML Setup:
Create a simple HTML file index.html with basic structure including placeholders for dynamic content.
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Quote Generator</title>
  </head>
  <body>
    <h1>Dynamic Quote Generator</h1>
    <div id="quoteDisplay"></div>
    <button id="newQuote">Show New Quote</button>
    <script src="script.js"></script>
  </body>
  </html>
Step 2: Implement Advanced DOM Manipulation in JavaScript
JavaScript Implementation:
Write a JavaScript file (script.js) that handles the creation and manipulation of DOM elements based on user interactions.
Manage an array of quote objects where each quote has a text and a category. Implement functions to display a random quote and to add new quotes called showRandomQuote and createAddQuoteForm` respectively
Step 3: Dynamic Quote Addition
Adding Quotes Dynamically:
Enhance the application to allow users to add their own quotes through a simple form interface. Update the DOM and the quotes array dynamically when a new quote is added.
  <div>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  </div>