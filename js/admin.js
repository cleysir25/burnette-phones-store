document.addEventListener('DOMContentLoaded', () => {
    // Retrieve admin password from localStorage or use default
    let storedPassword = localStorage.getItem("adminPassword") || "admin123";

    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const loginSection = document.getElementById('login-section');
    const adminActions = document.getElementById('admin-actions');
    const manageContent = document.getElementById('manage-content');
    const editSection = document.getElementById('edit-section');
    const cancelEditBtn = document.getElementById('cancel-edit');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === "admin" && password === storedPassword) {
            localStorage.setItem("isAdmin", "true");
            loginMessage.textContent = "Login successful!";
            loginSection.style.display = "none";
            adminActions.style.display = "block";
            manageContent.style.display = "block";
            showSection('manage');
            renderManagement();
        } else {
            loginMessage.textContent = "Invalid credentials. Try again.";
        }
    });

    // Handle product submission
    const productForm = document.getElementById('product-form');
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('product-title').value;
        const description = document.getElementById('product-description').value;
        const mediaType = document.getElementById('media-type').value;
        const mediaInput = document.getElementById('media-file');
        const file = mediaInput.files[0];

        if (!file) {
            alert("Please select a media file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const mediaDataUrl = e.target.result;
            const productPost = { id: Date.now(), title, description, mediaType, mediaFile: mediaDataUrl, type: "product" };
            let posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.push(productPost);
            localStorage.setItem("posts", JSON.stringify(posts));
            alert("Product posted!");
            productForm.reset();
            renderManagement();
        }
        reader.readAsDataURL(file);
    });

    // Handle update submission
    const updateForm = document.getElementById('update-form');
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('update-title').value;
        const description = document.getElementById('update-description').value;
        const mediaType = document.getElementById('update-media-type').value;
        const mediaInput = document.getElementById('update-media-file');
        const file = mediaInput.files[0];

        if (!file) {
            alert("Please select a media file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const mediaDataUrl = e.target.result;
            const updatePost = { id: Date.now(), title, description, mediaType, mediaFile: mediaDataUrl, type: "update" };
            let posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.push(updatePost);
            localStorage.setItem("posts", JSON.stringify(posts));
            alert("Update posted!");
            updateForm.reset();
            renderManagement();
        }
        reader.readAsDataURL(file);
    });

    // Handle edit form submission
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = Number(document.getElementById('edit-id').value);
        const title = document.getElementById('edit-title').value;
        const description = document.getElementById('edit-description').value;
        const mediaType = document.getElementById('edit-media-type').value;
        const mediaInput = document.getElementById('edit-media-file');
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        const index = posts.findIndex(post => post.id === id);
        if (index === -1) {
            alert("Post not found.");
            return;
        }
        posts[index].title = title;
        posts[index].description = description;
        posts[index].mediaType = mediaType;

        if (mediaInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                posts[index].mediaFile = e.target.result;
                localStorage.setItem("posts", JSON.stringify(posts));
                alert("Post updated!");
                editForm.reset();
                editSection.style.display = "none";
                manageContent.style.display = "block";
                renderManagement();
            }
            reader.readAsDataURL(mediaInput.files[0]);
        } else {
            localStorage.setItem("posts", JSON.stringify(posts));
            alert("Post updated!");
            editForm.reset();
            editSection.style.display = "none";
            manageContent.style.display = "block";
            renderManagement();
        }
    });

    cancelEditBtn.addEventListener('click', () => {
        editForm.reset();
        editSection.style.display = "none";
        manageContent.style.display = "block";
    });

    // Settings form submission to change admin password and theme
    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('new-admin-password').value;
        const theme = document.getElementById('theme-select').value;
        localStorage.setItem("adminPassword", newPassword);
        applyTheme(theme);
        alert("Settings saved!");
        settingsForm.reset();
    });

    // Apply theme if set in localStorage on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
});

function renderManagement() {
    const productsList = document.getElementById('products-list');
    const updatesList = document.getElementById('updates-list');
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    productsList.innerHTML = "";
    updatesList.innerHTML = "";

    const products = posts.filter(post => post.type === "product");
    const updates = posts.filter(post => post.type === "update");

    if (products.length === 0) {
        productsList.innerHTML = "<li>No products available.</li>";
    } else {
        products.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `${post.title} 
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
                <button onclick="viewComments(${post.id}, '${post.title.replace(/'/g, "\\'")}')">View Comments</button>`;
            productsList.appendChild(li);
        });
    }

    if (updates.length === 0) {
        updatesList.innerHTML = "<li>No updates available.</li>";
    } else {
        updates.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `${post.title} 
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
                <button onclick="viewComments(${post.id}, '${post.title.replace(/'/g, "\\'")}')">View Comments</button>`;
            updatesList.appendChild(li);
        });
    }
}

function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderManagement();
}

function editPost(postId) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);
    if (!post) {
        alert("Post not found.");
        return;
    }
    document.getElementById('manage-content').style.display = "none";
    document.getElementById('edit-section').style.display = "block";
    document.getElementById('edit-id').value = post.id;
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-description').value = post.description;
    document.getElementById('edit-media-type').value = post.mediaType;
}

function viewComments(postId, postTitle) {
    // Show comments-management section and filter comments by postId
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    const filteredComments = comments.filter(c => c.postId === postId);
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = "";
    document.getElementById('comments-post-title').textContent = postTitle;
    if (filteredComments.length === 0) {
        commentsList.innerHTML = "<p>No comments for this post.</p>";
    } else {
        filteredComments.forEach(comment => {
            const div = document.createElement("div");
            div.className = "comment-box";
            div.innerHTML = `<strong>${comment.name}:</strong> ${comment.text}
            <button onclick="deleteComment(${postId}, '${comment.name.replace(/'/g, "\\'")}', '${comment.text.replace(/'/g, "\\'")}')">Delete</button>`;
            commentsList.appendChild(div);
        });
    }
    hideAllSections();
    document.getElementById('comments-management').style.display = "block";
}

function deleteComment(postId, commenter, text) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments = comments.filter(c => !(c.postId === postId && c.name === commenter && c.text === text));
    localStorage.setItem("comments", JSON.stringify(comments));
    viewComments(postId, document.getElementById('comments-post-title').textContent);
}

// Function to hide all main sections and then show the selected one
function showSection(section) {
    hideAllSections();
    if (section === 'manage') {
        document.getElementById('admin-actions').style.display = "block";
        document.getElementById('manage-content').style.display = "block";
    } else if (section === 'comments') {
        // If you prefer a list of all comments instead of by post,
        // you can implement that here.
        alert("Please use the 'View Comments' button on a post to see its comments.");
        showSection('manage');
    } else if (section === 'settings') {
        document.getElementById('settings-section').style.display = "block";
    }
}

function hideAllSections() {
    const sections = ['admin-actions', 'manage-content', 'comments-management', 'settings-section', 'edit-section'];
    sections.forEach(id => {
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
        }
    });
}

function closeComments() {
    document.getElementById('comments-management').style.display = "none";
    showSection('manage');
}

function applyTheme(theme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
}