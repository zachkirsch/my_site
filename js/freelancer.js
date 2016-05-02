/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

var MOBILE_CUTOFF = 767

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 650, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


/* section heights */

var CHANGING_HEADER = true
var CHANGING_CONTACT = true
var CHANGING_PORTFOLIO = true

update_div_heights();

$(document).ready(function(){
  $( window ).resize(function() {
    update_div_heights()
    if ($(window).width() <= MOBILE_CUTOFF) {
      $("#in-page-proj-info").hide()
    }
    else {
      $("#in-page-proj-info").show()
    }
  });
});


function update_div_heights() {
  update_header_height();
  update_contact_height();
  update_portfolio_height();
}

function update_header_height() {

  if (!CHANGING_HEADER) return

  // header div lengthens so that it covers the whole screen

  new_height = $(window).height();
  //new_height = Math.max(orig_header_height, new_height);

  update_height($("#header"), new_height)
}

function update_portfolio_height() {

  if (!CHANGING_PORTFOLIO) return

  // div lengthens so that it covers the whole screen

  new_height = $(window).height();
  //new_height = Math.max(orig_portfolio_height, new_height)

  update_height($("#portfolio"), new_height)
}

function update_contact_height() {

  if (!CHANGING_CONTACT) return

  // contact div lengthens so that scroll-down animation from navbar isn't choppy

  // subtracting footer height
  new_height = $(window).height() - $("#footer").height();
  //new_height = Math.max(orig_contact_height, new_height);

  update_height($("#contact"), new_height)
}

function update_height($this, height) {
  //$this.css('min-height', height.toString() + 'px')

  $this.stop(true)
  $this.animate({
    'min-height': height.toString() + 'px'
  }, 500)
}


/* portfolio */

var ANIMATING_ICONS = false
var started_animation = false

$(document).ready(function(){

  // start them invisible and show after aligned
  if ($(window).width() > MOBILE_CUTOFF) {
    var scrolled_down = $(this).scrollTop() > $("#portfolio").offset().top-200
    started_animation = scrolled_down

    $("#in-page-proj-info").css('opacity', 0)
    $("#in-page-proj-info").show()

    $(".portfolio-icons").show()

    showPortfolioItemInPage($(".portfolio-link").first(), false, function() {

      $("#next-portfolio-item").show()
      $("#next-portfolio-item").css('line-height', ($("#in-page-proj-info").height()).toString() + 'px')

      $(".portfolio-icons").css('opacity', 0)
      setTimeout(function() {
        centerPortfolioIcons(function() {
          if (!scrolled_down) $("#in-page-proj-info").css('opacity', 0)
        })
      }, 250)
      $(".portfolio-icons").css('opacity', 1)
    })
  }

  $(window).scroll(function() {
    if ($(this).scrollTop() > $("#portfolio").offset().top-200 && $(window).width() > MOBILE_CUTOFF) {
      if (!started_animation) {
        started_animation = true
        if(ANIMATING_ICONS) animate_icons()

        $("#in-page-proj-info").delay(300).animate({
                opacity: 1
            }, 540)
      }
    }
  });

  $( window ).resize(function() {
    if ($(window).width() < MOBILE_CUTOFF) {
      $("#next-portfolio-item").hide()
    }
    else {
      $("#next-portfolio-item").show()
    }
    centerPortfolioIcons()
  });

  $(".portfolio-link .caption").hover(function() {
    $(".portfolio-link .caption").stop(true)
    $(".portfolio-link .caption").css('opacity', 0)
    if ($(window).width() > MOBILE_CUTOFF) return;

    $(this).animate({
      opacity: 1
    }, 300)
  }, function() {
    $(this).animate({
      opacity: 0
    }, 300)
  });

  $(".portfolio-link").hover(function() {
    wl = $(window).width()
    if (wl <= MOBILE_CUTOFF) return;

    showPortfolioItemInPage($(this))
  });

  $(".portfolio-link").click(function() {
    wl = $(window).width()
    $this = $(this)
    this_modal = $("#" + $this.attr("data_id"))
    if (wl <= MOBILE_CUTOFF) this_modal.modal('show')
  });

  $("#next-portfolio-item").click(function() {
    var new_item_index
    $(".portfolio-link").each(function(index, item) {
      if ($(item).hasClass('active')) {
        $(item).removeClass('active')
        new_item_index = (index + 1) % $('.portfolio-link').length
      }
    });
    $(".portfolio-link").each(function(index, item) {
      if (index == new_item_index) {
        $(item).addClass('active')
        showPortfolioItemInPage($(item), true)
      }
    });
  });

});

