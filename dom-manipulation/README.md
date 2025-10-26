TASK 0 

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


  TASK 1

  Objective: Enhance the “Dynamic Quote Generator” by implementing a dynamic content filtering system that allows users to filter quotes by categories stored in web storage. This task focuses on integrating interactive filtering capabilities that utilize web storage to enhance user experience.

Task Description:
Expand the functionality of the “Dynamic Quote Generator” to include a filtering system based on categories. Users will be able to select a category and see only the quotes that match this category. This involves manipulating the DOM to dynamically update the displayed content and using web storage to remember the user’s last selected filter across sessions.

Step 1: Update the HTML Structure
Add Category Filter:
Introduce a dropdown menu or a set of buttons that allow the user to select a category for filtering quotes.
  <select id="categoryFilter" onchange="filterQuotes()">
    <option value="all">All Categories</option>
    <!-- Dynamically populated categories -->
  </select>
Step 2: Implement Filtering Logic in JavaScript
Populate Categories Dynamically:

Use the existing quotes array to extract unique categories and populate the dropdown menu.
Name the function behind this implementation populateCategories.
Filter Quotes Based on Selected Category:

Implement the filterQuotes function to update the displayed quotes based on the selected category.
Remember the Last Selected Filter:

Use local storage to save the last selected category filter and restore it when the user revisits the page.
Step 3: Update Web Storage with Category Data
Enhance Storage Functionality:
Update the addQuote function to also update the categories in the dropdown if a new category is introduced.
Ensure that changes in categories and filters are reflected in real-time and persisted across sessions.
Step 4: Testing and Deployment
Ensure Comprehensive Testing:
Test the application to ensure the filtering system works correctly across different browsers and sessions.
Verify that category changes and filter preferences are preserved as expected using web storage.