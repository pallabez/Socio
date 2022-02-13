{ 
  // Method to submit the form mdata for new post using AJAX
  let createPost = () => {
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/post/create',
        data: newPostForm.serialize(),
        success: function(data) {
          console.log(data);
          let newPost = newPostDom(data.data.posts);
          $('#post-list-container').prepend(newPost);
          deletePost($(' .delete-post-button', newPost));
        }, error: function(error) {
          console.log(error.responseText);
        }
      })
    })
  }

  // Method to create a post in DOM
  let newPostDom = (post) => {
    return $(`
      <li id="post-${post._id}">
      <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>

      ${post.content} -
      ${post.user.username}

      <div class="post-comments">
        <form action="/comment/create" method="POST">
          <input type="text" name="content" required>
          <input type="hidden" name="post" value="${post._id}">
          <input type="submit" value="Reply">
        </form>
      
        <div class="post-comment-list">
            <ul id="post-comment-${post._id}">
            </ul>
        </div>
      </div>
      </li>
  `)}

  // Method to delete a post from DOM
  let deletePost = (deleteLink) => {
    $(deleteLink).click(function(e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function(data) {
          $(`#post-${data.data.post_id}`).remove();
        }, error: function(error) {
          console.log(error.responseText);
        }
      })
    })
  }
  createPost();
}