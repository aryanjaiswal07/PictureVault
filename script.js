// 1. Target key DOM elements
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

// Optional enhancement element: create or select a result count container
let countDisplay = document.getElementById("result-count");
if (!countDisplay) {
  countDisplay = document.createElement("p");
  countDisplay.id = "result-count";
  countDisplay.className = "result-count";
  form.insertAdjacentElement("afterend", countDisplay);
}

// 2. Event Listener: Catch the search
form.addEventListener("submit", async (event) => {
  // Prevent default form submission (page reload)
  event.preventDefault();

  // Read and clean the query text
  const query = input.value.trim();

  // Task 4: Ignore empty searches
  if (!query) {
    return;
  }

  // Fetch and render process
  try {
    await performSearch(query);
  } catch (error) {
    console.error("Error fetching or rendering results:", error);
  }
});

// 3. Fetch the data from Wikimedia Commons API
async function performSearch(query) {
  // Task 2: Build URL with encodeURIComponent
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    "&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*";

  // Send request and await response
  const response = await fetch(url);

  // Check if response succeeded
  if (!response.ok) {
    throw new Error(`API Request failed with status ${response.status}`);
  }

  // Parse JSON data
  const data = await response.json();

  // Extract items from Wikimedia JSON structure
  const pages = data.query?.pages;
  const items = pages ? Object.values(pages) : [];

  // Task 3 & 5: Render results and update result count
  renderResults(items, query);
}

// 4. Render the results into the DOM
function renderResults(items, query) {
  // Task 3: Clear old results before adding new ones
  resultsContainer.innerHTML = "";

  // Task 5 (Enhancement): Update result count display
  if (items.length === 0) {
    countDisplay.textContent = `No results found for "${query}".`;
    return;
  }
  countDisplay.textContent = `Showing ${items.length} results for "${query}"`;

  // Loop through items and create card elements
  items.forEach((item) => {
    // Extract image URL and page title safely
    const imageInfo = item.imageinfo ? item.imageinfo[0] : null;
    const imageUrl = imageInfo ? imageInfo.thumburl : "";
    const filePageUrl = imageInfo ? imageInfo.descriptionurl : "#";
    const title = item.title.replace(/^File:/, ""); // Clean up "File:" prefix

    // Skip items without a valid image URL
    if (!imageUrl) return;

    // Build the card container (<article class="card">)
    const card = document.createElement("article");
    card.className = "card";

    // Task 5 (Enhancement): Make each card link to the full file page on Wikimedia
    const link = document.createElement("a");
    link.href = filePageUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "card-link";

    // Build the image element
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = title;

    // Build the caption/title element
    const caption = document.createElement("p");
    caption.textContent = title;

    // Assemble elements together
    link.appendChild(img);
    link.appendChild(caption);
    card.appendChild(link);
    resultsContainer.appendChild(card);
  });
}