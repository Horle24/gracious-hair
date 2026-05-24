// ─────────────────────────────────────────────────────────────
// ✅ FIX 1: Use ONLY the ID part from your spreadsheet URL.
//    Your sheet URL looks like:
//    https://docs.google.com/spreadsheets/d/XXXXXXXXXX/edit
//    Copy only the XXXXXXXXXX part and paste it below.
// ─────────────────────────────────────────────────────────────
const SPREADSHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';


// ✅ FIX 2: All functions are now at the TOP LEVEL (not nested
//    inside myFunction). Google Scripts requires this so it can
//    find doGet and doPost automatically.


// ── Handle GET requests (fetch products) ─────────────────────
function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action === 'getProducts') return getProducts();
  return jsonResponse({ error: 'Unknown action' });
}


// ── Handle POST requests (log orders) ────────────────────────
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action === 'logOrder') return logOrder(body);
    return jsonResponse({ error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}


// ── Fetch all products from "Products" sheet ──────────────────
function getProducts() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Products');
  const rows  = sheet.getDataRange().getValues();

  const products = rows.slice(1)
    .filter(r => r[0])
    .map(r => ({
      id:        r[0],
      name:      r[1],
      category:  r[2],
      price:     Number(r[3]),
      available: r[4] === true || r[4] === 'TRUE' || r[4] === 'Yes',
      emoji:     r[5] || '✦',
      desc:      r[6] || '',
    }));

  return jsonResponse({ products });
}


// ── Log an order into the "Orders" sheet ──────────────────────
// ✅ FIX 3: Now saves ALL fields the cart sends — customer name,
//    phone, address, each item, items total, delivery fee,
//    distance, and the final subtotal.
function logOrder(body) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Orders');

  // Make sure your Orders sheet has these columns in row 1:
  // Date | Customer | Phone | Address | Items | Items Total | Delivery Fee | Distance (km) | Subtotal | Via
  sheet.appendRow([
    new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
    body.customer    || '',
    body.phone       || '',
    body.address     || '',
    body.items       || '',
    body.itemsTotal  || '',
    body.deliveryFee || '',
    body.distanceKm  ? body.distanceKm + ' km' : '',
    body.subtotal    || '',
    'WhatsApp',
  ]);

  return jsonResponse({ success: true });
}


// ── Helper ────────────────────────────────────────────
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}