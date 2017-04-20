$(document).ready(function(){
  $(".painting").hover(function(){
    $(this).addClass("inFocus");
  }, function(){
    $(this).removeClass("inFocus");
  });
});
