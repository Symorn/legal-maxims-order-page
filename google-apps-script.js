/**
 * Google Apps Script for "Legal Maxims Simplified" Order Management & Tracking
 * 
 * FEATURES:
 * 1. Automatic Header Creation & Styling.
 * 2. Deduplication Protection (Prevents double recording).
 * 3. doPost(e): Appends incoming orders cleanly once.
 * 4. doGet(e): Supports Order Tracking lookup (e.g. ?track=LMS-123456).
 * 5. setupSheetHeaders(): Run this function once in Apps Script to style your Sheet!
 */

var HEADERS = [
  "Order Ref",             // Column A (Tracking key)
  "Timestamp",             // Column B
  "Customer Name",         // Column C
  "Email Address",         // Column D
  "Phone Number",          // Column E
  "Book Type",             // Column F
  "Quantity",              // Column G
  "Discount Applied",      // Column H
  "Order Option",          // Column I (Direct Order / Pay on Delivery)
  "Delivery Address",      // Column J
  "Total Order Cost",      // Column K
  "Amount Due Now",        // Column L
  "Balance on Delivery",   // Column M
  "Payment Status",        // Column N (Pending Fee Payment / Paid)
  "Delivery Status",       // Column O (Processing / Dispatched / Delivered)
  "Tracking / Waybill No"  // Column P (Courier / Rider details)
];

/**
 * Run this function once from the Apps Script editor to create & style headers immediately!
 */
function setupSheetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground("#ea580c"); // Theme Orange
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);
  for (var col = 1; col <= HEADERS.length; col++) {
    sheet.autoResizeColumn(col);
  }
}

/**
 * Handle incoming POST requests from the Order Page
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      setupSheetHeaders();
    }

    var data = {};

    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {}
    }

    if (!data.name && e.parameter) {
      if (e.parameter.postData) {
        try {
          data = JSON.parse(e.parameter.postData);
        } catch (err) {}
      }
      if (!data.name) {
        data = e.parameter;
      }
    }

    var orderRef = data.orderRef || "LMS-" + Math.floor(100000 + Math.random() * 900000);

    // DEDUPLICATION CHECK: Check if this orderRef was already recorded in the last 10 rows
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var checkRange = Math.min(15, lastRow - 1);
      var recentRefs = sheet.getRange(lastRow - checkRange + 1, 1, checkRange, 1).getValues();
      for (var r = 0; r < recentRefs.length; r++) {
        if (recentRefs[r][0] && String(recentRefs[r][0]).trim() === String(orderRef).trim()) {
          // Already recorded, return success without duplicate insert
          return ContentService.createTextOutput(
            JSON.stringify({ status: "already_exists", orderRef: orderRef })
          ).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // Initial statuses for order tracking
    var initialPaymentStatus = data.deliveryOption === 'Direct Order' 
      ? "Pending Full Confirmation" 
      : "Pending ₦5k Delivery Fee";
    var initialDeliveryStatus = "Processing Order";

    // Append single order row
    sheet.appendRow([
      orderRef,                                              // A: Order Ref
      data.date || new Date().toLocaleString(),              // B: Timestamp
      data.name || "N/A",                                    // C: Customer Name
      data.email || "N/A",                                   // D: Email
      data.phone || "N/A",                                   // E: Phone
      data.bookType || "Hard Copy (Physical)",               // F: Book Type
      data.quantity || 1,                                    // G: Quantity
      data.discount || "None (0%)",                          // H: Discount
      data.deliveryOption || "Direct Order",                 // I: Option
      data.address || "N/A",                                 // J: Delivery Address
      data.totalCost || "₦15,000",                           // K: Total Cost
      data.amountDueNow || "₦15,000",                        // L: Amount Due Now
      data.balanceOnDelivery || "₦0",                        // M: Balance on Delivery
      initialPaymentStatus,                                  // N: Payment Status
      initialDeliveryStatus,                                 // O: Delivery Status
      ""                                                     // P: Tracking / Waybill No
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ 
        status: "success", 
        orderRef: orderRef,
        message: "Order successfully recorded." 
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests — Supports Order Tracking Lookup
 */
function doGet(e) {
  var trackRef = e.parameter && e.parameter.track;

  if (trackRef) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim().toUpperCase() === String(trackRef).trim().toUpperCase()) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "found",
          orderRef: data[i][0],
          orderDate: data[i][1],
          customerName: data[i][2],
          bookType: data[i][5],
          quantity: data[i][6],
          option: data[i][8],
          totalCost: data[i][10],
          paymentStatus: data[i][13],
          deliveryStatus: data[i][14],
          trackingWaybill: data[i][15] || "Not yet assigned"
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "not_found",
      message: "No order found with reference: " + trackRef
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    "Legal Maxims Simplified Order & Tracking Webhook is active!"
  );
}
