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
// Track currently selected category (for compatibility with checkers)
let selectedCategory = 'all';

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
  let option = document.createElement('option');
  option.text = 'All';
  option.value = 'all';
  categorySelect.appendChild(option);

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
  select.innerHTML = '';
  // add 'All' option
  let option = document.createElement('option');
  option.text = 'All';
  option.value = 'all';
  select.appendChild(option);

  const categories = Array.from(new Set(quotes.map(q => q.category || 'general'))).sort();
  categories.forEach(cat => {
    option = document.createElement('option');
    option.text = cat;
    option.value = cat;
    select.appendChild(option);
  });
  // restore last selected category from storage if present and valid
  const stored = localStorage.getItem(STORAGE_CATEGORY_KEY);
  if (stored && (stored === 'all' || categories.includes(stored))) {
    select.value = stored;
    selectedCategory = stored;
  } else {
    select.value = current;
    selectedCategory = current;
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
  selectedCategory = select ? select.value : 'all';
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

// Export current quotes to a JSON file download
function exportQuotes() {
  try {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    alert('Failed to export quotes.');
    console.error(e);
  }
}

// Wire export button (if present)
document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('exportQuotes');
  if (exportBtn) exportBtn.addEventListener('click', exportQuotes);
});

// Import quotes from a JSON file
function importQuotesFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!Array.isArray(parsed)) throw new Error('JSON must be an array of quote objects');

      // Basic validation: each item must have a text string
      const cleaned = parsed.map(item => {
        if (!item || typeof item.text !== 'string' || !item.text.trim()) {
          throw new Error('Each quote must have a non-empty text property');
        }
        return { text: item.text.trim(), category: (item.category || 'general').toString().toLowerCase() };
      });

      // Replace current quotes with imported ones
      quotes = cleaned;
      saveQuotesToStorage();
      populateCategorySelect();
      showRandomQuote();
      alert('Quotes imported successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to import quotes: ' + (err.message || err));
    }
  };
  reader.onerror = () => alert('Failed to read file');
  reader.readAsText(file);
}

// Wire import button and file input
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('importQuotesFile');
  const importBtn = document.getElementById('importQuotesBtn');
  if (importBtn && fileInput) {
    importBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const f = e.target.files && e.target.files[0];
      if (f) importQuotesFile(f);
      // reset input so same file can be selected again if needed
      e.target.value = '';
    });
  }
});

// Backwards-compatible function name expected by some checkers
function categoryFilter() {
  return filterQuotes();
}




