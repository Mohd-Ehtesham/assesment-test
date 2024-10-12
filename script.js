document.addEventListener("DOMContentLoaded", function () {
  const mainBoxes = document.querySelectorAll(".main-box");
  const totalPriceElement = document.querySelector(".total-price");
  const orderDetailsElement = document.querySelector(".order-details");
  const checkButtons = document.querySelectorAll('input[type="checkbox"]');

  // Object to store the selected price for each box
  const selectedPrices = {};

  // Object to store the order details for each box
  const orderDetails = {};

  // Handle clicking on the main box to toggle the lower div
  mainBoxes.forEach((box, index) => {
    const lowerDiv = box.querySelector(".lower-div");

    // Add an event listener for clicks on the box
    box.addEventListener("click", function (event) {
      // Check if the clicked target is not a checkbox or select element
      if (!event.target.closest('input[type="checkbox"], select')) {
        lowerDiv.classList.toggle("hidden");
      }
    });

    // Add event listeners for changes to the size and color select elements
    const sizeSelect = box.querySelector('select[name="size"]');
    const colorSelect = box.querySelector('select[name="color"]');

    sizeSelect.addEventListener("change", function () {
      orderDetails[index] = {
        size: sizeSelect.value,
        color: colorSelect.value,
      };
      updateOrderDetails();
    });

    colorSelect.addEventListener("change", function () {
      orderDetails[index] = {
        size: sizeSelect.value,
        color: colorSelect.value,
      };
      updateOrderDetails();
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

  // Function to update the order details
  function updateOrderDetails() {
    let orderDetailsText = "";
    for (let index in orderDetails) {
      orderDetailsText += `Box ${index + 1}: Size - ${
        orderDetails[index].size
      }, Color - ${orderDetails[index].color}\n`;
    }
    orderDetailsElement.textContent = orderDetailsText;
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

  // Add an event listener for clicks on the main box to update the total price
  mainBoxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      const basePrice = parseInt(box.getAttribute("data-price"), 10);
      selectedPrices[index] = basePrice;
      calculateTotalPrice();
    });
  });
});
