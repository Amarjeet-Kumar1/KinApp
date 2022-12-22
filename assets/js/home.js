$('#friends-button').click(function (e) { 
    e.preventDefault();
    $('#home-container').toggleClass('res-toggle');
    
});
$('#home-button').click(function (e) { 
    e.preventDefault();
    $('#home-container').toggleClass('res-toggle');
    
});


$('#up-down').click(function(e){
    e.preventDefault();
    let self = $(this);
    $('#show-hide').toggleClass('show-hide');
    if($(this).html() == '▼▼▼'){
        
        self.html('▲▲▲');
    } else {
        self.html('▼▼▼');
    }

    
});