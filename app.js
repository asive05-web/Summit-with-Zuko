/* ═══════════════════════════════════════════
   SUMMIT WITH ZUKO — app.js
   ═══════════════════════════════════════════ */

const firebaseConfig = {
  apiKey:            "AIzaSyBEQtDq8nmnjVQ_jE_s1JZrEE0QHEX3n8Q",
  authDomain:        "summit-with-zuko.firebaseapp.com",
  databaseURL:       "https://summit-with-zuko-default-rtdb.firebaseio.com",
  projectId:         "summit-with-zuko",
  storageBucket:     "summit-with-zuko.firebasestorage.app",
  messagingSenderId: "992070995112",
  appId:             "1:992070995112:web:02da0153febce3e554469d"
};

const ARTWORKS = [
  { id: "benon-lutaaya-self-reflection", title: "Self Reflection, 2017", artist: "Benon Lutaaya", medium: "Mixed media and collage on canvas", dimensions: "76 × 76 cm | framed 104 × 106 × 8 cm", ref: "S30003", startingBid: 600000, image: "self.png" },
  { id: "sarah-grace-meadow-love", title: "Meadow Love, 2022", artist: "Sarah Grace", medium: "Acrylic, gold leaf, charcoal and soft pastels on canvas", dimensions: "Total triptych 206 × 383 cm", ref: "GS-0140", startingBid: 325000, image: "meadow.png" },
  { id: "blessing-ngobeni-blackdoor", title: "Blackdoor, 2016", artist: "Blessing Ngobeni", medium: "Mixed media on canvas", dimensions: "235 × 165 cm", ref: "180017", startingBid: 320000, image: "blackdoor.png" },
  { id: "blessing-ngobeni-middle-finger", title: "Middle Finger, Nose, 2015", artist: "Blessing Ngobeni", medium: "Mixed media on canvas", dimensions: "200 × 150 × 7 cm", ref: "180013", startingBid: 300000, image: "middle.png" },
  { id: "themba-khumalo-ukushona", title: "Ukushona Kwelanga, 2022", artist: "Themba Khumalo", medium: "Charcoal, pastel and coffee wash on paper", dimensions: "100 × 140 cm | framed 119.5 × 159.5 × 7 cm", ref: "KHUT-0026", startingBid: 260000, image: "ukushona.png" },
  { id: "nelson-makamo-portrait-blue", title: "Portrait Blue & Yellow, 2015", artist: "Nelson Makamo", medium: "Charcoal and pastel on paper", dimensions: "76 × 56 cm | framed 110 × 91 cm", ref: "190004", startingBid: 250000, image: "potrait.png" },
  { id: "terence-maluleke-crimson-accord", title: "Crimson Accord, 2026", artist: "Terence Ntsako Maluleke", medium: "Acrylic on Canvas", dimensions: "", ref: "", startingBid: 220000, image: "crimson.png" },
  { id: "restone-maambo-woman-afro", title: "The Woman with an Afro, 2025", artist: "Restone Maambo", medium: "Mixed media acrylic, charcoal and pastel on canvas", dimensions: "145 × 109.5 × 3.5 cm", ref: "MAAR-0092", startingBid: 230000, image: "the.png" },
  { id: "solomon-omogboye-fragile", title: "Fragile and Precious, 2024", artist: "Solomon Omogboye", medium: "Oil on canvas", dimensions: "210 × 147 cm | framed 216 × 151 × 7 cm", ref: "OMOS-1450255", startingBid: 170000, image: "fragile.png" },
  { id: "solomon-omogboye-nest-3", title: "Nest 3, 2024", artist: "Solomon Omogboye", medium: "Oil on canvas", dimensions: "155 × 122 cm | framed 159 × 126 × 7 cm", ref: "OMOS-1450258", startingBid: 140000, image: "nest.png" },
  { id: "solomon-omogboye-home-is-you", title: "Home Is You, 2024", artist: "Solomon Omogboye", medium: "Oil on canvas", dimensions: "144 × 122 cm | framed 148 × 126 × 7 cm", ref: "OMOS-1450256", startingBid: 140000, image: "home.png" },
  { id: "terence-maluleke-babi-boys", title: "Babi Boys, 2026", artist: "Terence Ntsako Maluleke", medium: "Acrylic on Canvas", dimensions: "185 × 125 cm", ref: "", startingBid: 140000, image: "babi.png" },
  { id: "sarah-grace-romeo-juliette", title: "Romeo & Juliette #1, 2024", artist: "Sarah Grace", medium: "Acrylic and soft pastels", dimensions: "199 × 159 cm | framed 203 × 163 × 6.5 cm", ref: "GRAS-0119", startingBid: 125000, image: "romeo.png" },
  { id: "john-vusi-mfupi-four-four", title: "Four-Four Mashinilatsane 3, 2018", artist: "John Vusi Mfupi", medium: "Magazine collage on paper", dimensions: "120 × 159 cm", ref: "MFUJ-20359", startingBid: 125000, image: "four.png" },
  { id: "john-vusi-mfupi-fisherman-2", title: "Fisherman 2, 2023", artist: "John Vusi Mfupi", medium: "Magazine collage on paper", dimensions: "144 × 122 cm | framed 148 × 132 × 8.5 cm", ref: "MFUJ-20433", startingBid: 125000, image: "fisherman.png" },
  { id: "fumani-walter-maluleke-hekani", title: "I Hekani (During the Day 4), 2023", artist: "Fumani Walter Maluleke", medium: "Acrylic on grass matt", dimensions: "192 × 218 cm | framed 172 × 246 × 8.5 cm", ref: "MALF-0007", startingBid: 115000, image: "ihlekani.png" },
  { id: "sarah-grace-rococo-dream", title: "Rococo Dream, 2023", artist: "Sarah Grace", medium: "Mixed media acrylic, charcoal and soft pastels on canvas", dimensions: "100 × 196 cm | framed 118.5 × 217 × 8.5 cm", ref: "GRAS-0141", startingBid: 115000, image: "rococo.png" },
  { id: "john-vusi-mfupi-floods-2", title: "Floods 2, 2023", artist: "John Vusi Mfupi", medium: "Magazine collage on paper", dimensions: "110 × 77 cm | framed 130 × 97.5 × 8 cm", ref: "MFUJ-20440", startingBid: 86000, image: "floods.png" },
  { id: "colbert-mashile-the-gate", title: "The Gate, 2026", artist: "Colbert Mashile", medium: "Acrylic on paper", dimensions: "150 × 112 cm | framed 172 × 132 × 7 cm", ref: "MASH-0040", startingBid: 82800, image: "gaze.png" },
  { id: "themba-khumalo-umilo-2", title: "Umilo 2, 2025", artist: "Themba Khumalo", medium: "Monoprint 1/1", dimensions: "71 × 100 cm | framed 85 × 114 × 5 cm", ref: "KHUT-0022", startingBid: 80000, image: "umlilo.png" },
  { id: "norman-catherine-17021", title: "17021, 2017", artist: "Norman Catherine", medium: "Oil on wood", dimensions: "30.5 × 18 × 3.5 cm", ref: "080123", startingBid: 45000, image: "17.png" },
  { id: "norman-catherine-joy-ride", title: "Joy Ride, 30/45, 2002", artist: "Norman Catherine", medium: "Five colour lithograph", dimensions: "75 × 106 cm | framed 88.5 × 118.5 × 5 cm", ref: "CATN-0637/30", startingBid: 28500, image: "joy.png" }
];


