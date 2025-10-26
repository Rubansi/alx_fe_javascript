// Dynamic Quote Generator - script.js

// Initial sample quotes (will be replaced by stored data if available)
const DEFAULT_QUOTES = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "The purpose of our lives is to be happy.", category: "life" },
  { text: "Do one thing every day that scares you.", category: "courage" }
];

// Storage keys
const STORAGE_QUOTES_KEY = 'dq_quotes_v1';
const STORAGE_CATEGORY_KEY = 'dq_last_category_v1';

// Load quotes from localStorage or use defaults
let quotes = loadQuotesFromStorage();

function loadQuotesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_QUOTES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {
    // ignore and fall back to default
  }
  return DEFAULT_QUOTES.slice();
}

function saveQuotesToStorage() {
  try {
    localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(quotes));
  } catch (e) {
    console.warn('Failed to save quotes to storage', e);
  }
}

// Cache DOM nodes
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Create and insert the Add Quote form and category filter
function createAddQuoteForm() {
  const container = document.createElement('div');
  container.id = 'quoteControls';

  // Category selector
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Category: ';
  categoryLabel.htmlFor = 'categorySelect';
  const categorySelect = document.createElement('select');
  categorySelect.id = 'categorySelect';
  categorySelect.appendChild(new Option('All', 'all'));

  // New quote inputs
  const inputText = document.createElement('input');
  inputText.id = 'newQuoteText';
  inputText.type = 'text';
  inputText.placeholder = 'Enter a new quote';
  const inputCategory = document.createElement('input');
  inputCategory.id = 'newQuoteCategory';
  inputCategory.type = 'text';
  inputCategory.placeholder = 'Enter quote category';

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = 'Add Quote';
  addBtn.addEventListener('click', addQuote);

  container.appendChild(categoryLabel);
  container.appendChild(categorySelect);
  container.appendChild(document.createElement('br'));
  container.appendChild(inputText);
  container.appendChild(inputCategory);
  container.appendChild(addBtn);

  document.body.insertBefore(container, quoteDisplay.nextSibling);

  populateCategorySelect();
}

function populateCategorySelect() {
  const select = document.getElementById('categorySelect');
  if (!select) return;

  // preserve current
  const current = select.value || 'all';
  select.innerHTML = '';
  select.appendChild(new Option('All', 'all'));

  const categories = Array.from(new Set(quotes.map(q => q.category || 'general'))).sort();
  categories.forEach(cat => select.appendChild(new Option(cat, cat)));
  // restore last selected category from storage if present and valid
  const stored = localStorage.getItem(STORAGE_CATEGORY_KEY);
  if (stored && (stored === 'all' || categories.includes(stored))) {
    select.value = stored;
  } else {
    select.value = current;
  }
}

// New function: populateCategories (alias for README's mention) kept for compatibility
function populateCategories() {
  populateCategorySelect();
}

function saveLastSelectedCategory(cat) {
  try {
    localStorage.setItem(STORAGE_CATEGORY_KEY, cat);
  } catch (e) {
    // ignore
  }
}

function filterQuotes() {
  const select = document.getElementById('categorySelect');
  const category = select && select.value !== 'all' ? select.value : null;
  saveLastSelectedCategory(select ? select.value : 'all');
  // Just show a random quote from the selected category to match existing behavior
  showRandomQuote();
}

function showRandomQuote() {
  const select = document.getElementById('categorySelect');
  const category = select && select.value !== 'all' ? select.value : null;

  const pool = category ? quotes.filter(q => q.category === category) : quotes;
  if (!pool.length) {
    quoteDisplay.textContent = 'No quotes available for this category.';
    return;
  }

  const idx = Math.floor(Math.random() * pool.length);
  const q = pool[idx];

  // Render
  quoteDisplay.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = `"${q.text}"`;
  const small = document.createElement('small');
  small.textContent = ` — ${q.category || 'general'}`;
  quoteDisplay.appendChild(p);
  quoteDisplay.appendChild(small);
}

function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const catInput = document.getElementById('newQuoteCategory');
  const text = textInput && textInput.value.trim();
  const category = catInput && catInput.value.trim().toLowerCase() || 'general';

  if (!text) {
    alert('Please enter a quote text.');
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotesToStorage();
  textInput.value = '';
  catInput.value = '';
  populateCategorySelect();
  showRandomQuote();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
  // wire show new quote button
  if (newQuoteBtn) newQuoteBtn.addEventListener('click', showRandomQuote);

  // wire category select change to filterQuotes
  const select = document.getElementById('categorySelect');
  if (select) select.addEventListener('change', filterQuotes);

  // ensure category selection is restored and show an initial quote
  populateCategorySelect();
  showRandomQuote();
});




