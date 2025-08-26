document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let products = posts.filter(post => post.type === "product");

    if (products.length === 0) {
        productsContainer.innerHTML = "<p>No products available.</p>";
    } else {
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product-item";
            let mediaElement = "";
            if (product.mediaType === "image") {
                mediaElement = `<img src="${product.mediaFile}" alt="${product.title}" />`;
            } else if (product.mediaType === "video") {
                mediaElement = `<video controls width="250">
                                    <source src="${product.mediaFile}">
                                    Your browser does not support the video tag.
                                </video>`;
            }
            productDiv.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                ${mediaElement}
            `;
            productsContainer.appendChild(productDiv);
        });
    }
});