const WHISKEY_ITEMS = [
  { id: "whiskey-rosebank-31", name: "Rosebank 31 Year Old (Bottled 2022) – Release Two", abv: "48.1%", region: "Lowland", description: "Comprised of scarce casks filled just before Rosebank was mothballed in 1993. Bright and zesty with lime and lemongrass, mint and chamomile on the palate, finishing with sweet peaches and long herbal notes.", startingBid: 35895, image: "Rosebank-31-Year-Old-Bottled-2022-Release-Two-1-1.jpeg" },
  { id: "whiskey-rosebank-32", name: "Rosebank 32 Year Old (Bottled 2023) – Release Three", abv: "47.6%", region: "Lowland", description: "The third and final edition in Rosebank's legacy release series. Sweet pineapple and candied ginger on the nose, velvety mouthfeel with butterscotch and tropical fruits, finishing with lemon and honeyed porridge.", startingBid: 41385, image: "Rosebank32Year.png" },
  { id: "whiskey-glenfarclas-1988", name: "Glenfarclas 1988 Family Cask – Cask #4966", abv: "53.4%", region: "Speyside", description: "Single cask bottled in 2013 from a refill sherry butt. Only 252 bottles. Rich caramel and nutty nose with gentle salinity, honey and dried fruits on the palate, long herbal and spiced oak finish.", startingBid: 7250, image: "glen.jpeg" },
  { id: "whiskey-glendronach-28-1994", name: "GlenDronach 28 Year 1994 – Cask #5289 (210/619)", abv: "52.1%", region: "Highland", description: "Distilled 18 November 1994, matured 28 years in a port pipe. Only 619 individually numbered bottles. Exceptionally smooth, rich and complex single malt.", startingBid: 13770, image: "GlenDronach-28-Year-1994-Cask-5289-619-bottle.png" },
  { id: "whiskey-glendronach-30-1992", name: "GlenDronach 30 Year Old 1992 – Cask #2386", abv: "56%", region: "Highland", description: "Distilled 4 December 1992, matured in an Oloroso Puncheon. 676 bottles. Cherry and burnt orange peel with dark chocolate on the nose, creamy coffee and chocolate-coated cherries on the palate.", startingBid: 18455, image: "glen 30.png" },
  { id: "whiskey-glendronach-31-1991", name: "GlenDronach 31 Year Old 1991 – Cask #1106", abv: "50.9%", region: "Highland", description: "Distilled 22 November 1991, matured in a Pedro Ximénez Puncheon. Only 667 bottles. Exceptionally smooth with rich, complex sherried character.", startingBid: 20895, image: "glen 31.png" },
  { id: "whiskey-bunnahabhain-30", name: "Bunnahabhain 30 Year Old", abv: "46.3%", region: "Islay", description: "Matured in ex-sherry casks on the Islay coast. Butterscotch and sweet sherry on the nose, strawberries and cream with rich toffee on the palate, finishing with stewed berries, ginger and salted caramel.", startingBid: 14995, image: "bunnahabhain.png" },
  { id: "whiskey-ardbeg-25", name: "Ardbeg 25 Year Old", abv: "46%", region: "Islay", description: "A quarter century of ageing from the legendary Ardbeg Distillery. Smoked cream, peppermint and toffee on the nose, vibrant peppery mouthfeel with sherbet lemon sweetness, long creamy and fudge-laden finish.", startingBid: 24650, image: "Ardbeg 25 Year 2023 (1).jpg" },
  { id: "whiskey-laphroaig-34-book4", name: "Laphroaig 34 Year Old – Ian Hunter Story Book 4: Malt Master", abv: "46.2%", region: "Islay", description: "Distilled 1987, finished in first-fill Oloroso sherry casks after bourbon maturation. Limited edition fourth instalment. Pears and peaches on the nose, sweet syrupy fruitiness rising to aniseed and creamy liquorice.", startingBid: 34450, image: "Laphroaig-34-Year-Old-The-Ian-Hunter-Story-Book-4.jpg" },
  { id: "whiskey-laphroaig-34-book5", name: "Laphroaig 34 Year Old – Ian Hunter Story Book 5: Malt Master", abv: "45.5%", region: "Islay", description: "The conclusion to the Ian Hunter Story series. Matured in bourbon barrels and Pedro Ximénez hogsheads. Lightly peaty with candyfloss and vanilla fudge, sweet and spicy with salted caramel and roast chestnuts.", startingBid: 24990, image: "Laphroaig 34 Year Old Book 5 (1).jpg" },
  { id: "whiskey-eagle-rare-20", name: "Eagle Rare – Double Eagle Very Rare 20 Year Old", abv: "50.5%", region: "USA", description: "Very limited 2024 release. Twice the ageing of standard Eagle Rare, presented in a stunning double crystal eagle decanter. Surprisingly balanced with vanilla, toasted oak and caramel after two decades in barrel.", startingBid: 73995, image: "Eagle Rare - Double Eagle Very Rare Whiskey 20 Year Old2024.jpg" },
  { id: "whiskey-macallan-30-double-cask", name: "Macallan 30 Year Old Double Cask (2023 Release)", abv: "43%", region: "Speyside", description: "Annual 30 Year Old release matured in sherry-seasoned American and European oak casks. Fresh honeycomb and sweet toffee on the nose, smooth cinnamon and ginger on the palate, finishing with sweet oak and soft spice.", startingBid: 77650, image: "Macallan 30 Year Old Double Cask 2023 Release.png" },
  { id: "whiskey-talisker-25", name: "Talisker 25 Year Old", abv: "45.8%", region: "Islay", description: "Highly regarded single malt known for its balance of rich, complex flavours and the signature maritime character that defines Talisker.", startingBid: 8645, image: "Talisker 25 Year Old.jpg" },
  { id: "whiskey-jj-corry-flintlock-21", name: "JJ Corry – The Flintlock 21 Year Old Single Malt Irish Whiskey", abv: "46%", region: "Irish", description: "Limited edition 1200 bottles. Matured in ex-bourbon casks, finished in Fino Sherry. Fresh florals, rich almond and grapefruit zest on the nose, lemon cheesecake and toffee on the palate.", startingBid: 3995, image: "JJ-Corry-Flintlock-21Y-1.jpeg" },
  { id: "whiskey-redbreast-27-ruby", name: "Redbreast 27 Year Irish Whiskey – Ruby Cask Finish Batch 6", abv: "55.9%", region: "Single Pot Still Irish", description: "The oldest permanent expression in the Redbreast family. Triple distilled, matured in bourbon, sherry and ruby Port casks. Dark jammy fruits, exotic spices and a remarkably long finish.", startingBid: 12495, image: "Redbreast 27 Year Irish Whiskey Ruby Cask Finish.jpg" },
  { id: "whiskey-redbreast-21", name: "Redbreast 21 Year Old", abv: "46%", region: "Single Pot Still Irish", description: "Matured in first-fill Sherry and bourbon casks. Tropical pineapple and crushed peanuts on the nose, mouth-filling spice and menthol on the palate, finishing with sweet and savoury barley notes.", startingBid: 5595, image: "redbreast 21.jpeg" },
  { id: "whiskey-glenmorangie-25-altus", name: "Glenmorangie 25 Year Old – The Altus", abv: "43%", region: "Highland", description: "Rested for a quarter century in bespoke bourbon casks then finished in Madeira casks. Orange blossom and ripe peach on the nose, oily and velvety on the palate with mandarin and pear, honeyed oak finish.", startingBid: 15395, image: "Glenmorangie 25.png" },
  { id: "whiskey-benriach-22", name: "Benriach 22 Year Old Triple Distilled", abv: "46.8%", region: "Speyside", description: "Triple distilled in the 1990s and matured in sherry, bourbon and virgin oak casks. Master blender Dr. Rachel Barrie expertly enhanced the rich, fruit-laden character of this classic Speyside.", startingBid: 4435, image: "benricha 22.png" },
  { id: "whiskey-benriach-25", name: "Benriach 25 Year Old Triple Distilled – 2024", abv: "47%", region: "Speyside", description: "Triple distilled and matured in Oloroso sherry, bourbon and fresh oak casks. Presented in a bottle modelled on the original pre-1990s Benriach design. A quarter century of exceptional Speyside character.", startingBid: 8495, image: "BenRiach25Year 2024.jpeg" },
  { id: "whiskey-benriach-30-rachel-barrie", name: "Benriach The Thirty – Rachel Barrie", abv: "46%", region: "Speyside", description: "30 year old peated single malt matured in sherry, bourbon, virgin oak and Port casks. Stewed plum and smoked walnut on the nose, dark fruit and manuka honey on the palate with a long smoked honey finish.", startingBid: 15990, image: "Benriach-The-Thirty-Whisky.jpg" },
  { id: "whiskey-macallan-harmony-jing", name: "Macallan Harmony Collection #5 – Jing", abv: "43.9%", region: "Speyside", description: "Fifth edition of the Harmony Collection, inspired by Phoenix Honey Orchid Oolong tea in collaboration with JING. Notes of peach, florals and honey. Packaging made from waste tea leaves.", startingBid: 4235, image: "Macallan Harmony Collection - Jing .png" },
  { id: "whiskey-macallan-harmony-arabica", name: "Macallan Harmony Collection – Intense Arabica", abv: "44%", region: "Speyside", description: "Second Harmony Collection release, inspired by intense arabica coffee. Roasted coffee bean, red fruit and chocolate notes. Packaging made from recycled cascara.", startingBid: 4695, image: "arabica.png" },
  { id: "whiskey-macallan-harmony-amber-meadow", name: "Macallan Harmony Collection – Amber Meadow", abv: "44.2%", region: "Speyside", description: "Third Harmony Collection release inspired by natural Scottish grasslands. Rich orange and lemon with honeysuckle on the nose, rich oak and lemon on the palate, long sweet finish.", startingBid: 3950, image: "Macallan Harmony Collection - Amber Meadow.jpg" },
  { id: "whiskey-dunvilles-px-20", name: "Dunville's PX Very Rare 20 Year Old – Cask Strength", abv: "55%", region: "Irish", description: "Single cask #1650, bottled 27 June 2022. Only 340 bottles. Pedro Ximénez cask. Sherry bomb nose with spices and kumquat, dark chocolate and vanilla, chocolate-covered prunes and licorice on the palate.", startingBid: 3445, image: "Dunville's PX Very Rare 20 Year Old Irish Whiskey - Cask Strength.png" },
  { id: "whiskey-balvenie-tun-1509-batch8", name: "Balvenie Tun 1509 – Batch 8", abv: "52.2%", region: "Speyside", description: "Drawn from three first-fill sherry butts, six second-fill sherry butts, five refill puncheons and four ex-bourbon barrels, married for three months. Baked citrus tarts, orange marmalade and rich toffee.", startingBid: 12995, image: "BalvenieTun1509Batch9.png" }
];

