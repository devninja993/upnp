import "../style/main_n.scss";
var news = require("./news-single");

$(document).ready(function(){
  $("body").css("display", "block");
  $("#logo").on('click', function(){
    var url = $(this).attr("data-url");
    // console.log(url)
    window.location = url;
  })
  

  $.ajax({
    type: "get",
    url: "http://upnp.ga/api/news",
    // data: data,
    success: function (response) {
      // self.newsList = response;
      // self.getNews()
      console.log(response);
      var newsList = response.map(el => {
        return news.getNews(el);
      })
      $("div.main-container").append(newsList.join(""));
      console.log(newsList)
    },
    contentType: false,
    cache: false,
    processData: false,
    // dataType: dataType
  });
});
