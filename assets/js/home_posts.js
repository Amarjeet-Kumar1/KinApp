{   
  // method to submit the form data for new post using AJAX
  let createPost = function(){
      let newPostForm = $('#new-post-form');

      newPostForm.submit(function(e){
          e.preventDefault();
          
          $.ajax({
              type: 'POST',
              url: '/posts/create',
              data: newPostForm.serialize(),
              success: function(data){
                  let newPost = newPostDom(data.data.post);
                  $('#posts-list-container>ul').prepend(newPost);
                  $('textarea').val("");
                  deletePost($(' .delete-post-button', newPost));

                  // call the create comment class
                  new PostComments(data.data.post._id);

                  new Noty({
                      theme: 'relax',
                      text: "Post published!",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();

              }, error: function(error){
                  console.log(error.responseText);
              }
          });
      });
  }


  // method to create a post in DOM
  let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
    <div class="avatar-post">
    <div class="user-avatar">
      <div class="avatar">
        <a href="/users/profile/${post.user._id}">
        <img src="${post.user.avatar}" alt="${post.user.name}">
      </a>
      </div>
    </div>
    <div class="post-content-container">
      <div>
    <div class="post-user-delete">
      <p class="user-name"><a href="/users/profile/${post.user._id}">${post.user.name}</a></p>
      
        <button ><a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a></button>
        
      
    </div>
    <p class="post-content">${post.content}</p>
    </div>
      <div class="post-comment-container">
        <div>
        
        <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
          
          <input type="text" name="comment" id="comment" placeholder="Add Comment...." required>
          <input type="hidden" name="post" value="${post._id}">
          <button type="submit">Add</button>
        </form>
        
      </div>
  
        <div class="post-comments-list">
          <ul id="post-comments-${post._id}">
            
            
          </ul>
        </div>
      </div>
    </div>
  </div>
  <hr> </li>`);

     
  }


  // method to delete a post from DOM
  let deletePost = function(deleteLink){
      $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
              type: 'GET',
              url: $(deleteLink).prop('href'),
              success: function(data){
                  $(`#post-${data.data.post_id}`).remove();
                  new Noty({
                      theme: 'relax',
                      text: "Post Deleted",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();
              },error: function(error){
                  console.log(error.responseText);
              }
          });

      });
  }





  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function(){
      $('#posts-list-container>ul>li').each(function(){
          let self = $(this);
          let deleteButton = $(' .delete-post-button', self);
          deletePost(deleteButton);

          // get the post's id by splitting the id attribute
          let postId = self.prop('id').split("-")[1]
          new PostComments(postId);
      });
  }



  createPost();
  convertPostsToAjax();
}