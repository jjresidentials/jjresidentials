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

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const phone = form.querySelector('#contact-phone').value.trim();
    const message = form.querySelector('#contact-message').value.trim();
    const services = [...form.querySelectorAll('input[name="services"]:checked')]
      .map((el) => el.value)
      .join(', ') || 'Not specified';

    const body = [
      'Name: ' + name,
      'Email: ' + email,
      'Phone: ' + phone,
      'Desired Services: ' + services,
      '',
      'Message:',
      message || '(none)'
    ].join('\n');

    const subject = encodeURIComponent('Website contact — ' + name);
    const mailBody = encodeURIComponent(body);
    window.location.href = 'mailto:info@jjconstructionassociates.com?subject=' + subject + '&body=' + mailBody;
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
