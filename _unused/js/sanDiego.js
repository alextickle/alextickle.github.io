$(document).ready(function(){
  $(".hood").hover(function(){
    $(this).addClass("inFocus");
  },
  function(){
    $(this).removeClass("inFocus");
  });
});
