document.addEventListener("DOMContentLoaded", function(){

  var MqM = 768,
    MqL = 1024;

  var faqsSections = document.querySelectorAll('.faq-group'),
    faqTrigger = document.querySelectorAll('.trigger'),
    faqsContainer = document.querySelector('.faq-items'),
    faqsCategoriesContainer = document.querySelector('.categories'),
    faqsCategories = faqsCategoriesContainer.querySelectorAll('a'),
    closeFaqsContainer = document.querySelector('.cd-close-panel');
    menuButtonContainer = document.querySelector('.menu-button-container')

  //select a faq section 
  //select a faq section 
//select a faq section 
menuButtonContainer.addEventListener('click', () => {
  faqsCategoriesContainer.classList.toggle('zIndex')
  console.log(123)
})

faqsCategories.forEach(function(faqCategory){
  faqCategory.addEventListener('click', function(event){
    event.preventDefault();
    var selectedHref = this.getAttribute('href'),
      target= document.querySelector(selectedHref);
    if( window.innerWidth < MqM) {
      faqsContainer.scrollTop = 0;
      faqsContainer.classList.add('slide-in');
      faqsContainer.querySelector('ul').classList.remove('selected');
      faqsContainer.querySelector(selectedHref).classList.add('selected');
      closeFaqsContainer.classList.add('move-left');
      document.body.classList.add('cd-overlay');

      // Hide all li elements in the aside
      faqsContainer.querySelectorAll('li').forEach(function(li){
        li.style.display = 'none';
      });

      // Display the corresponding li element
      var selectedLi = document.querySelector(selectedHref);
      if(selectedLi) {
        selectedLi.style.display = 'block';
      }
    } else {
      window.scrollTo({ top: target.offsetTop - 19, behavior: 'smooth' });
    }
  });
});



  //close faq lateral panel - mobile only
  document.body.addEventListener('click', function(event){
    if( event.target.classList.contains('cd-overlay') || event.target.classList.contains('cd-close-panel')) {
      closePanel(event);
    }
  });

  faqsContainer.addEventListener('swiperight', function(event){
    closePanel(event);
  });

  faqTrigger.forEach(function(trigger){
    trigger.addEventListener('click', function(event){
      event.preventDefault();
      var faqContent = this.nextElementSibling;
      if (faqContent) {
        faqContent.style.display = (faqContent.style.display === 'block') ? 'none' : 'block';
        this.parentNode.classList.toggle('content-visible');
      }
    });
  });

  window.addEventListener('scroll', function(){
    if ( window.innerWidth > MqL ) {
      (!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
    }
  });

  window.addEventListener('resize', function(){
    if(window.innerWidth <= MqL) {
      faqsCategoriesContainer.classList.remove('is-fixed');
      faqsCategoriesContainer.style.cssText = '';
    } 
    if( faqsCategoriesContainer.classList.contains('is-fixed') ) {
      faqsCategoriesContainer.style.left = faqsContainer.offsetLeft + 'px';
    }
  });

  function closePanel(e) {
    e.preventDefault();
    faqsContainer.classList.remove('slide-in');
    faqsContainer.querySelectorAll('li').forEach(function(li){
      li.style.display = 'block';
    });
    closeFaqsContainer.classList.remove('move-left');
    document.body.classList.remove('cd-overlay');
  }

  function updateCategory(){
    updateCategoryPosition();
    updateSelectedCategory();
  }

  function updateCategoryPosition() {
    var top = document.querySelector('.faq').offsetTop,
      height = document.querySelector('.faq').offsetHeight - document.querySelector('.categories').offsetHeight,
      margin = 20;
    if( top - margin <= window.scrollY && top - margin + height > window.scrollY ) {
      var leftValue = faqsCategoriesContainer.offsetLeft,
        widthValue = faqsCategoriesContainer.offsetWidth;
      faqsCategoriesContainer.classList.add('is-fixed');
      faqsCategoriesContainer.style.left = leftValue + 'px';
      faqsCategoriesContainer.style.top = margin + 'px';
    } else if( top - margin + height <= window.scrollY) {
      var delta = top - margin + height - window.scrollY;
      faqsCategoriesContainer.style.transform = 'translateZ(0) translateY('+delta+'px)';
    } else { 
      faqsCategoriesContainer.classList.remove('is-fixed');
      faqsCategoriesContainer.style.cssText = '';
    }
  }

  function updateSelectedCategory() {
    faqsSections.forEach(function(faqsSection){
      var actual = faqsSection,
        margin = parseInt(document.querySelector('.faq-title').style.marginTop),
        activeCategory = document.querySelector('.categories a[href="#'+actual.id+'"]'),
        topSection = (activeCategory.parentNode.isEqualNode(activeCategory.parentNode.parentNode.firstChild)) ? 0 : Math.round(actual.offsetTop);
      
      if ( ( topSection - 20 <= window.scrollY ) && ( Math.round(actual.offsetTop) + actual.offsetHeight + margin - 20 > window.scrollY ) ) {
        activeCategory.classList.add('selected');
      }else {
        activeCategory.classList.remove('selected');
      }
    });
  }
});
