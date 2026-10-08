/**
 * Google Apps Script for "Legal Maxims Simplified" Order Management & Order Tracking
 * 
 * FEATURES:
 * 1. Automatic Header Generation & Styling (with Order Tracking fields).
 * 2. doPost(e): Automatically appends incoming orders from the order page.
 * 3. doGet(e): Supports Order Tracking lookup by Order Ref (e.g. ?track=LMS-123456).
 * 4. setupSheetHeaders(): Run this standalone once from the Apps Script editor to auto-create and style headers.
 */

// Define standard tracking headers
var HEADERS = [
  "Order Ref",             // Column A (Unique Reference for tracking)
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
  "Payment Status",        // Column N (e.g., Pending Fee Payment, Paid)
  "Delivery Status",       // Column O (e.g., Processing, Dispatched, Delivered)
  "Tracking / Waybill No"  // Column P (For courier/rider tracking number)
];

/**
 * Run this function once from the Apps Script editor to create & format headers immediately!
 */
function setupSheetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set headers in Row 1
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  
  // Style the header row
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground("#ea580c"); // Theme orange
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Montserrat");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  
  // Freeze Header Row
  sheet.setFrozenRows(1);
  
  // Auto-fit column widths
  for (var col = 1; col <= HEADERS.length; col++) {
    sheet.autoResizeColumn(col);
  }
}

/**
 * Handle incoming POST requests from the Book Order Page
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Auto-create headers if the sheet is completely empty
    if (sheet.getLastRow() === 0) {
      setupSheetHeaders();
    }

    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // Initial statuses for order tracking
    var initialPaymentStatus = data.deliveryOption === 'Direct Order' 
      ? "Pending Full Confirmation" 
      : "Pending ₦5k Delivery Fee";
    var initialDeliveryStatus = "Processing Order";

    // Append new order row
    sheet.appendRow([
      data.orderRef || "LMS-" + Math.floor(100000 + Math.random() * 900000), // A: Order Ref
      data.date || new Date().toLocaleString(),                              // B: Timestamp
      data.name || "N/A",                                                    // C: Customer Name
      data.email || "N/A",                                                   // D: Email
      data.phone || "N/A",                                                   // E: Phone
      data.bookType || "Hard Copy (Physical)",                               // F: Book Type
      data.quantity || 1,                                                    // G: Quantity
      data.discount || "None (0%)",                                          // H: Discount
      data.deliveryOption || "Direct Order",                                 // I: Option
      data.address || "N/A",                                                 // J: Delivery Address
      data.totalCost || "₦15,000",                                           // K: Total Cost
      data.amountDueNow || "₦15,000",                                        // L: Amount Due Now
      data.balanceOnDelivery || "₦0",                                        // M: Balance on Delivery
      initialPaymentStatus,                                                  // N: Payment Status
      initialDeliveryStatus,                                                 // O: Delivery Status
      ""                                                                     // P: Tracking / Waybill No
    ]);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        status: "success", 
        orderRef: data.orderRef,
        message: "Order successfully recorded and ready for tracking." 
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
 * e.g., https://script.google.com/.../exec?track=LMS-123456
 */
function doGet(e) {
  var trackRef = e.parameter && e.parameter.track;

  if (trackRef) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    // Search for order reference in Column A (index 0)
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
