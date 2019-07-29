$(document).ready(function(){
  $('#pul>li:nth-child(3)').click(function(){
    $('html, body').animate({scrollTop: $('#pul3').offset().top}, 1000)
  })
  $('#pul>li:nth-child(4)').click(function(){
    $('html, body').animate({scrollTop: $('#pul4').offset().top}, 1000)
  })
  $('#pul>li:nth-child(2)').click(function(){
    $('html, body').animate({scrollTop: $('#pul').offset().top}, 1000)
  })
 
});