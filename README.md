# PictureVault

PictureVault is a clean, responsive web application designed to let users easily search, discover, and explore millions of free high-quality visual assets across the web.

## Key Design Decisions

1. **Category Quick-Pick Chips:** Added interactive suggestion buttons directly below the search bar to allow users to quickly search popular visual topics (like *Nature* or *Architecture*) with a single click.
2. **Sticky Navigation Header:** Built a fixed/sticky header layout so the search bar and category filters remain easily accessible as users scroll through image results.
3. **Flexible CSS Grid System:** Utilized `repeat(auto-fill, minmax(240px, 1fr))` on the results container to ensure a smooth, multi-column grid layout that automatically adapts across mobile, tablet, and desktop viewports without cluttering the stylesheet with extra media queries.
