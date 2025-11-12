let cart = [];

function openModal(sensorType) {
  const modal = document.getElementById('sensorModal');
  if (!modal) return;

  const titleEl = modal.querySelector('h2');
  const detailsEl = modal.querySelector('.sensor-details');

  if (sensorType === 'humidity') {
    titleEl.textContent = "Module ESP32 (mesure d'humidité)";
    detailsEl.innerHTML = `
      <h3>📋 Présentation</h3>
      <p><strong>Module :</strong> ESP32 (microcontrôleur Wi‑Fi / Bluetooth)</p>
      <p><strong>Rôle ici :</strong> Lecture et transmission des données d'humidité via un capteur connecté (ex : DHT11, AM2302, capteur capacitif).</p>

      <h3>⚙️ Caractéristiques clés</h3>
      <ul>
        <li>• Processeur dual-core Tensilica LX6 (jusqu'à 240 MHz)</li>
        <li>• Connectivité Wi‑Fi 802.11 b/g/n et Bluetooth BLE</li>
        <li>• Nombreux GPIO, ADC, I2C, SPI, UART pour interfacer capteurs</li>
        <li>• Tension d'alimentation: 3.3 V (module)</li>
        <li>• Faible consommation en mode veille avec gestion d'énergie</li>
      </ul>

      <h3>🔌 Utilisation pour l'humidité</h3>
      <p>L'ESP32 lit le signal du capteur d'humidité (connecté sur une broche numérique ou analogique selon le type) puis transmet les mesures via Wi‑Fi à votre application ou base locale.</p>

      <h3>⚠️ Remarques</h3>
      <ul>
        <li>• L'ESP32 n'est pas un capteur d'humidité en lui‑même : il sert de contrôleur/lecteur.</li>
        <li>• Choisir le capteur associé (DHT11, DHT22, capteurs capacitifs) selon la précision et la plage désirée.</li>
      </ul>
    `;
  } else if (sensorType === 'temperature') {
    titleEl.textContent = "Capteur de Température - DHT11";
    detailsEl.innerHTML = `
      <h3>📋 Spécifications Techniques</h3>
      <p><strong>Type :</strong> Capteur de température et humidité numérique</p>
      <p><strong>Plage d'humidité :</strong> 20% à 80% RH (±5% de précision)</p>
      <p><strong>Plage de température :</strong> 0°C à 50°C (±2°C de précision)</p>
      <p><strong>Résolution :</strong> 1°C pour la température, 1% pour l'humidité</p>
      <p><strong>Temps de réponse :</strong> 6-10 secondes</p>

      <h3>✨ Avantages</h3>
      <ul>
        <li>✓ Compatible avec Arduino et ESP32</li>
        <li>✓ Coût faible et intégration simple</li>
      </ul>

      <h3>⚠️ Limitations</h3>
      <ul>
        <li>• Plage d'humidité limitée et précision modérée</li>
        <li>• Sensible à la condensation et aux environnements extrêmes</li>
      </ul>
    `;
  } else {
    titleEl.textContent = 'Capteur';
    detailsEl.innerHTML = '<p>Information capteur non disponible.</p>';
  }

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('sensorModal');
  if (modal) modal.classList.remove('active');
}

// Fermer le modal en cliquant sur l'arrière-plan
window.addEventListener('click', function(event) {
  const modal = document.getElementById('sensorModal');
  if (event.target === modal) {
    closeModal();
  }
});

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
