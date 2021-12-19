'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//=================================================
//Smooth transition on click
//=================================================

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click' , function(e) {
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo(s1coords.left + window.pageXOffset , s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  //  });

  //better way
   section1.scrollIntoView({behavior : 'smooth'});
});


//=================================================
//Page navigation
//=================================================

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click' , function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   });
// });

document.querySelector('.nav__links').addEventListener('click' , function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});


//=================================================
//Page tab
//=================================================

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click' , function(e){
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;

  tabs.forEach((i) => {i.classList.remove('operations__tab--active')});

  tabContent.forEach((i) => {i.classList.remove('operations__content--active')});

  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});


//=================================================
//Nav Hover
//=================================================

const nav = document.querySelector('.nav');

const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( el => {
      if(el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//=================================================
//Sticky navbar
//=================================================

const navHeight = nav.getBoundingClientRect().height;

// window.addEventListener('scroll' , function(e){
//   if(window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const header = document.querySelector('.header');

const stickyNav = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav , {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);


//=================================================
//Fade In
//=================================================

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//=================================================
//Lazy loading
//=================================================

const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load' , function(e){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target)
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTarget.forEach((img) => {
  imgObserver.observe(img);
});


//=================================================
//Silder
//=================================================

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

//FUNCTIONS

//creating dots
const createDots = function() {
  slides.forEach(function(e, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
};


//activateDot
const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

//moving slides
const gotoSlide = function(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  });
}

//nextslide fucntion
const nextSlide = function() {
  if(curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  activateDot(curSlide);
}

//prevslide fucntion
const prevSlide = function() {
  if(curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
  activateDot(curSlide);
}

//initial function
const init = function() {
  //initital position of slides
  gotoSlide(0);
  //create dots
  createDots()
  //activating dots
  activateDot(0);
}
init();

//Event handler
btnRight.addEventListener('click' , nextSlide);
btnLeft.addEventListener('click' , prevSlide);

document.addEventListener('keydown' , function(e) {
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
})
