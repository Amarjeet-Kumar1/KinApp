let docTitle = document.title;

$(window).blur(() => {
  document.title = 'Come Back :(';
});
$(window).focus(() => {
  document.title = docTitle;
});
