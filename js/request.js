< !DOCTYPE html >
    <html lang="en">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Your Website Title</title>
                    <style>
    /* Add your CSS styles here */
                        body {
                            font - family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
    }
                        header {
                            background - color: #333;
                        color: #fff;
                        padding: 10px 0;
                        text-align: center;
    }
                        nav {
                            margin: 0;
                        padding: 0;
    }
                        nav ul {
                            list - style - type: none;
                        margin: 0;
                        padding: 0;
    }
                        nav ul li {
                            display: inline;
                        margin-right: 20px;
    }
                        nav ul li a {
                            color: #fff;
                        text-decoration: none;
    }
                        .dropdown {
                            display: inline-block;
                        position: relative;
    }
                        .dropdown-content {
                            display: none;
                        position: absolute;
                        background-color: #f9f9f9;
                        min-width: 160px;
                        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                        z-index: 1;
    }
                        .dropdown-content a {
                            color: black;
                        padding: 12px 16px;
                        text-decoration: none;
                        display: block;
    }
                        .dropdown:hover .dropdown-content {
                            display: block;
    }
                        .product-item {
                            border: 1px solid #ddd;
                        border-radius: 4px;
                        padding: 10px;
                        margin: 10px 0;
    }
                        /* Base styling for the common navigation */
                        #common-nav ul {
                            list - style: none;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;
    }
                        #common-nav ul li {
                            position: relative;
    }
                        #common-nav ul li a {
                            text - decoration: none;
                        display: block;
                        padding: 10px 15px;
                        color: #000;
    }
                        /* Dropdown container */
                        .dropdown .dropdown-content {
                            display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background-color: #fff;
                        min-width: 150px;
                        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                        z-index: 100;
    }
                        /* Dropdown item styling */
                        .dropdown .dropdown-content li a {
                            padding: 10px 15px;
                        color: #000;
                        white-space: nowrap;
    }
                        .dropdown .dropdown-content li a:hover {
                            background - color: #ddd;
    }
                        /* Responsive adjustments for mobile */
                        @media (max-width: 480px) {
                            #common - nav ul {
                            flex - direction: column;
      }
                        #common-nav ul li {
                            width: 100%;
                        text-align: center;
      }
    }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>Your Website Title</h1>
                        <nav id="common-nav">
                            <ul>
                                <li><a href="index.html">HOME</a></li>
                                <li><a href="updates.html">UPDATES</a></li>
                                <li><a href="products.html">PRODUCTS</a></li>
                            </ul>
                        </nav>
                    </header>

                    <div id="products-container"></div>

                    <script>
                        document.addEventListener("DOMContentLoaded", function () {
      const productsContainer = document.getElementById("products-container");
                        let posts = JSON.parse(localStorage.getItem("posts")) || [];
                        let products = posts.filter(function (post) {
        return post.type === "product";
      });

                        if (products.length === 0) {
                            productsContainer.innerHTML = "<p>No products available.</p>";
      } else {
                            products.forEach(function (product) {
                                const productDiv = document.createElement("div");
                                productDiv.className = "product-item";
                                let mediaElement = "";
                                if (product.mediaType === "image") {
                                    mediaElement = '<img src="' + product.mediaFile + '" alt="' + product.title + '"/>';
                                } else if (product.mediaType === "video") {
                                    mediaElement = '<video controls width="250"><source src="' + product.mediaFile + '">Your browser does not support the video tag.</video>';
                                }
                                productDiv.innerHTML = `
            <h3>${product.title}</h3>
            ${mediaElement}
            <button onclick="selectProduct(${product.id}, '${product.title.replace(/'/g, "\\'")}')">Select Product</button>
          `;
                                productsContainer.appendChild(productDiv);
                            });
      }
    });

                        function selectProduct(productId, productTitle) {
                            let whatsapp = "";
                        // Require a non-empty WhatsApp number
                        while (true) {
                            whatsapp = prompt("Enter your WhatsApp number (required):");
                        if (whatsapp === null) {
                            alert("WhatsApp number is required to submit a request.");
                        return;
        } else if (whatsapp.trim() === "") {
                            alert("Please enter a valid WhatsApp number.");
                        continue;
        } else {
          break;
        }
      }

                        let request = {
                            id: Date.now(),
                        productId: productId,
                        productTitle: productTitle,
                        whatsapp: whatsapp.trim()
      };

                        let requests = JSON.parse(localStorage.getItem("requests")) || [];
                        requests.push(request);
                        localStorage.setItem("requests", JSON.stringify(requests));
                        alert("Your request has been submitted!");
    }
                    </script>

                    <script>
                        const menuDropdown = document.getElementById("menuDropdown");
                        const menuDropdownContent = document.getElementById("menuDropdownContent");

                        if (menuDropdown && menuDropdownContent) {
                            menuDropdown.addEventListener("click", function (e) {
                                e.preventDefault();
                                // Toggle dropdown visibility
                                if (menuDropdownContent.style.display === "block") {
                                    menuDropdownContent.style.display = "none";
                                } else {
                                    menuDropdownContent.style.display = "block";
                                }
                            });

                        // Click anywhere outside the dropdown to close it
                        document.addEventListener("click", function(e) {
        if (!menuDropdown.contains(e.target) && !menuDropdownContent.contains(e.target)) {
                            menuDropdownContent.style.display = "none";
        }
      });
    }
                    </script>
                </body>
            </html>