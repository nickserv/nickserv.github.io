"use strict";

function decodeEmail () {
  // Email link decoding
  if ($(".email").length) {
    // variables, which will be replaced
    var at = / AT /,
      dot = / DOT /g;

    // function, which replaces pre-made class
    $(".email").each(function () {
      var address = "mailto:" + $(this).data("email").replace(at, "@").replace(dot, ".");
      $(this).attr("href", address);
    });
    $(".email").css("display", "inherit");
  }
}

$(document).ready(function () {
  // Smooth scroll
  // See https://github.com/kswedberg/jquery-smooth-scroll
  $("a").smoothScroll();

  decodeEmail();
});