/* ══════════════════════════════════════════════
   DO NOT EDIT BELOW
══════════════════════════════════════════════ */

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let activeItemId   = null;
let activeItemType = null;
let activeBidMin   = 0;
let wantsTax       = true;

function formatZAR(n) { return "R " + Number(n).toLocaleString("en-ZA"); }

/* ─── IMAGE LOAD HANDLER ─── */
function attachImageLoader(img, wrap) {
  const markLoaded = () => wrap.classList.add("loaded");
  if (img.complete && img.naturalWidth > 0) { markLoaded(); return; }
  img.addEventListener("load", markLoaded);
  img.addEventListener("error", markLoaded);
}

/* ─── TAX TOGGLE ─── */
document.getElementById("taxYes").addEventListener("click", () => {
  wantsTax = true;
  document.getElementById("taxYes").classList.add("active");
  document.getElementById("taxNo").classList.remove("active");
  document.getElementById("taxFields").style.display = "flex";
  document.getElementById("noTaxFields").style.display = "none";
});
document.getElementById("taxNo").addEventListener("click", () => {
  wantsTax = false;
  document.getElementById("taxNo").classList.add("active");
  document.getElementById("taxYes").classList.remove("active");
  document.getElementById("taxFields").style.display = "none";
  document.getElementById("noTaxFields").style.display = "flex";
});

