(function(){
  // State
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Sensor descriptions centralized to avoid duplication
  const SENSORS = {
    humidity: {
      title: 'Module ESP32 (mesure d\'humidité)',
      html: `
        <h3>📋 Présentation</h3>
        <p><strong>Module :</strong> ESP32 (microcontrôleur Wi‑Fi / Bluetooth)</p>
        <p><strong>Rôle ici :</strong> Lecture et transmission des données d'humidité via un capteur connecté (ex : DHT11, AM2302, capteur capacitif).</p>
        <h3>⚙️ Caractéristiques clés</h3>
        <ul>
          <li>Processeur dual-core Tensilica LX6 (jusqu'à 240 MHz)</li>
          <li>Connectivité Wi‑Fi 802.11 b/g/n et Bluetooth BLE</li>
          <li>Nombreux GPIO, ADC, I2C, SPI, UART</li>
          <li>Tension d'alimentation: 3.3 V</li>
        </ul>
        <h3>🔌 Utilisation pour l'humidité</h3>
        <p>L'ESP32 lit le signal du capteur d'humidité puis transmet les mesures via Wi‑Fi.</p>
      `
    },
    temperature: {
      title: 'Capteur de Température - DHT11',
      html: `
        <h3>📋 Spécifications Techniques</h3>
        <p><strong>Plage d'humidité :</strong> 20% à 80% RH (±5% de précision)</p>
        <p><strong>Plage de température :</strong> 0°C à 50°C (±2°C)</p>
        <h3>✨ Avantages</h3>
        <ul><li>Compatible Arduino/ESP32</li><li>Coût faible</li></ul>
      `
    },
    luminosity: {
      title: 'Capteur de Luminosité - BH1750',
      html: `
        <h3>📋 Présentation</h3>
        <p><strong>Module :</strong> BH1750 (capteur de luminosité numérique I2C)</p>
        <h3>⚙️ Spécifications</h3>
        <ul>
          <li>Plage : 1 à 65535 lux</li>
          <li>Interface : I2C</li>
          <li>Résolution : ~1 lux</li>
        </ul>
      `
    }
  };

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function openModal(sensorType) {
    const modal = document.getElementById('sensorModal');
    if (!modal) return;
    const titleEl = modal.querySelector('h2');
    const detailsEl = modal.querySelector('.sensor-details');
    const data = SENSORS[sensorType];
    titleEl.textContent = data ? data.title : 'Capteur';
    detailsEl.innerHTML = data ? data.html : '<p>Information capteur non disponible.</p>';
    modal.classList.add('active');
  }

  function closeModal() {
    const modal = document.getElementById('sensorModal');
    if (modal) modal.classList.remove('active');
  }

  // Close when clicking the overlay
  window.addEventListener('click', function(e){
    const modal = document.getElementById('sensorModal');
    if (modal && e.target === modal) closeModal();
  });

  // Cart API
  function addToCart(name, price) {
    const p = Number(price) || 0;
    cart.push({name, price: p});
    saveCart();
    displayCart();
  }

  function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;
    cart.splice(index, 1);
    saveCart();
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
    const frag = document.createDocumentFragment();
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-price">${item.price} €</span>
        </div>
        <button class="btn-remove" data-index="${index}">Supprimer</button>
      `;
      frag.appendChild(li);
      total += item.price;
    });
    cartItems.appendChild(frag);
    if (emptyMsg) emptyMsg.style.display = cart.length ? 'none' : 'block';
    if (cartContent) cartContent.style.display = cart.length ? 'block' : 'none';
    if (totalEl) totalEl.textContent = total;
  }

  // Delegate remove button clicks
  document.addEventListener('click', function(e){
    if (e.target && e.target.matches('.btn-remove')) {
      const idx = Number(e.target.dataset.index);
      removeFromCart(idx);
    }
  });

  // Checkout
  document.addEventListener('DOMContentLoaded', function(){
    displayCart();
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm){
      checkoutForm.addEventListener('submit', function(e){
        e.preventDefault();
        // simple confirmation flow
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
      });
    }
  });

  // Expose functions used by inline handlers
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
})();
