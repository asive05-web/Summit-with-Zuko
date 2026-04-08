/* ═══════════════════════════════════════════
   SUMMIT WITH ZUKO — app.js
   Firebase real-time bidding logic
   ═══════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   STEP 1: FIREBASE CONFIG
   Go to console.firebase.google.com
   Create a project → Realtime Database → Get config
   Paste your config object below
───────────────────────────────────────────── */
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  databaseURL:       "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

/* ─────────────────────────────────────────────
   STEP 2: ARTWORK DATA
   Fill in each artwork from the Artlogic catalog.
   - id: unique slug (no spaces)
   - image: path to the image file or URL
   - startingBid: the ZAR price from Artlogic
───────────────────────────────────────────── */
const ARTWORKS = [
  {
    id:          "benon-lutaaya-self-reflection",
    title:       "Self Reflection, 2017",
    artist:      "Benon Lutaaya",
    medium:      "Mixed media and collage on canvas",
    dimensions:  "76 × 76 cm | framed 104 × 106 × 8 cm",
    ref:         "S30003",
    startingBid: 600000,
    image:       "" // INSERT: path or URL to image
  },
  {
    id:          "sarah-grace-meadow-love",
    title:       "Meadow Love, 2022",
    artist:      "Sarah Grace",
    medium:      "Acrylic, gold leaf, charcoal and soft pastels on canvas",
    dimensions:  "Total triptych 206 × 383 cm",
    ref:         "GS-0140",
    startingBid: 325000,
    image:       ""
  },
  {
    id:          "blessing-ngobeni-blackdoor",
    title:       "Blackdoor, 2016",
    artist:      "Blessing Ngobeni",
    medium:      "Mixed media on canvas",
    dimensions:  "235 × 165 cm",
    ref:         "180017",
    startingBid: 320000,
    image:       ""
  },
  {
    id:          "blessing-ngobeni-middle-finger",
    title:       "Middle Finger, Nose, 2015",
    artist:      "Blessing Ngobeni",
    medium:      "Mixed media on canvas",
    dimensions:  "200 × 150 × 7 cm",
    ref:         "180013",
    startingBid: 300000,
    image:       ""
  },
  {
    id:          "themba-khumalo-ukushona",
    title:       "Ukushona Kwelanga, 2022",
    artist:      "Themba Khumalo",
    medium:      "Charcoal, pastel and coffee wash on paper",
    dimensions:  "100 × 140 cm | framed 119.5 × 159.5 × 7 cm",
    ref:         "KHUT-0026",
    startingBid: 260000,
    image:       ""
  },
  {
    id:          "nelson-makamo-portrait-blue",
    title:       "Portrait Blue & Yellow, 2015",
    artist:      "Nelson Makamo",
    medium:      "Charcoal and pastel on paper",
    dimensions:  "76 × 56 cm | framed 110 × 91 cm",
    ref:         "190004",
    startingBid: 250000,
    image:       ""
  },
  {
    id:          "restone-maambo-woman-afro",
    title:       "The Woman with an Afro, 2025",
    artist:      "Restone Maambo",
    medium:      "Mixed media acrylic, charcoal and pastel on canvas",
    dimensions:  "145 × 109.5 × 3.5 cm",
    ref:         "MAAR-0092",
    startingBid: 230000,
    image:       ""
  },
  {
    id:          "solomon-omogboye-fragile",
    title:       "Fragile and Precious, 2024",
    artist:      "Solomon Omogboye",
    medium:      "Oil on canvas",
    dimensions:  "210 × 147 cm | framed 216 × 151 × 7 cm",
    ref:         "OMOS-1450255",
    startingBid: 170000,
    image:       ""
  },
  {
    id:          "solomon-omogboye-nest-3",
    title:       "Nest 3, 2024",
    artist:      "Solomon Omogboye",
    medium:      "Oil on canvas",
    dimensions:  "155 × 122 cm | framed 159 × 126 × 7 cm",
    ref:         "OMOS-1450258",
    startingBid: 140000,
    image:       ""
  },
  {
    id:          "solomon-omogboye-home-is-you",
    title:       "Home Is You, 2024",
    artist:      "Solomon Omogboye",
    medium:      "Oil on canvas",
    dimensions:  "144 × 122 cm | framed 148 × 126 × 7 cm",
    ref:         "OMOS-1450256",
    startingBid: 140000,
    image:       ""
  },
  {
    id:          "sarah-grace-romeo-juliette",
    title:       "Romeo & Juliette #1, 2024",
    artist:      "Sarah Grace",
    medium:      "Acrylic and soft pastels",
    dimensions:  "199 × 159 cm | framed 203 × 163 × 6.5 cm",
    ref:         "GRAS-0119",
    startingBid: 125000,
    image:       ""
  },
  {
    id:          "john-vusi-mfupi-four-four",
    title:       "Four-Four Mashinilatsane 3, 2018",
    artist:      "John Vusi Mfupi",
    medium:      "Magazine collage on paper",
    dimensions:  "120 × 159 cm",
    ref:         "MFUJ-20359",
    startingBid: 125000,
    image:       ""
  },
  {
    id:          "john-vusi-mfupi-fisherman-2",
    title:       "Fisherman 2, 2023",
    artist:      "John Vusi Mfupi",
    medium:      "Magazine collage on paper",
    dimensions:  "144 × 122 cm | framed 148 × 132 × 8.5 cm",
    ref:         "MFUJ-20433",
    startingBid: 125000,
    image:       ""
  },
  {
    id:          "fumani-walter-maluleke-hekani",
    title:       "I Hekani (During the Day 4), 2023",
    artist:      "Fumani Walter Maluleke",
    medium:      "Acrylic on grass matt",
    dimensions:  "192 × 218 cm | framed 172 × 246 × 8.5 cm",
    ref:         "MALF-0007",
    startingBid: 115000,
    image:       ""
  },
  {
    id:          "sarah-grace-rococo-dream",
    title:       "Rococo Dream, 2023",
    artist:      "Sarah Grace",
    medium:      "Mixed media acrylic, charcoal and soft pastels on canvas",
    dimensions:  "100 × 196 cm | framed 118.5 × 217 × 8.5 cm",
    ref:         "GRAS-0141",
    startingBid: 115000,
    image:       ""
  },
  {
    id:          "john-vusi-mfupi-floods-2",
    title:       "Floods 2, 2023",
    artist:      "John Vusi Mfupi",
    medium:      "Magazine collage on paper",
    dimensions:  "110 × 77 cm | framed 130 × 97.5 × 8 cm",
    ref:         "MFUJ-20440",
    startingBid: 86000,
    image:       ""
  },
  {
    id:          "themba-khumalo-umilo-2",
    title:       "Umilo 2, 2025",
    artist:      "Themba Khumalo",
    medium:      "Monoprint 1/1",
    dimensions:  "71 × 100 cm | framed 85 × 114 × 5 cm",
    ref:         "KHUT-0022",
    startingBid: 80000,
    image:       ""
  },
  {
    id:          "colbert-mashile-the-gate",
    title:       "The Gate, 2026",
    artist:      "Colbert Mashile",
    medium:      "Acrylic on paper",
    dimensions:  "150 × 112 cm | framed 172 × 132 × 7 cm",
    ref:         "MASH-0040",
    startingBid: 82800,
    image:       ""
  },
  {
    id:          "norman-catherine-17021",
    title:       "17021, 2017",
    artist:      "Norman Catherine",
    medium:      "Oil on wood",
    dimensions:  "30.5 × 18 × 3.5 cm",
    ref:         "080123",
    startingBid: 45000,
    image:       ""
  },
  {
    id:          "norman-catherine-joy-ride",
    title:       "Joy Ride, 30/45, 2002",
    artist:      "Norman Catherine",
    medium:      "Five colour lithograph",
    dimensions:  "75 × 106 cm | framed 88.5 × 118.5 × 5 cm",
    ref:         "CATN-0637/30",
    startingBid: 28500,
    image:       ""
  }
];

