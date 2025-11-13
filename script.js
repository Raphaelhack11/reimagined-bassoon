document.addEventListener("DOMContentLoaded", () => {
  const donateBtn = document.getElementById("donateBtn");
  const modal = document.getElementById("paymentModal");
  const closeModal = document.getElementById("closeModal");
  const modalAmount = document.getElementById("modalAmount");
  const paymentDetails = document.getElementById("paymentDetails");
  const confirmPaid = document.getElementById("confirmPaid");
  const customAmount = document.getElementById("customAmount");
  const yearSpan = document.getElementById("year");

  yearSpan.textContent = new Date().getFullYear();

  let selectedAmount = 0;
  const MIN_DONATION = 1.0;
  const MAX_DONATION = 10000.0;

  document.querySelectorAll(".amount").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".amount").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedAmount = parseFloat(btn.getAttribute("data-value"));
      customAmount.value = ""; // Clear custom input when button is clicked
    });
  });

  // IMPROVEMENT: Input sanitization and validation on custom amount change
  customAmount.addEventListener("input", (e) => {
    // Only allow numbers and a single decimal point
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, ''); 
    e.target.value = sanitizedValue;

    selectedAmount = parseFloat(sanitizedValue) || 0;
    
    // Clear active class from preset buttons
    document.querySelectorAll(".amount").forEach((b) => b.classList.remove("active"));
  });

  donateBtn.addEventListener("click", () => {
    // IMPROVEMENT: Robust validation checks
    if (selectedAmount < MIN_DONATION) {
      alert(`Please select or enter a valid amount of at least $${MIN_DONATION.toFixed(2)}.`);
      return;
    }
    
    if (selectedAmount > MAX_DONATION) {
        alert(`The maximum donation amount is $${MAX_DONATION.toFixed(2)}. Please enter a lower amount.`);
        return;
    }

    const method = document.querySelector('input[name="method"]:checked').value;
    
    // Ensure amount is formatted to two decimal places for currency display
    modalAmount.textContent = `$${selectedAmount.toFixed(2)}`;

    if (method === "paypal") {
      paymentDetails.innerHTML = `
        <p><strong>PayPal:</strong> @pamelaGeworsky</p>
        <p>Send the exact amount through PayPal and confirm below.</p>
      `;
    } else {
      paymentDetails.innerHTML = `
        <p><strong>Bitcoin Address:</strong></p>
        <p style="word-break: break-all;">bc1q4c6f7xzsekkpvd2guwkaww4m7se9yjlrxnrjc7</p>
        <p>Send the exact amount in BTC and confirm below.</p>
      `;
    }

    modal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Optional: Reset form fields after confirmation for a cleaner state
  confirmPaid.addEventListener("click", () => {
    alert("Thank you for your donation! ❤️");
    modal.classList.add("hidden");
    
    // Reset state after successful 'payment'
    selectedAmount = 0;
    customAmount.value = "";
    document.querySelectorAll(".amount").forEach((b) => b.classList.remove("active"));
  });
});
