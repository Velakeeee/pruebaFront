

document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    // Objeto para representar el carrito
    const cart = {
        items: [],
        total: 0,
    };





    // Datos en formato JSON
    const jsonData = {
        "categories": [
            { "categori_id": 1, "name": "drinks" },
            { "categori_id": 2, "name": "lunch" },
            { "categori_id": 3, "name": "food" },
            { "categori_id": 4, "name": "sea" }
        ],
        "products": [
            {
                "id": 1,
                "name": "Lorem",
                "price": "60.000",
                "available": true,
                "best_seller": true,
                "categories": [
                    1,
                    4
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 2,
                "name": "ipsum",
                "price": "20.000",
                "available": false,
                "best_seller": false,
                "categories": [
                    4
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 3,
                "name": "dolor",
                "price": "10.000",
                "available": true,
                "best_seller": true,
                "categories": [
                    4
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 4,
                "name": "sit",
                "price": "35.000",
                "available": false,
                "best_seller": false,
                "categories": [
                    1,
                    2
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 5,
                "name": "amet",
                "price": "12.000",
                "available": true,
                "best_seller": true,
                "categories": [
                    1,
                    4
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 6,
                "name": "consectetur",
                "price": "120.000",
                "available": true,
                "best_seller": false,
                "categories": [
                    1,
                    4
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 7,
                "name": "adipiscing",
                "price": "50.000",
                "available": false,
                "best_seller": false,
                "categories": [
                    1,
                    3
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 8,
                "name": "elit",
                "price": "2000",
                "available": true,
                "best_seller": false,
                "categories": [
                    1,
                    3
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 9,
                "name": "Maecenas",
                "price": "150.000",
                "available": true,
                "best_seller": true,
                "categories": [
                    2,
                    4
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            },
            {
                "id": 10,
                "name": "eu",
                "price": "200.000",
                "available": false,
                "best_seller": true,
                "categories": [
                    2,
                    3
                ],
                "img": "http://lorempixel.com/200/100/food/",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu."
            }
        ]
    };

    // Evento para filtrar productos disponibles
    document.getElementById('filterAvailable').addEventListener('click', function () {
        filterProductsByAvailability(true); // true para productos disponibles
    });

    // Evento para filtrar productos agotados
    document.getElementById('filterSoldOut').addEventListener('click', function () {
        filterProductsByAvailability(false); // false para productos agotados
    });

    // Evento para filtrar productos más vendidos
    document.getElementById('filterBestSellers').addEventListener('click', function () {
        filterProductsByBestSellers();
    });

    // Evento para filtrar productos con precio mayor a $30,000
    document.getElementById('filterPriceGreaterThan30K').addEventListener('click', function () {
        filterProductsByPriceGreaterThan(30.000); // Filtrar productos con precio mayor a $30,000
    });

    // Evento para filtrar productos con precio menor a $10,000
    document.getElementById('filterPriceLowerThan10K').addEventListener('click', function () {
        filterProductsByPriceLowerThan(10.000); // Filtrar productos con precio menor a $10,000
    });

    // Evento para ordenar productos en función de la selección del usuario
    document.getElementById('sortProducts').addEventListener('change', function () {
        const sortBy = document.getElementById('sortProducts').value;
        sortProducts(sortBy);
    });


    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        searchProducts(searchTerm);
    });


    // Función para obtener el nombre de una categoría por su ID
    function getCategoryName(categoryId) {
        const category = jsonData.categories.find(cat => cat.categori_id === categoryId);
        return category ? category.name : 'Categoría Desconocida';
    }

    // Función para mostrar productos
    // Función para mostrar productos
    function displayProducts(products) {
        productList.innerHTML = ''; // Limpiar contenido actual
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Precio: $${product.price}</p>
            <p>Disponible: ${product.available ? 'Sí' : 'No'}</p>
            <p>Best Seller: ${product.best_seller ? 'Sí' : 'No'}</p>
            <p>Categorías: ${product.categories.map(catId => getCategoryName(catId)).join(', ')}</p>
            <img src="${product.img}" alt="${product.name}">
            <p>${product.description}</p>
            <button class="add-to-cart" data-product-id="${product.id}">Agregar al Carrito</button>&nbsp;<i class="fa fa-cart-plus"></i>
        `;
            productList.appendChild(productDiv);
        });

        // Agregar un evento a los botones "Agregar al Carrito"
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                const productId = event.target.getAttribute('data-product-id');
                const selectedProduct = jsonData.products.find(product => product.id === parseInt(productId));
                addToCart(selectedProduct);
            });
        });
    }
    // Función para agregar un producto al carrito
    function addToCart(product) {
        cart.items.push(product);
        updateCart();
    }

    // Función para quitar un producto del carrito
    function removeFromCart(productId) {
        cart.items = cart.items.filter(item => item.id !== productId);
        updateCart();
    }

    // Función para actualizar el carrito y mostrarlo en la página
    function updateCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        // Limpiar el contenido actual del carrito
        cartItemsElement.innerHTML = '';

        // Calcular el total y mostrar los productos en el carrito
        cart.total = 0;
        cart.items.forEach(item => {
            cart.total += parseFloat(item.price);
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => removeFromCart(item.id));
            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
        });

        // Actualizar el total en la página
        cartTotalElement.textContent = cart.total.toFixed(2);
    }


    // Llena el <select> con las opciones de categoría
    function populateCategoryFilter() {
        const select = document.getElementById('categoryFilter');
        select.innerHTML = '<option value="0">Todas las Categorías</option>';

        jsonData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.categori_id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    }

    function filterProductsByCategory(categoryId) {
        const filteredProducts = jsonData.products.filter(product =>
            product.categories.includes(categoryId)
        );
        displayProducts(filteredProducts);
    }


    // Evento para detectar cambios en la selección de categoría
    categoryFilter.addEventListener('change', function () {
        const selectedCategory = parseInt(categoryFilter.value);
        if (selectedCategory === 0) {
            displayAllProducts();
        } else {
            filterProductsByCategory(selectedCategory);
        }
    });

    // Función para ordenar los productos
    function sortProducts(sortBy) {
        let sortedProducts = [...jsonData.products]; // Clonamos el array para no modificar el original

        switch (sortBy) {
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'highToLow':
                sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case 'lowToHigh':
                sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            default:
                break;
        }

        displayProducts(sortedProducts);
    }

    // Función para buscar productos por nombre
    function searchProducts(searchTerm) {
        const filteredProducts = jsonData.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    function filterProductsByPriceGreaterThan(priceThreshold) {
        const filteredProducts = jsonData.products.filter(product =>
            parseFloat(product.price) > priceThreshold
        );
        displayProducts(filteredProducts);
    }

    function filterProductsByPriceLowerThan(priceThreshold) {
        const filteredProducts = jsonData.products.filter(product =>
            parseFloat(product.price) <= priceThreshold
        );
        displayProducts(filteredProducts);
    }


    // Función para filtrar productos por disponibilidad (disponibles o agotados)
    function filterProductsByAvailability(isAvailable) {
        const filteredProducts = jsonData.products.filter(product =>
            product.available === isAvailable
        );
        displayProducts(filteredProducts);
    }

    // Función para filtrar productos por los más vendidos
    function filterProductsByBestSellers() {
        const filteredProducts = jsonData.products.filter(product =>
            product.best_seller
        );
        displayProducts(filteredProducts);
    }



    // Mostrar todos los productos al cargar la página
    function displayAllProducts() {
        displayProducts(jsonData.products);
    }

    // Inicializar la página
    populateCategoryFilter();
    displayAllProducts();
});


