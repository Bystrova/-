const toggleButton = document.querySelector('.main-nav__toggle');
const mainMenu = document.querySelector('.main-nav__list');
const pageMain = document.querySelector('.page-main');
const subMenu = mainMenu.querySelector('.main-nav__inner-list');
const menuItem = mainMenu.querySelector('.main-nav__link');

toggleButton.addEventListener('click', (evt) => {
  evt.preventDefault;
  if (!mainMenu.classList.contains('main-nav__list--active')) {
    mainMenu.classList.add('main-nav__list--active');
    pageMain.classList.add('page-main--shadow');
  } else {
    mainMenu.classList.remove('main-nav__list--active');
    pageMain.classList.remove('page-main--shadow');
  }
});

mainMenu.onclick = (evt) => {
  let target = evt.target;

  if (target.tagName === 'A' && target.nextElementSibling !== null) {
    if (!target.nextElementSibling.classList.contains('main-nav__inner-list--active')) {
      target.nextElementSibling.classList.add('main-nav__inner-list--active');
      target.classList.add('main-nav__link--active');
    } else {
      target.nextElementSibling.classList.remove('main-nav__inner-list--active');
      target.classList.remove('main-nav__link--active');
    }
  } else if (target.tagName === 'SPAN') {
    if (!target.parentElement.nextElementSibling.classList.contains('main-nav__inner-list--active')) {
      target.parentElement.nextElementSibling.classList.add('main-nav__inner-list--active');
      target.parentElement.classList.add('main-nav__link--active');
    } else {
      target.parentElement.nextElementSibling.classList.remove('main-nav__inner-list--active');
      target.parentElement.classList.remove('main-nav__link--active');
    }
  }
}