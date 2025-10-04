const headerExpand = document.getElementById('nav-toggle');
const headerIcon = document.getElementById('nav-icon');
const nav = document.getElementById('nav');

let isOpen = false;

headerExpand.addEventListener('click', () => {

  nav.classList.toggle('show');
  isOpen = !isOpen;
  
  headerIcon.src = isOpen ? './images/close.png' : './images/burger.png';
  headerIcon.alt = isOpen ? 'close menu' : 'open menu';
});