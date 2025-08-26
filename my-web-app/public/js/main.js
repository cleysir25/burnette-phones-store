// This file contains the main JavaScript functionality for the user interface, including fetching and displaying products and updates.

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchUpdates();
});

function fetchProducts() {
    // Simulate fetching products from a server
    const products = [
        { id: 1, name: 'Product 1', description: 'Description for product 1', image: 'assets/images/product1.jpg' },
        { id: 2, name: 'Product 2', description: 'Description for product 2', image: 'assets/images/product2.jpg' },
    ];

    const productContainer = document.getElementById('product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;
        productContainer.appendChild(productElement);
    });
}

function fetchUpdates() {
    // Simulate fetching updates from a server
    const updates = [
        { id: 1, title: 'Update 1', content: 'Content for update 1', image: 'assets/images/update1.jpg' },
        { id: 2, title: 'Update 2', content: 'Content for update 2', image: 'assets/images/update2.jpg' },
    ];

    const updateContainer = document.getElementById('update-list');
    updates.forEach(update => {
        const updateElement = document.createElement('div');
        updateElement.classList.add('update');
        updateElement.innerHTML = `
            <img src="${update.image}" alt="${update.title}">
            <h3>${update.title}</h3>
            <p>${update.content}</p>
            <div class="comments" id="comments-${update.id}"></div>
            <textarea placeholder="Add a comment" id="comment-input-${update.id}"></textarea>
            <button onclick="submitComment(${update.id})">Submit Comment</button>
        `;
        updateContainer.appendChild(updateElement);
    });
}

function submitComment(updateId) {
    const commentInput = document.getElementById(`comment-input-${updateId}`);
    const commentText = commentInput.value;

    if (commentText) {
        const commentsContainer = document.getElementById(`comments-${updateId}`);
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = commentText;
        commentsContainer.appendChild(commentElement);
        commentInput.value = ''; // Clear the input
    } else {
        alert('Please enter a comment before submitting.');
    }
}