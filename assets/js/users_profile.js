{   
    let avatar_url = $('#user-avatar-img').attr('src');
    $('#user-details').show();
    $('#edit-form').hide();
    $('#edit-profile').click(function (e) { 
        e.preventDefault();
        $('#user-details').hide();
        $('#edit-form').show();

    });
    $('#cancel-button').click(function(e){
        e.preventDefault();
        $('#user-avatar-img').attr('src', avatar_url);
        $('#user-details').show();
        $('#edit-form').hide();
    });

    $('#avatar').change(function (e) { 
        
        const file = this.files[0];
        if(file){
            $('#user-avatar-img').attr('src', URL.createObjectURL(file));
        }
    });
}
    
