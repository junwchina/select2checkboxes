(function($) {
    function createOptionFilter(select) {
      var filter_container = $("<div/>").addClass("check-list-field-container");
      var filter_input = $("<input/>").addClass("check-list-field");
      filter_input.attr("autocomplete", "off");
      filter_input.attr("pleaseholder", $(select).attr("placeholder"));
      filter_input.attr("wrap", "off");
      return filter_container.append(filter_input);
    }


    function createCheckboxList(select) {
      var ul = $("<ul/>");
      $(select).find("option").each(function(index, tag) {
        var option = $(this);
        var li = $("<li/>").addClass("check-list-item").appendTo(ul)
        var checkbox = $("<input type='checkbox' />").change(function() {
            if ($(this).is(":checked")) {
                option.attr("selected", "selected");
            } else {
                option.removeAttr("selected");
            }
            return false
        });

        if (option.is(":selected")) checkbox.attr("checked", "checked");

        var label = $("<label/>").attr("title", option.text())
        label.append(checkbox).append(option.text()).appendTo(li)
      })

      return $("<div/>").addClass("check-list-scroll").append(ul)
    }


    var methods = {
        init: function() {
            $(this).hide()

            var select_status = $("<a/>").addClass("multi-select2-button")
            var wrap = $("<div/>").addClass("criteria-wrap")
            wrap.append($("<span>Status: </span>").addClass("fieldLabel"))
            select_status.append(wrap.append("All"))
            select_status.insertBefore(this)

            var container = $("<div/>").addClass("multi-select2-boxes-container box-shadow");
            var form = $("<form/>")
            var form_body = $("<div/>").addClass("form-body")

            form_body.append(createOptionFilter(this))
            form_body.append(createCheckboxList(this))

            container.append(form.append(form_body))
            container.insertBefore(this)
        }
    }
 
    $.fn.multiSelectToCheckboxes = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.multiSelectToCheckboxes');
        }
    };
 
})(jQuery);


$(function() {
  $(document).delegate(".multi-select2-button", "click", function() {
    $(this).next().toggleClass("active")
    $(this).toggleClass("active")
    return false;
  })
})