function animate_icons() {
  // this goes recursively until icons are hovered
  $(".portfolio-link .caption").animate({
      opacity: .75
    }, 540).delay(180).animate({
      opacity: 0
    }, 540, animate_icons)
}

function showPortfolioItemInPage($this, fade, _callback) {

  this_modal = $("#" + $this.attr("data_id"))
  $(".portfolio-link").removeClass("active")
  $this.addClass("active")
  if (fade) {
    $("#in-page-proj-info").stop(true, true).animate({
            opacity: 0
        }, 300, function() {
      $("#in-page-proj-info").html(this_modal.find(".modal-body").html())
      cleanUpItem(function() {
        $("#in-page-proj-info").animate({
          opacity: 1
        }, 300, function() {
          if (_callback != undefined) _callback()
        })
      })
    });
  }
  else {
    $("#in-page-proj-info").css('opacity', 1)
    $("#in-page-proj-info").html(this_modal.find(".modal-body").html())
    cleanUpItem(_callback)
  }
}

function cleanUpItem(_callback) {

  $("#in-page-proj-info").find("button").remove()
  $("#in-page-proj-info").find("hr").removeClass("star-primary")
  update_portfolio_height();

  if (_callback != undefined) _callback()
}

function centerPortfolioIcons(_callback) {
  margin = (($("#in-page-proj-info").height()-$(".portfolio-icons").height())/2)
  margin = Math.max(30, margin)
  $(".portfolio-icons").css('margin-top', margin.toString() + 'px')
  if (_callback != undefined) _callback()
}

/* show/hide header name on scroll */
$(document).ready(function(){
  header_faded_in = false
  $(window).scroll(function() {
    // fade in name when scrolled down 75% of header
    if ($(this).scrollTop() > $("#header").height()*.75) {
      if (!header_faded_in) {
        header_faded_in = true
        $('.navbar-brand').fadeIn('slow')
      }
    }
    else if (header_faded_in) {
      $('.navbar-brand').fadeOut('slow')
      header_faded_in = false
    }
  });
});

// close modal on 'contact me' click
$(document).ready(function() {
  $('a[href="#contact"]').click(function() {
    $(".modal").modal('hide')
  })
})


// modal openers are clickable
$(document).ready(function() {

  if ($(window).width() <= MOBILE_CUTOFF)
    $(".portfolio-link").addClass('clickable')
  else $(".portfolio-link").removeClass('clickable')

  $( window ).resize(function() {
    if ($(window).width() <= MOBILE_CUTOFF)
      $(".portfolio-link").addClass('clickable')
    else $(".portfolio-link").removeClass('clickable')
  })

})





// console.log(" ______           _       _   ___               _     ")
// console.log("|___  /          | |     | | / (_)             | |    ")
// console.log("   / /  __ _  ___| |__   | |/ / _ _ __ ___  ___| |__  ")
// console.log("  / /  / _` |/ __| '_ \\  |    \\| | '__/ __|/ __| '_ \\ ")
// console.log("./ /__| (_| | (__| | | | | |\\  \\ | |  \\__ \\ (__| | | |")
// console.log("\\_____/\\__,_|\\___|_| |_| \\_| \\_/_|_|  |___/\\___|_| |_|")