/* ─── BUILD ART CARD ─── */
function buildArtCard(artwork) {
  const card = document.createElement("div");
  card.className = "art-card";
  card.dataset.id = artwork.id;

  const wrap = document.createElement("div");
  wrap.className = "art-card-img";

  if (artwork.image) {
    const img = new Image();
    img.src = artwork.image;
    img.alt = artwork.title;
    img.loading = "lazy";
    wrap.appendChild(img);
    attachImageLoader(img, wrap);
  } else {
    wrap.innerHTML = `<div class="art-card-img-placeholder"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></div>`;
    wrap.classList.add("loaded");
  }

  const body = document.createElement("div");
  body.className = "art-card-body";
  body.innerHTML = `
    <p class="art-card-artist">${artwork.artist}</p>
    <p class="art-card-title">${artwork.title}</p>
    <p class="art-card-meta">${artwork.medium}<br/>${artwork.dimensions}</p>
    <div class="art-card-bid-row"><div>
      <p class="art-card-bid-label">Current bid</p>
      <p class="art-card-bid-amount" id="bid-display-${artwork.id}">${formatZAR(artwork.startingBid)}</p>
    </div></div>
    <button class="art-card-bid-btn" data-id="${artwork.id}" data-type="art">Place Bid</button>`;

  card.appendChild(wrap);
  card.appendChild(body);
  return card;
}

