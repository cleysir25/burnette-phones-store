// This file contains JavaScript functions for managing user comments on updates, including submitting and displaying comments.

document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');

    // Function to submit a comment
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();

        if (commentText) {
            addComment(commentText);
            commentInput.value = ''; // Clear the input field
        }
    });

    // Function to add a comment to the list
    function addComment(text) {
        const commentItem = document.createElement('li');
        commentItem.textContent = text;
        commentList.appendChild(commentItem);
    }
});