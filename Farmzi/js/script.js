$(document).ready(function() {
    $('.icon-menu').click(function(event){
        $('.icon-menu,.header__menu').toggleClass('active');
    })
})



document.addEventListener('click', documentClick);
function documentClick(e){
    const targetItem = e.target;

    if (targetItem.closest('.icon-menu')){
        document.documentElement.classList.toggle('menu-open');

    }
}

const swiper = new Swiper('.slider-materials', {
    // Optional parameters
   



    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

   spaceBetween: 30,
    navigation: {
      nextEl: " .swiper-button-next",
      prevEl: ".swiper-button-prev"
    }

  });

  window.addEventListener('scroll', function(){
    console.log(scrollY);
scrollY > 0 ? document.querySelector('.header').classList.add('scroll') :   document.querySelector('.header').classList.remove('scroll') 
 
});


