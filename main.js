

/*==============================navbar styles================================*/
const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const socials = document.querySelector('.nav__socials');
  const navbar = document.querySelector('.navbar');

  // Hamburger toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('show');
    socials.classList.toggle('show');
  });

  //*==========================Scroll behavior==============================*/
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > 900) { // Only apply on desktop
      if (scrollTop > lastScrollTop) {
        // scrolling down
        navLinks.style.opacity = "0";
        navLinks.style.pointerEvents = "none";
      } else {
        // scrolling up
        navLinks.style.opacity = "1";
        navLinks.style.pointerEvents = "auto";
      }
    }
lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // for mobile or negative scrolling
  });

/*========================reecipes-section__slider===============================*/
let currentSlide = 1;
  showSlide(currentSlide);

  function changeSlide(n) {
    showSlide(currentSlide += n);
  }

  function setSlide(n) {
    showSlide(currentSlide = n);
  }
function showSlide(n) {
const slides = document.getElementsByClassName("mySlide");
const dots = document.getElementsByClassName("dot");
if (n > slides.length) currentSlide = 1;
if (n < 1) currentSlide = slides.length;
for (let i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
for (let i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" active", "");
}
slides[currentSlide - 1].style.display = "block";
dots[currentSlide - 1].className += " active";
  }

/*===========================portfolio scroll effect==========================*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.2,
});

const imageContainers = document.querySelectorAll('.image-container');
imageContainers.forEach(container => {
  observer.observe(container);
});
/*==========================portfolio-tabs============================*/
document.addEventListener('DOMContentLoaded', function() {
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

               tab.classList.add('active');

            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    tabs[0].click();
});


window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
});    
function myFunction() {
    var element = document.portfolio;
    element.classList.toggle("dark-mode");
  }
  
/*==================appear==============================*/
function toggleReadMore() {
  var dots = document.getElementById("dots");
  var more = document.getElementById("more");
  var btn = document.getElementById("myBtn");

  if (more.style.display === "inline") {
    more.style.display = "none";
    dots.style.display = "inline";
    btn.textContent = "Read more";
  } else {
    more.style.display = "inline";
    dots.style.display = "none";
    btn.textContent = "Read less";
  }
}




function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Close modals when clicking outside content
window.onclick = function(e) {
  ['modal1', 'modal2'].forEach(id => {
    const modal = document.getElementById(id);
    if (e.target === modal) modal.style.display = 'none';
  });
};

/*=======================add-to-cart===============================*/
let cartCount = 0;

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
  });
});


/*============================payment-section=========================*/
let cart = [];
let cartCont = 0;
let total = 0;

function toggleCartPanel() {
  document.getElementById('cart-panel').classList.toggle('open');
}

function addToCart(name, price) {
  cart.push({ name, price });
  cartCount++;
  total += price;

  document.getElementById('cart-count').textContent = cartCount;
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

function redirectToCheckout() {
  // Example: redirect to PayPal/Stripe/PayNow
  // For now, just simulate
  alert('Redirecting to payment...');
  window.location.href = "https://www.paynow.co.zw/PaymentMethod#"; // Replace with real
}


/*======================cart activation==========================*/



/*==========================*/
const cart1 = []; // This should store your added items

function openPaymentModal() {
  document.getElementById("payment-modal").style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

document.getElementById("payment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
  const userEmail = document.getElementById("user-email").value;

  // Example: redirect based on method
  if (selectedMethod === "paypal") {
    window.location.href = "https://www.paypal.com/checkoutnow"; // Replace with real link
  } else if (selectedMethod === "ecocash" || selectedMethod === "innbucks") {
    // Use Paynow redirect
    fetch("paynow_checkout.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart1: cart1,
        email: userEmail,
        method: selectedMethod
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert("Payment failed. Try again.");
      }
    });
  }
});



//open cart
//open cart//