/* ─── BUILD WHISKEY CARD ─── */
function buildWhiskeyCard(item) {
  const card = document.createElement("div");
  card.className = "whiskey-card";
  card.dataset.id = item.id;

  const wrap = document.createElement("div");
  wrap.className = "whiskey-card-img";

  if (item.image) {
    const img = new Image();
    img.src = item.image;
    img.alt = item.name;
    img.loading = "lazy";
    wrap.appendChild(img);
    attachImageLoader(img, wrap);
  } else {
    wrap.innerHTML = `<div class="whiskey-card-img-placeholder"><svg width="40" height="60" viewBox="0 0 40 60" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.3"><rect x="12" y="1" width="16" height="8" rx="2"/><path d="M8 9h24l4 12v30a4 4 0 01-4 4H8a4 4 0 01-4-4V21L8 9z"/><line x1="4" y1="30" x2="36" y2="30"/></svg><span>Image coming soon</span></div>`;
    wrap.classList.add("loaded");
  }

  const body = document.createElement("div");
  body.className = "whiskey-card-body";
  body.innerHTML = `
    <div class="whiskey-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg> Exclusive Lot</div>
    <h3 class="whiskey-card-title">${item.name}</h3>
    <p class="whiskey-card-meta">${item.region} · ${item.abv}</p>
    <p class="whiskey-card-desc">${item.description}</p>
    <div class="art-card-bid-row"><div>
      <p class="art-card-bid-label">Current bid</p>
      <p class="art-card-bid-amount" id="bid-display-${item.id}">${formatZAR(item.startingBid)}</p>
    </div></div>
    <button class="art-card-bid-btn" data-id="${item.id}" data-type="whiskey" style="margin-top:0.8rem;">Place Bid</button>`;

  card.appendChild(wrap);
  card.appendChild(body);
  return card;
}

