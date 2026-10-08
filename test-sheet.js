// Test script for Google Apps Script Web App
async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwIV50ieJ1C_YCZQSbYR0bMlN9H20fRBcdpkha3kg6JSrJLa_I7-BsMgcKD8SW7EFyiuw/exec";
  const payload = {
    orderRef: "LMS-999999",
    date: new Date().toLocaleString(),
    name: "John Doe Test",
    email: "johndoe@gmail.com",
    phone: "08012345678",
    address: "123 Marina Street, Lagos",
    bookType: "Hard Copy (Physical)",
    quantity: 1,
    discount: "None (0%)",
    deliveryOption: "Direct Order",
    totalCost: "₦15,000",
    amountDueNow: "₦15,000",
    balanceOnDelivery: "₦0"
  };

  console.log("Sending test payload to Google Apps Script...");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    });
    const text = await res.text();
    console.log("Response Status:", res.status);
    console.log("Response Text:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
