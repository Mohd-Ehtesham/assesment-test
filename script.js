document.addEventListener("DOMContentLoaded", function () {
  const mainBoxes = document.querySelectorAll(".main-box");
  const checkButtons = document.querySelectorAll('input[type="checkbox"]');
  const totalPriceElement = document.querySelector(".total-price");

  // Object to store the selected price for each box
  const selectedPrices = {};

  // Handle clicking on the main box to toggle the lower div
  mainBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      const lowerDiv = this.querySelector(".lower-div");
      lowerDiv.classList.toggle("hidden");
    });
  });

  // Function to calculate the total price
  function calculateTotalPrice() {
    let total = 0;
    for (let price in selectedPrices) {
      total += selectedPrices[price];
    }
    totalPriceElement.textContent = `Total Price: INR ${total}`;
  }

  // Handle checkbox selection to apply or remove discount and update total price
  checkButtons.forEach((check, index) => {
    check.addEventListener("change", function () {
      const selectedBox = mainBoxes[index];
      const basePriceElement = selectedBox.querySelector(
        ".right-box .price:first-child"
      );
      const basePrice = parseInt(selectedBox.getAttribute("data-price"), 10);
      const discount = parseInt(selectedBox.getAttribute("data-discount"), 10);

      if (check.checked) {
        // If the checkbox is checked, apply the discount
        const discountedPrice = basePrice - (basePrice * discount) / 100;
        selectedPrices[index] = discountedPrice;

        // Apply strikethrough effect to the original price
        basePriceElement.classList.add("strike-through");
      } else {
        // If the checkbox is unchecked, use the base price (without discount)
        selectedPrices[index] = basePrice;

        // Remove the strikethrough effect from the original price
        basePriceElement.classList.remove("strike-through");
      }

      // Recalculate the total price for all boxes
      calculateTotalPrice();
    });
  });
});