/* ─────────────────────────────────────────────
   STEP 3: WHISKEY DATA
   Fill this in once Zuko sends the whiskey link.
   Add one object per whiskey/cigar lot.
───────────────────────────────────────────── */
const WHISKEY_ITEMS = [
  {
    id:          "whiskey-lot-1",
    name:        "Whiskey & Cigars Collection",       // INSERT: actual name
    description: "Details coming soon. A curated selection of rare single malts and premium cigars for the discerning collector.", // INSERT: real description
    startingBid: 5000,                                 // INSERT: actual starting bid
    image:       ""                                    // INSERT: image path or URL
  }
];

/* ══════════════════════════════════════════════
   BELOW THIS LINE — DO NOT EDIT UNLESS
   YOU KNOW WHAT YOU ARE DOING
══════════════════════════════════════════════ */

// ─── FIREBASE INIT ───
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ─── MODAL STATE ───
let activeItemId    = null;
let activeItemType  = null; // 'art' | 'whiskey'
let activeBidMin    = 0;

// ─── FORMAT CURRENCY ───
function formatZAR(amount) {
  return "R " + Number(amount).toLocaleString("en-ZA");
}

/* ─── BUILD ART CARD ─── */
function buildArtCard(artwork) {
  const card = document.createElement("div");
  card.className = "art-card";
  card.dataset.id = artwork.id;

  const imgHtml = artwork.image
    ? `<img src="${artwork.image}" alt="${artwork.title}" loading="lazy" />`
    : `<div class="art-card-img-placeholder">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.3">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
       </div>`;

  card.innerHTML = `
    <div class="art-card-img">${imgHtml}</div>
    <div class="art-card-body">
      <p class="art-card-artist">${artwork.artist}</p>
      <p class="art-card-title">${artwork.title}</p>
      <p class="art-card-meta">${artwork.medium}<br />${artwork.dimensions}</p>
      <div class="art-card-bid-row">
        <div>
          <p class="art-card-bid-label">Current bid</p>
          <p class="art-card-bid-amount" id="bid-display-${artwork.id}">${formatZAR(artwork.startingBid)}</p>
        </div>
      </div>
      <button class="art-card-bid-btn" data-id="${artwork.id}" data-type="art">Place Bid</button>
    </div>`;

  return card;
}

