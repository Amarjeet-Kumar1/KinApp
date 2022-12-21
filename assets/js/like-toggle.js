class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        
            $(this.toggler).click(function(e){
              let self = this;
            
              e.preventDefault();
          
              $.ajax({
                type: "GET",
                url: $(self).prop('href'),
          
                success: function (data) {
                  $(self).text(`${data.data.like_no} Likes`);
                  $(self).parent().toggleClass("liked");
                  
                  
                }
              });
            });
          
    }
}