import "../style/main_v.scss";
import "bootstrap";


$(document).ready(function(){
  $("body").css("display", "block");
  $("#upload-button").on('click', function(){
    $("#upload").click();
    return false;
  })
  $("#logo").on('click', function(){
    window.location = '/';
  });
  $("#upload").on("change", function(e){
      e.preventDefault();
      var fileName = $(this).val();
      $("#dialog-box").modal();
  });

  $("#btn-submit-upload").click(function(){
    $("#change-photo").submit();
  });
});