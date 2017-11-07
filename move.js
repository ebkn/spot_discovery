$(function(){
  $("#move").on("click", function(){
    let link = $(this).attr("href");
        dist = $(link).offset().top;
    $("html, body").animate({
      scrollTop: dist
    }, 800);
  });
});
