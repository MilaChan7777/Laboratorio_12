class ItemShop {
    constructor(product) {
        this.product = product;
        this.bookmarked = false; // Estado inicial del marcador
        this.cartCount = 0; // Inicializa el contador del carrito
    }

    render() {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.dataset.productId = this.product.id; // Agrega un atributo para identificar la tarjeta

        productDiv.innerHTML = `
            <img src="${this.product.image}" alt="${this.product.title}">
            <br>
            <h5>${this.product.title}</h5>
            <p>Precio: $${this.product.price}</p>
            <p>Categoría: ${this.product.category}</p>
            <br>
            <a href="detalle.html?id=${this.product.id}">
                <button class="comprar">Comprar</button>
            </a>
            <div class="icon-container">
                <i class="far fa-bookmark custom-icon ${this.bookmarked ? 'custom-icon-bookmark-filled' : ''}" onclick="toggleBookmark(${this.product.id}, this)"></i>
                <i class="fas fa-trash custom-icon" onclick="removeCard(${this.product.id})"></i>
                <i class="fas fa-shopping-cart custom-icon" onclick="addToCart(${this.product.id})"></i>
            </div>
        `;
        return productDiv;
    }
}

async function loadProducts() {
    const response = await fetch('https://raw.githubusercontent.com/MilaChan7777/Laboratorio_12/main/data.json');
    const products = await response.json();

    const productList = document.getElementById('product-list');

    products.forEach((product) => {
        const item = new ItemShop(product);
        productList.appendChild(item.render());
    });
}

function toggleBookmark(productId, item) {
    // Cambia el estado del marcador
    item.bookmarked = !item.bookmarked;

    // Actualiza el ícono de bookmark según el estado
    const bookmarkIcon = item.querySelector('.fa-bookmark');
    bookmarkIcon.classList.toggle('custom-icon-bookmark-filled', item.bookmarked);

    // Puedes realizar otras acciones según el estado del marcador
    if (item.bookmarked) {
        console.log(`Producto ID ${productId} marcado como favorito.`);
    } else {
        console.log(`Producto ID ${productId} desmarcado como favorito.`);
    }
}

function removeCard(productId) {
    // Encuentra y elimina la tarjeta del contenedor
    const productItem = document.querySelector(`.product-item[data-product-id="${productId}"]`);
    if (productItem) {
        productItem.remove();
        console.log(`Producto ID ${productId} eliminado.`);
        updateSubtotal(); // Actualiza el subtotal después de eliminar una tarjeta
    }
}

function addToCart(productId) {
    // Simula agregar el producto al carrito
    const productItem = document.querySelector(`.product-item[data-product-id="${productId}"]`);
    if (productItem) {
        const cartCountElement = document.getElementById('cart-count');
        const cartTotalElement = document.getElementById('cart-total');
        const cartCount = ++item.cartCount;
        cartCountElement.innerText = `Cantidad en el carrito: ${cartCount}`;
        const productPrice = parseFloat(item.product.price.replace('$', ''));
        const cartTotal = (cartCount * productPrice).toFixed(2);
        cartTotalElement.innerText = `Total: $${cartTotal}`;
        console.log(`Producto ID ${productId} agregado al carrito (${cartCount} veces).`);
    }
}

function updateSubtotal() {
    // Actualiza el subtotal al final de la página
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCount = item.cartCount;
    const cartTotal = (cartCount * productPrice).toFixed(2);
    cartCountElement.innerText = `Cantidad en el carrito: ${cartCount}`;
    cartTotalElement.innerText = `Total: $${cartTotal}`;
}
async function loadProductDetails() {
    const productId = getProductIdFromUrl();

    if (!productId) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();

    const productDetails = document.getElementById('product-details');

    const productInfoDiv = document.createElement('div');
    productInfoDiv.className = 'product-info';

    productInfoDiv.innerHTML = `
        <h1>${product.title}</h1>
        <div class="rating">
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
    </div>
    <br>
        <p><b>Precio:</b> $${product.price}</p>
        <p><b>Categoría:</b> ${product.category}</p>
        <p><b>Descripción:</b> ${product.description}</p>
        <br>
        <button class="comprar-details"> Comprar </button>
        <br>
        <br>
        <button class="agregar-carrito"> Agregar al carrito </button>
    `;

    const productImageDiv = document.createElement('div');
    productImageDiv.className = 'product-image';

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;

    productImageDiv.appendChild(productImage);
    
    productDetails.appendChild(productInfoDiv);
    productDetails.appendChild(productImageDiv);

    const ratingContainer = document.querySelector('.rating');
    const stars = ratingContainer.querySelectorAll('.star');

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('filled');
            }

            for (let i = index + 1; i < stars.length; i++) {
                stars[i].classList.remove('filled');
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadProductDetails();
});
