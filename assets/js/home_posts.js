{
  //method to submit the form data for post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        //newPostForm.serialize() convert form data in json
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $('#posts-list-container>ul').prepend(newPost);
          //class dalete-post-button inside newPost\
          deletePost($(' .delete-post-button', newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  

  //method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
                <p>
                    <small>${ post.user.name }</small>
                    <p>${ post.content }</p>
                    
                        <button>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                        </button>
                    
                </p>
                <div id="post-comment">
                    
                        <form action="/comments/create/" method="post">
                            <h6>Add Comment</h6>
                            <input type="text" name="comment" id="comment" placeholder="type here..." required/>
                            <input type="hidden" name="post" value="${ post._id }">
                            <button type="submit">Add</button>
                        </form>
                    
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id}">
                        
                            
                        </ul>
                    </div>
                </div>
                
                </li>`);
  };

//method to delete a from DOM
  let deletePost = function(deleteLink){
    $(deleteLink).click(function (e) { 
      e.preventDefault();
      $.ajax({
        type: "GET",
        url: $(deleteLink).prop('href'),
        
        
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
        }, error: function(err){
          console.log(err.responseText);
        }
      });
    });
  }


  createPost();
}