/* ─── BUILD WHISKEY CARD ─── */
function buildWhiskeyCard(item) {
  const card = document.createElement("div");
  card.className = "whiskey-card";
  card.dataset.id = item.id;

  const imgHtml = item.image
    ? `<img src="${item.image}" alt="${item.name}" loading="lazy" />`
    : `<div class="whiskey-card-img-placeholder">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.3">
          <rect x="12" y="1" width="16" height="8" rx="2"/>
          <path d="M8 9h24l4 12v30a4 4 0 01-4 4H8a4 4 0 01-4-4V21L8 9z"/>
          <line x1="4" y1="30" x2="36" y2="30"/>
        </svg>
        <span>Image coming soon</span>
       </div>`;

  card.innerHTML = `
    <div class="whiskey-card-img">${imgHtml}</div>
    <div class="whiskey-card-body">
      <div class="whiskey-badge">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
        Exclusive Lot
      </div>
      <h3 class="whiskey-card-title">${item.name}</h3>
      <p class="whiskey-card-desc">${item.description}</p>
      <div class="art-card-bid-row">
        <div>
          <p class="art-card-bid-label">Current bid</p>
          <p class="art-card-bid-amount" id="bid-display-${item.id}">${formatZAR(item.startingBid)}</p>
        </div>
      </div>
      <button class="art-card-bid-btn" data-id="${item.id}" data-type="whiskey" style="margin-top:0.8rem;">Place Bid</button>
    </div>`;

  return card;
}

/* ─── RENDER GRIDS ─── */
function renderArtGrid() {
  const grid = document.getElementById("artGrid");
  grid.innerHTML = "";
  ARTWORKS.forEach(art => {
    const card = buildArtCard(art);
    grid.appendChild(card);
    listenToBid(art.id, art.startingBid);
  });
}

function renderWhiskeyGrid() {
  const grid = document.getElementById("whiskeyGrid");
  grid.innerHTML = "";
  WHISKEY_ITEMS.forEach(item => {
    const card = buildWhiskeyCard(item);
    grid.appendChild(card);
    listenToBid(item.id, item.startingBid);
  });
}

/* ─── FIREBASE: LISTEN TO BID IN REAL TIME ─── */
function listenToBid(itemId, startingBid) {
  db.ref("bids/" + itemId + "/currentBid").on("value", (snapshot) => {
    const current = snapshot.val() || startingBid;
    const el = document.getElementById("bid-display-" + itemId);
    if (el) el.textContent = formatZAR(current);

    // If modal is open for this item, update the modal too
    if (activeItemId === itemId) {
      document.getElementById("modalCurrentBid").textContent = formatZAR(current);
      document.getElementById("modalHint").textContent =
        "Minimum bid: " + formatZAR(current + 1);
      activeBidMin = current + 1;
    }
  });
}

/* ─── FIREBASE: GET CURRENT BID ─── */
function getCurrentBid(itemId, startingBid) {
  return db.ref("bids/" + itemId + "/currentBid").get().then(snap => snap.val() || startingBid);
}

