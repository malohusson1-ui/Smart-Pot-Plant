let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + ' ajouté au panier !');
}

function displayCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  if (!cartItems) return;
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} €`;
    cartItems.appendChild(li);
    total += item.price;
  });
  totalEl.textContent = total;
}

document.addEventListener('DOMContentLoaded', displayCart);

const checkoutForm = document.getElementById('checkout-form');
if(checkoutForm){
  checkoutForm.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Commande confirmée ! Merci.');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  });
}