/* ─── RENDER ─── */
function renderArtGrid() {
  const grid = document.getElementById("artGrid");
  grid.innerHTML = "";
  ARTWORKS.forEach(a => { grid.appendChild(buildArtCard(a)); listenToBid(a.id, a.startingBid); });
}

function renderWhiskeyGrid() {
  const grid = document.getElementById("whiskeyGrid");
  grid.innerHTML = "";
  WHISKEY_ITEMS.forEach(i => { grid.appendChild(buildWhiskeyCard(i)); listenToBid(i.id, i.startingBid); });
}

/* ─── FIREBASE ─── */
function listenToBid(itemId, startingBid) {
  db.ref("bids/" + itemId + "/currentBid").on("value", snap => {
    const cur = snap.val() || startingBid;
    const el = document.getElementById("bid-display-" + itemId);
    if (el) el.textContent = formatZAR(cur);
    if (activeItemId === itemId) {
      document.getElementById("modalCurrentBid").textContent = formatZAR(cur);
      document.getElementById("modalHint").textContent = "Minimum bid: " + formatZAR(cur + 1);
      activeBidMin = cur + 1;
    }
  });
}

function getCurrentBid(itemId, startingBid) {
  return db.ref("bids/" + itemId + "/currentBid").get().then(s => s.val() || startingBid);
}

async function placeBid(itemId, amount, startingBid, bidderInfo) {
  const snap = await db.ref("bids/" + itemId + "/currentBid").get();
  const cur = snap.val() || startingBid;
  if (amount <= cur) return { success: false, message: "Your bid must be higher than " + formatZAR(cur) };
  await db.ref("bids/" + itemId).update({ currentBid: amount, lastBidder: bidderInfo.fullName, updatedAt: Date.now() });
  await db.ref("bids/" + itemId + "/history").push({ amount, timestamp: Date.now(), ...bidderInfo });
  return { success: true };
}

/* ─── MODAL ─── */
function getVal(id) { return (document.getElementById(id)?.value || "").trim(); }

function openModal(itemId, type) {
  const item = [...ARTWORKS, ...WHISKEY_ITEMS].find(i => i.id === itemId);
  if (!item) return;
  activeItemId = itemId; activeItemType = type; activeBidMin = item.startingBid; wantsTax = true;
  document.getElementById("modalTitle").textContent    = item.title || item.name;
  document.getElementById("modalBidAmount").value      = "";
  document.getElementById("modalFeedback").textContent = "";
  document.getElementById("modalFeedback").className   = "modal-feedback";
  ["modalFullName","modalIdNumber","modalTaxRef","modalPhone","modalEmail","modalAddress",
   "modalFullNameBasic","modalPhoneBasic","modalEmailBasic","modalAddressBasic"].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = "";
  });
  document.getElementById("taxYes").classList.add("active");
  document.getElementById("taxNo").classList.remove("active");
  document.getElementById("taxFields").style.display = "flex";
  document.getElementById("noTaxFields").style.display = "none";
  getCurrentBid(itemId, item.startingBid).then(cur => {
    document.getElementById("modalCurrentBid").textContent = formatZAR(cur);
    document.getElementById("modalHint").textContent = "Minimum bid: " + formatZAR(cur + 1);
    activeBidMin = cur + 1;
  });
  document.getElementById("modalOverlay").classList.add("open");
  setTimeout(() => document.getElementById("modalBidAmount").focus(), 300);
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  activeItemId = null; activeItemType = null;
}

