{
  let avatar_url = $('#user-avatar-img').attr('src');
  $('#user-details').show();
  $('#edit-form').hide();
  $('#edit-profile').click(function (e) {
    e.preventDefault();
    $('#user-details').hide();
    $('#edit-form').show();
  });
  $('#cancel-button').click(function (e) {
    e.preventDefault();
    $('#user-avatar-img').attr('src', avatar_url);
    $('#user-details').show();
    $('#edit-form').hide();
  });

  $('#avatar').change(function (e) {
    const file = this.files[0];

    var fileName = $(this).val();
    var idxDot = fileName.lastIndexOf('.') + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
      //TO DO
      const fileSize = file.size / 1024 / 1024; // in MiB
      if (fileSize > 2) {
        alert('File size exceeds 2 MiB');
        $(this).val('');
      } else {
        // Proceed further
        if (file) {
          $('#user-avatar-img').attr('src', URL.createObjectURL(file));
        }
      }
    } else {
      alert('Only jpg/jpeg and png files are allowed!');
      $(this).val('');
    }
  });
}
