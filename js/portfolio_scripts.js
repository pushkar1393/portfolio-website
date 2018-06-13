(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // To implement animated charts
  $('.chart').easyPieChart({
    barColor:'#fff',
    trackColor:'rgba(255,255,255,0.2)',
    lineCap: 'butt',
    lineWidth:'6',
    size: '120'
  });


  // form submission event
  $("#contactMe").submit(function(e){
    e.preventDefault();
    submitForm();
  });

// To call php mail service
  function submitForm(){
    var name = $("#contact_name").val().trim();
    var email = $("#contact_email").val().trim();
    var phone = $("#contact_number").val();
    var message = $("#contact_message").val().trim();

    $.ajax({
      type: "POST",
      url: "/php/contactForm.php",
      data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message,
      success : function(text){
        if (text == "success"){
        $("#confirmationModal").modal('show');
        $("#contact_name, #contact_email,#contact_number,#contact_message").val("");
        }
      }
    });
  }


// To setup modal for project details
$(document.body).on('click','.portfolio-item',function(e){
  e.preventDefault();
  var id = this.id;
  var p = getProjectById(id);
  $(".modal-title").html(p.title);
  $(".pop-caption").html(p.caption);
  $(".pop-description").html(p.description);
  if(p.tech.length != 0){
    var tech = '<h6><strong>Tech Used: </strong></h6><ul>';
    for(var i =0; i < p.tech.length; i++){
      tech += '<li>'+p.tech[i]+'</li>';
    }
    tech +='</ul>';
    $(".pop-list").html(tech);
  }
  if(p.link !== ""){
    $(".pop-link").html('<h6><strong>Project Link: </strong></h6><a class="btn btn-dark" href='+p.link+' target="_blank" ><i class="icon-link mx-2"></i>'+p.title+'</a>');
  }
  $("#projectDetailModal").modal("show");
});

$(document).ready(function() {
  setUpPortfolio();
});

function setUpPortfolio(){
  $.ajax({
    dataType: "json",
    url: "/assets/project-data.json",
    success: function(data){
      sessionStorage.setItem('projects',JSON.stringify(data.projects));
      var projectList = $.parseJSON(sessionStorage.getItem('projects'));
      var markUp = '';
      for (var i=0; i < projectList.length; i++){
      markUp += '<div class="col-lg-6">'+
      '<a class="portfolio-item" id="'+ projectList[i].id+'" href="#">'+
      '<span class="caption"><span class="caption-content">'+
      '<h2>'+projectList[i].title+'</h2>'+
      '<p class="mb-0">'+projectList[i].caption+'</p>'+
      '</span>'+
      '</span>'+
      '<img class="img-fluid" src="'+projectList[i].image+'" alt="">'+
      '</a>'+
      '</div>';
    }
    $(".block-project").html(markUp);
    }
  });
}


function getProjectById(id){
  var projectList = $.parseJSON(sessionStorage.getItem('projects'));
  return projectList[id];
}

})(jQuery); // End of use strict
