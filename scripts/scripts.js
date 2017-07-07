function initializeJS() {

  //tool tips
  jQuery('.tooltips').tooltip();

  //popovers
  jQuery('.popovers').popover();

  //custom scrollbar
  //for html
  jQuery("html").niceScroll({ styler: "fb", cursorcolor: "#007AFF", cursorwidth: '6', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: '', zindex: '1000' });
  //for sidebar
  jQuery("#sidebar").niceScroll({ styler: "fb", cursorcolor: "#007AFF", cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: '' });
  // for scroll panel
  jQuery(".scroll-panel").niceScroll({ styler: "fb", cursorcolor: "#007AFF", cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: '' });

  //sidebar dropdown menu
  jQuery('#sidebar .sub-menu > a').click(function() {
    var last = jQuery('.sub-menu.open', jQuery('#sidebar'));
    jQuery('.menu-arrow').removeClass('arrow_carrot-right');
    jQuery('.sub', last).slideUp(200);
    var sub = jQuery(this).next();
    if (sub.is(":visible")) {
      jQuery('.menu-arrow').addClass('arrow_carrot-right');
      sub.slideUp(200);
    } else {
      jQuery('.menu-arrow').addClass('arrow_carrot-down');
      sub.slideDown(200);
    }
    var o = (jQuery(this).offset());
    diff = 200 - o.top;
    if (diff > 0)
      jQuery("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
    else
      jQuery("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
  });

  // sidebar menu toggle
  jQuery(function() {
    function responsiveView() {
      var wSize = jQuery(window).width();
      if (wSize <= 768) {
        jQuery('#container').addClass('sidebar-close');
        jQuery('#sidebar > ul').hide();
      }

      if (wSize > 768) {
        jQuery('#container').removeClass('sidebar-close');
        jQuery('#sidebar > ul').show();
      }
    }
    jQuery(window).on('load', responsiveView);
    jQuery(window).on('resize', responsiveView);
  });

  jQuery('.toggle-nav').click(function() {
    if (jQuery('#sidebar > ul').is(":visible") === true) {
      jQuery('#main-content').css({
        'margin-left': '0px'
      });
      jQuery('#sidebar').css({
        'margin-left': '-180px'
      });
      jQuery('#sidebar > ul').hide();
      jQuery("#container").addClass("sidebar-closed");
    } else {
      jQuery('#main-content').css({
        'margin-left': '180px'
      });
      jQuery('#sidebar > ul').show();
      jQuery('#sidebar').css({
        'margin-left': '0'
      });
      jQuery("#container").removeClass("sidebar-closed");
    }
  });

  //bar chart
  if (jQuery(".custom-custom-bar-chart")) {
    jQuery(".bar").each(function() {
      var i = jQuery(this).find(".value").html();
      jQuery(this).find(".value").html("");
      jQuery(this).find(".value").animate({
        height: i
      }, 2000)
    })
  }

}

// Checked List Group from: https://bootsnipp.com/snippets/featured/checked-list-group
function initializeCheckedList() {
  $('.list-group.checked-list-box .list-group-item').each(function() {

    // Settings
    var $widget = $(this),
      $checkbox = $('<input type="checkbox" class="hidden" />'),
      color = ($widget.data('color') ? $widget.data('color') : "primary"),
      style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
      settings = {
        on: {
          icon: 'glyphicon glyphicon-check'
        },
        off: {
          icon: 'glyphicon glyphicon-unchecked'
        }
      };

    $widget.css('cursor', 'pointer')
    $widget.append($checkbox);

    // Event Handlers
    $widget.on('click', function() {
      $checkbox.prop('checked', !$checkbox.is(':checked'));
      $checkbox.triggerHandler('change');
      updateDisplay();
    });
    $checkbox.on('change', function() {
      updateDisplay();
    });


    // Actions
    function updateDisplay() {
      var isChecked = $checkbox.is(':checked');

      // Set the button's state
      $widget.data('state', (isChecked) ? "on" : "off");

      // Set the button's icon
      $widget.find('.state-icon')
        .removeClass()
        .addClass('state-icon ' + settings[$widget.data('state')].icon);

      // Update the button's color
      if (isChecked) {
        $widget.addClass(style + color + ' active');
      } else {
        $widget.removeClass(style + color + ' active');
      }
    }

    // Initialization
    function init() {

      if ($widget.data('checked') == true) {
        $checkbox.prop('checked', !$checkbox.is(':checked'));
      }

      updateDisplay();

      // Inject the icon if applicable
      if ($widget.find('.state-icon').length == 0) {
        $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
      }
    }
    init();
  });

  $('#get-checked-data').on('click', function(event) {
    event.preventDefault();
    var checkedItems = {},
      counter = 0;
    $("#check-list-box li.active").each(function(idx, li) {
      checkedItems[counter] = $(li).text();
      counter++;
    });
    $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
  });
}

jQuery(document).ready(function() {
  initializeJS();
  initializeCheckedList();
});