document.getElementById("modalSubmit").addEventListener("click", async () => {
  const amount = parseInt(document.getElementById("modalBidAmount").value, 10);
  const fb = document.getElementById("modalFeedback");
  if (!amount || isNaN(amount)) { fb.textContent = "Please enter a valid bid amount."; fb.className = "modal-feedback error"; return; }
  if (amount < activeBidMin) { fb.textContent = "Your bid must be at least " + formatZAR(activeBidMin); fb.className = "modal-feedback error"; return; }

  let bidderInfo = {};
  if (wantsTax) {
    const fullName = getVal("modalFullName"), idNumber = getVal("modalIdNumber"),
          taxRef = getVal("modalTaxRef"), phone = getVal("modalPhone"),
          email = getVal("modalEmail"), address = getVal("modalAddress");
    if (!fullName || !idNumber || !taxRef || !phone || !email || !address) {
      fb.textContent = "Please fill in all fields for your tax certificate."; fb.className = "modal-feedback error"; return;
    }
    bidderInfo = { fullName, idNumber, taxRef, phone, email, address, wantsTaxCertificate: true };
  } else {
    const fullName = getVal("modalFullNameBasic"), phone = getVal("modalPhoneBasic"),
          email = getVal("modalEmailBasic"), address = getVal("modalAddressBasic");
    if (!fullName || !phone || !email || !address) {
      fb.textContent = "Please fill in all required fields."; fb.className = "modal-feedback error"; return;
    }
    bidderInfo = { fullName, phone, email, address, wantsTaxCertificate: false };
  }

  const btn = document.getElementById("modalSubmit");
  btn.textContent = "Placing bid..."; btn.disabled = true; fb.textContent = ""; fb.className = "modal-feedback";
  const item = [...ARTWORKS, ...WHISKEY_ITEMS].find(i => i.id === activeItemId);
  const result = await placeBid(activeItemId, amount, item.startingBid, bidderInfo);
  btn.textContent = "Confirm Bid"; btn.disabled = false;
  if (result.success) { fb.textContent = "Bid placed successfully!"; fb.className = "modal-feedback success"; setTimeout(closeModal, 1800); }
  else { fb.textContent = result.message; fb.className = "modal-feedback error"; }
});

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", e => { if (e.target === document.getElementById("modalOverlay")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
document.addEventListener("click", e => { const btn = e.target.closest("[data-id][data-type]"); if (btn) openModal(btn.dataset.id, btn.dataset.type); });

/* ─── NAV SCROLL ─── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => { nav.classList.toggle("scrolled", window.scrollY > 60); }, { passive: true });

/* ─── MOBILE MENU ─── */
const burger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");
burger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
mobileMenu.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", () => mobileMenu.classList.remove("open")));

/* ─── BACK TO TOP ─── */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => { backToTop.classList.toggle("visible", window.scrollY > 500); }, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ─── COUNTDOWN ─── */
function updateCountdown() {
  const diff = new Date("2026-04-15T23:59:59+02:00").getTime() - Date.now();
  if (diff <= 0) { document.getElementById("countdown").innerHTML = `<p style="font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);">Auction Closed</p>`; return; }
  document.getElementById("cd-days").textContent  = String(Math.floor(diff / 86400000)).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
  document.getElementById("cd-mins").textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  document.getElementById("cd-secs").textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

renderArtGrid();
renderWhiskeyGrid();

/* ─── PAGE LOADER ─── */
(function () {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;

  function dismiss() {
    loader.classList.add("hidden");
  }

  const video = document.querySelector(".hero-video");
  if (video) {
    // Dismiss on first playable frame
    video.addEventListener("canplay", dismiss, { once: true });
    // Fallback: dismiss after 4 s no matter what
    setTimeout(dismiss, 4000);
  } else {
    // No video — dismiss after short delay
    setTimeout(dismiss, 800);
  }
})();
