// Initial array of quotes
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The purpose of our lives is to be happy.", category: "Happiness" },
  { text: "Don’t let yesterday take up too much of today.", category: "Motivation" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuote');
const categoryDisplay = document.getElementById('categoryDisplay');

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Add some!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}"`;
  categoryDisplay.textContent = `Category: ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields before adding a quote.");
    return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);

  // Clear inputs
  document.getElementById('newQuoteText').value = "";
  document.getElementById('newQuoteCategory').value = "";

  // Show confirmation dynamically
  const message = document.createElement('p');
  message.textContent = "✅ New quote added successfully!";
  message.style.color = "green";
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 2000);
}

// Attach event listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