/* ─── FIREBASE: PLACE BID ─── */
async function placeBid(itemId, bidderName, amount, startingBid) {
  const currentSnap = await db.ref("bids/" + itemId + "/currentBid").get();
  const current = currentSnap.val() || startingBid;

  if (amount <= current) {
    return { success: false, message: "Your bid must be higher than " + formatZAR(current) };
  }

  const bidRef = db.ref("bids/" + itemId);
  await bidRef.update({
    currentBid:  amount,
    lastBidder:  bidderName || "Anonymous",
    updatedAt:   Date.now()
  });

  // Log to bid history
  await db.ref("bids/" + itemId + "/history").push({
    amount:    amount,
    bidder:    bidderName || "Anonymous",
    timestamp: Date.now()
  });

  /* ─────────────────────────────────────────────
     STEP 4: GOOGLE SHEETS LOGGING (optional)
     Replace SHEET_WEBHOOK_URL with your Apps Script
     Web App URL to auto-log bids to Google Sheets.

     Apps Script setup:
     1. Open Google Sheets → Extensions → Apps Script
     2. Paste the doPost function from SHEET_SCRIPT.md
     3. Deploy as Web App (Anyone can access)
     4. Copy the URL and paste below
  ───────────────────────────────────────────── */
  const SHEET_WEBHOOK_URL = ""; // INSERT your Apps Script URL here

  if (SHEET_WEBHOOK_URL) {
    const allItems = [...ARTWORKS, ...WHISKEY_ITEMS];
    const item = allItems.find(a => a.id === itemId);
    fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId:    itemId,
        itemName:  item ? item.title || item.name : itemId,
        bidder:    bidderName || "Anonymous",
        amount:    amount,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {}); // silent fail — Firebase is source of truth
  }

  return { success: true };
}

/* ─── MODAL ─── */
function openModal(itemId, type) {
  const allItems = [...ARTWORKS, ...WHISKEY_ITEMS];
  const item = allItems.find(i => i.id === itemId);
  if (!item) return;

  activeItemId   = itemId;
  activeItemType = type;
  activeBidMin   = item.startingBid;

  document.getElementById("modalTitle").textContent = item.title || item.name;
  document.getElementById("modalBidAmount").value   = "";
  document.getElementById("modalBidderName").value  = "";
  document.getElementById("modalFeedback").textContent = "";
  document.getElementById("modalFeedback").className    = "modal-feedback";

  getCurrentBid(itemId, item.startingBid).then(current => {
    document.getElementById("modalCurrentBid").textContent = formatZAR(current);
    document.getElementById("modalHint").textContent = "Minimum bid: " + formatZAR(current + 1);
    activeBidMin = current + 1;
  });

  document.getElementById("modalOverlay").classList.add("open");
  setTimeout(() => document.getElementById("modalBidAmount").focus(), 300);
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  activeItemId   = null;
  activeItemType = null;
}

/* ─── MODAL SUBMIT ─── */
document.getElementById("modalSubmit").addEventListener("click", async () => {
  const amount = parseInt(document.getElementById("modalBidAmount").value, 10);
  const name   = document.getElementById("modalBidderName").value.trim();
  const fb     = document.getElementById("modalFeedback");

  if (!amount || isNaN(amount)) {
    fb.textContent  = "Please enter a valid bid amount.";
    fb.className    = "modal-feedback error";
    return;
  }

  if (amount < activeBidMin) {
    fb.textContent = "Your bid must be at least " + formatZAR(activeBidMin);
    fb.className   = "modal-feedback error";
    return;
  }

  const btn = document.getElementById("modalSubmit");
  btn.textContent = "Placing bid...";
  btn.disabled    = true;
  fb.textContent  = "";
  fb.className    = "modal-feedback";

  const allItems = [...ARTWORKS, ...WHISKEY_ITEMS];
  const item = allItems.find(i => i.id === activeItemId);

  const result = await placeBid(activeItemId, name, amount, item.startingBid);

  btn.textContent = "Confirm Bid";
  btn.disabled    = false;

  if (result.success) {
    fb.textContent = "Bid placed successfully!";
    fb.className   = "modal-feedback success";
    setTimeout(closeModal, 1800);
  } else {
    fb.textContent = result.message;
    fb.className   = "modal-feedback error";
  }
});

/* ─── CLOSE MODAL ─── */
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ─── BID BUTTON DELEGATION ─── */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-id][data-type]");
  if (btn) openModal(btn.dataset.id, btn.dataset.type);
});

/* ─── NAV SCROLL ─── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

/* ─── MOBILE MENU ─── */
const burger    = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

/* ─── COUNTDOWN ─── */
function updateCountdown() {
  // INSERT: Change this date if the auction end date changes
  const endDate = new Date("2026-04-15T23:59:59+02:00").getTime();
  const now     = Date.now();
  const diff    = endDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      `<p style="font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);">Auction Closed</p>`;
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("cd-days").textContent  = String(d).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(h).padStart(2, "0");
  document.getElementById("cd-mins").textContent  = String(m).padStart(2, "0");
  document.getElementById("cd-secs").textContent  = String(s).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ─── INIT ─── */
renderArtGrid();
renderWhiskeyGrid();
