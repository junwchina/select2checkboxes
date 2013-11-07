(function($) {
  "use strict";

  function createOptionFilter(placeholder) {
    var filter_input = $("<input/>").addClass("check-list-field")
      .attr({ 
          autocomplete: "off", 
          placeholder: placeholder, 
          wrap: "off"
      });

    return $("<div/>").addClass("check-list-field-container")
      .append(filter_input);
  }


  function update_selection() {
     var values = []

     $(this).find("option:selected").each(function() {
       values.push($(this).text())
     })

     var select_container = $(this).prev().prev();
     select_container.find(".criteria-wrap")
        .html(select_container.find(".fieldLabel"))
        .append(values.join(","))
  }


  function createCheckboxList() {
    var ul = $("<ul/>"), 
        $this = $(this);

    //
    // create li tag for each select option
    //
    $this.find("option").each(function(index, tag) {
      var option = $(this);
      var li = $("<li/>").addClass("check-list-item").appendTo(ul)

      // check or uncheck will be reflected to select option
      var checkbox = $("<input type='checkbox' />").change(function() {
          if ($(this).is(":checked")) {
              option.prop("selected", true);
          } else {
              option.removeAttr("selected");
          }

          update_selection.call( $this )
          return true
      });

      if (option.is(":selected")) checkbox.attr("checked", "checked");

      $("<label/>").attr("title", option.text())
        .append(checkbox)
        .append(option.text())
        .appendTo(li)
    })

    return $("<div/>").addClass("check-list-scroll").append(ul)
  }


  function initialize(options) {
    $(this).hide();

    var default_options = {
      label_name: "Options",      // label name
      placeholder: "Search options...",       // placeholder for the search input
      non_selected_status: $(this).data("non_selected_status")
    }

    // initialize options in select data
    for(var k in default_options) {
      var val = $(this).data(k)
      default_options[k] = val ? val : default_options[k]
    }


    // override default options if a options was passed
    options = (typeof options !== "undefined" && options !== null) || {};
    options = $.extend(default_options, options)

    
    var wrap = $("<div/>").addClass("criteria-wrap")
      .append($("<span>" + options["label_name"] + ": </span>").addClass("fieldLabel"))

    var select_status = $("<a/>").addClass("multi-select2-button")
      .append(wrap.append("<span class='fieldValue'></span>"))
      .insertBefore(this)


    var form_body = $("<div/>").addClass("form-body")
      .append(createOptionFilter.call(this, options["placeholder"]))
      .append(createCheckboxList.call(this))

    var container = $("<div/>").addClass("multi-select2-boxes-container box-shadow")
      .append($("<div/>").append(form_body))
      .insertBefore(this)

    return update_selection.call(this)
  }
 
  $.fn.select2Checkboxes = function(options) {
    return initialize.call(this, options);
  };
 

  //example: dom.find(".filterOption .r9-checkbox-label:icontains('" + text + "')");
  $.expr[':'].icontains = function(obj, index, meta, stack){
    return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
  };


  $("select.select2checkboxes").each(function() {
    $(this).select2Checkboxes()
  })

  $("div.multi-select2-boxes-container").delegate("input.check-list-field", "keyup", function() {
    var form_body = $(this).closest(".form-body")
    if ($(this).val().trim() != '') {
      form_body.find('li').hide();
      form_body.find("ul li:icontains('" + $(this).val() + "')")
        .show()
    }else {
      form_body.find('li').show()
    }
    return true
  })
  .click(function(event) {event.stopPropagation()})

  $(document).delegate(".multi-select2-button", "click", function() {
    if($(this).hasClass("active")) return true
    $("div.multi-select2-boxes-container").removeClass("active")
    $("a.multi-select2-button").removeClass("active")
    $(this).next().css("left", $(this).position().left).toggleClass("active")
    $(this).toggleClass("active")
    return false
  })
  .click(function() {
    $("div.multi-select2-boxes-container").removeClass("active")
    $("a.multi-select2-button").removeClass("active")
  })

})(jQuery);
