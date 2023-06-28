var images = document.querySelectorAll('.slider img');
var currentImage = 0;

function showImage(index) {
  images[currentImage].style.display = 'none';
  images[index].style.display = 'block';
  currentImage = index;
}

function nextImage() {
  var nextIndex = (currentImage + 1) % images.length;
  showImage(nextIndex);
}

function previousImage() {
  var prevIndex = (currentImage - 1 + images.length) % images.length;
  showImage(prevIndex);
}

function startSlider() {
  setInterval(nextImage, 4000);
}

startSlider();

// product info and description
var products = [
    {
      id: 1,
      name: "Black Widow Vol 8",
      price: 25.00,
      image: "imgs/27.jpg"
    },
    {
      id: 2,
      name: "Betty & Veronica #1",
      price: 35.00,
      image: "imgs/26.jpg"
    },
    {
      id: 3,
      name: "Electra #121",
      price: 50.00,
      image: "imgs/24.jpg"
    },
    {
        id: 4,
        name: "Deathstroke #1",
        price: 30.00,
        image: "imgs/25.jpg"
      },
      {
        id: 5,
        name: "SIKTC #21",
        price: 20.00,
        image: "imgs/21.jpg"
      },
      {
        id: 6,
        name: "SIKTC #22",
        price: 25.00,
        image: "imgs/20.jpg"
      },
      {
        id: 7,
        name: "SIKTC #23",
        price: 25.00,
        image: "imgs/22.jpg"
      },
      {
          id: 8,
          name: "SIKTC #26",
          price: 22.00,
          image: "imgs/17.jpg"
        }
  ];
  
  var cartItems = []; // Array to store added cart items
  
  function addToCart(productId) {
    // Retrieve the quantity entered by the user
    var quantity = parseInt(document.getElementById('quantity-' + productId).value);
  
    if (quantity > 0) {
      var product = products.find(p => p.id === productId);
      if (!product) return; // Product not found, handle error accordingly
  
      var cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      };
  
      // Add the product to the cart
      cartItems.push(cartItem);
  
      // Reset the quantity input to its initial value
      document.getElementById('quantity-' + productId).value = 0;
  
      alert("Product " + productId + " added to cart!");
    }
  }
  
  function openCart() {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    var totalPrice = 0;
    var cartItemsHtml = '';
  
    for (var i = 0; i < cartItems.length; i++) {
      var cartItem = cartItems[i];
  
      var subtotal = cartItem.quantity * cartItem.price;
      totalPrice += subtotal;
  
      cartItemsHtml += `
        <div class='cart-item'>
          <img src='${cartItem.image}' alt='${cartItem.name}' width='50' height='75'>
          ${cartItem.name} - Quantity: ${cartItem.quantity}, Subtotal: $${subtotal.toFixed(2)}
          <button class='remove-button' onclick='removeFromCart(${i})'>Remove</button>
        </div>`;
    }
  
    document.getElementById('cartItems').innerHTML = cartItemsHtml;
    document.getElementById('totalPrice').innerHTML = "Total Price: $" + totalPrice.toFixed(2);
  
    // Display the modal
    var modal = document.getElementById('cartModal');
    modal.style.display = 'block';
  }
  
  function closeCart() {
    // Hide the modal
    var modal = document.getElementById('cartModal');
    modal.style.display = 'none';
  }
  
  function removeFromCart(index) {
    cartItems.splice(index, 1); // Remove the item from the cartItems array
    openCart(); // Reopen the cart to refresh the displayed items
  }
  
  function checkout() {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    // Perform the checkout process (e.g., redirect to payment page, send order to server, etc.)
    alert("Thank you for your purchase!");
    cartItems = []; // Clear the cart after successful checkout
    closeCart();
  }
  

  // Get necessary elements
const sliderContainer = document.querySelector('.slider-container2');
const sliderTrack = document.querySelector('.slider-track2');
const sliderItems = document.querySelectorAll('.slider-item2');
const prevButton = document.querySelector('.slider-prev2');
const nextButton = document.querySelector('.slider-next2');

// Calculate the width of each slider item
const itemWidth = sliderContainer.clientWidth / 4;

// Initialize variables for dragging functionality
let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Update the position of the slider track based on the current translate value
const setSliderPosition = () => {
  sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
};

// Animate the slider track to the desired position
const animateSlider = () => {
  setSliderPosition();
  if (isDragging) {
    animationID = requestAnimationFrame(animateSlider);
  }
};

// Move to the previous slide
const slideToPrev = () => {
  if (currentIndex >= 4) {
    currentIndex -= 4;
  } else {
    currentIndex = sliderItems.length - 4 + currentIndex;
  }
  currentTranslate = -currentIndex * itemWidth;
  setSliderPosition();
};

  

// Move to the next slide
const slideToNext = () => {
  if (currentIndex < sliderItems.length - 4) {
    currentIndex += 4;
  } else {
    currentIndex = currentIndex + 4 - sliderItems.length;
  }
  currentTranslate = -currentIndex * itemWidth;
  setSliderPosition();
};


  

// Attach event listeners to the buttons
prevButton.addEventListener('click', slideToPrev);
nextButton.addEventListener('click', slideToNext);

// Handle mouse/touch events for dragging
sliderContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startPosX = e.pageX - sliderTrack.offsetLeft;
  prevTranslate = currentTranslate;

  // Stop any ongoing animation
  cancelAnimationFrame(animationID);

  // Add the grabbing class to change the cursor
  sliderContainer.classList.add('grabbing');
});

sliderContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();

  const currentPosX = e.pageX - sliderTrack.offsetLeft;
  const translateX = currentPosX - startPosX;
  currentTranslate = prevTranslate + translateX;

  // Limit the translate value within the slider bounds
  if (currentTranslate > 0) {
    currentTranslate = 0;
  } else if (currentTranslate < -(sliderItems.length - 4) * itemWidth) {
    currentTranslate = -(sliderItems.length - 4) * itemWidth;
  }

  setSliderPosition();
});

sliderContainer.addEventListener('mouseup', () => {
  isDragging = false;

  // Remove the grabbing class
  sliderContainer.classList.remove('grabbing');

  // Determine the current index based on the translate value
  currentIndex = Math.abs(Math.round(currentTranslate / itemWidth));

  // Animate the slider track to the nearest slide
  animationID = requestAnimationFrame(animateSlider);
});

sliderContainer.addEventListener('mouseleave', () => {
  isDragging = false;

  // Remove the grabbing class
  sliderContainer.classList.remove('grabbing');

  // Animate the slider track to the current slide
  animationID = requestAnimationFrame(animateSlider);
});
