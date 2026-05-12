function setActive(el) {
  el.closest('.sec-subnav').querySelectorAll('.snav').forEach((b) => b.classList.remove('active'));
  el.classList.add('active');
}
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}
function toggleSub(id) {
  document.getElementById(id).classList.toggle('open');
}
