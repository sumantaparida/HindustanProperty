var $ = jQuery.noConflict();
//alert($.fn.jquery);
console.log($.fn.jquery);
(function($){
  $("[data-autosuggest]").autocomplete({
      source: function (request, response) {
          var param = { Data: $("[data-autosuggest]").val() };
          alert('sumanta');
          $.ajax({
              url: "http://www.hindustanproperty.com/WebMethodCommon.aspx/GetLocation",
              data: JSON.stringify(param),
              dataType: "json",
              type: "POST",
              contentType: "application/json; charset=utf-8",
              dataFilter: function (data) { return data; },
              success: function (data) {
                  if (data.d.length > 0) {
                      $("[data-autosuggest]").css({ "border-color": "" });

                      //alert(item.split('|')[0]);
                      response($.map(data.d, function (item) {
                          //alert(item.split('|')[0]);
                          //.attr('id','id1')
                          return {
                              label: item.split('|')[0],
                              val: item.split('|')[1]

                          }
                      }))

                  }
                  else {
                      //alert('test');
                      $("[data-autosuggest]").css({ "border-color": "red" });

                  }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                  var err = eval("(" + XMLHttpRequest.responseText + ")");
                  //alert(err.Message)
              }
          });
      },

      select: function (e, i) {

          var code = i.item.val;
          alert(code);


      },
      minLength: 3
  });
})(jQuery);
