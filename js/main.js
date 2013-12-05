"use strict";

$(document).ready(function () {
  if ($(".email").length) {
    // variables, which will be replaced
    var at = / AT /,
      dot = / DOT /g;

    // function, which replaces pre-made class
    $(".email a").each(function () {
      var address = "mailto:" + $(this).data("email").replace(at, "@").replace(dot, ".");
      $(this).attr("href", address);
    });
    $(".email").show();
  }
});
