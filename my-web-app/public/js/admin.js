// This file contains JavaScript functions for the admin panel, including handling form submissions for posting products and updates.

document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const updateForm = document.getElementById('updateForm');

    if (productForm) {
        productForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(productForm);
            postProduct(formData);
        });
    }

    if (updateForm) {
        updateForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(updateForm);
            postUpdate(formData);
        });
    }

    function postProduct(formData) {
        fetch('/api/products', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Product posted successfully!');
            productForm.reset();
        })
        .catch(error => {
            console.error('Error posting product:', error);
        });
    }

    function postUpdate(formData) {
        fetch('/api/updates', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Update posted successfully!');
            updateForm.reset();
        })
        .catch(error => {
            console.error('Error posting update:', error);
        });
    }
});