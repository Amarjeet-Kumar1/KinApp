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
                  if(data.data.liked){
                    $(self).parent().css( "background-color", "blue");
                    $(self).css("color", "white");
                  } else {
                    $(self).parent().css( "background-color", "white");
                    $(self).css("color", "black");
                  }
                  
                }
              });
            });
          
    }
}