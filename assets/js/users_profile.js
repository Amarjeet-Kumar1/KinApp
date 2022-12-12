{   
    $('#user-details').show();
    $('#edit-form').hide();
    $('#edit-profile').click(function (e) { 
        e.preventDefault();
        $('#user-details').hide();
        $('#edit-form').show();

    });
    $('#cancel-button').click(function(e){
        e.preventDefault();
        $('#user-details').show();
        $('#edit-form').hide();
    });
}
    
