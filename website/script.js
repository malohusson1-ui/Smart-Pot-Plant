let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  alert(name + ' ajouté au panier !');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  const emptyMsg = document.getElementById('empty-message');
  const cartContent = document.getElementById('cart-content');
  if (!cartItems) return;
  cartItems.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
  } else {
    if (emptyMsg) emptyMsg.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';
  }
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="item-details">
        <span class="item-name">${item.name}</span>
        <span class="item-price">${item.price} €</span>
      </div>
      <button class="btn-remove" onclick="removeFromCart(${index})">Supprimer</button>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });
  if (totalEl) totalEl.textContent = total;
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
