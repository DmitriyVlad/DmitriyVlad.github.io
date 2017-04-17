const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
const messages = {
  firstName: 'Укажите Имя',
  lastName: 'Укажите Фамилию',
  email: 'Укажите Email',
  emailMatch: 'Email невалидный'
};

function resetErrors() {
  const errors = document.querySelectorAll('.error-message');
  
  if (errors) {
    errors.forEach(elem => {
      const label = elem.parentNode.querySelector('label');
      const input = elem.parentNode.querySelector('input');

      input.classList.remove('error');
      label.classList.remove('error');
      label.style.marginBottom = '0.5rem';
      elem.remove();
    });
  }
}

function displayError(parent, message) {
  const msg = document.createElement('div');
  const label = parent.querySelector('label');
  const input = parent.querySelector('input');

  msg.className = 'error-message';
  msg.innerHTML = message;

  Object.assign(msg.style, {
    paddingLeft: '110px',
    color: 'red'
  });
  
  input.classList.add('error');
  label.classList.add('error');
  label.style.marginBottom = 0;
  parent.appendChild(msg);
}

function validate(elem, message) {
  displayError(elem.parentNode, message);
  elem.focus();
  return false;
}

function myForm(form) {
  const { elements: { firstName, lastName, email } } = form;
  
  resetErrors();

  if ( !firstName.value ) {
    return validate(firstName, messages.firstName);
  }

  if ( !lastName.value ) {
    return validate(lastName, messages.lastName);
  }

  if ( !email.value ) {
    return validate(email, messages.email);
  } else if ( !emailRegExp.test(email.value) ) {
    return validate(email, messages.emailMatch);
  }

  alert('Форма успешно отправлена');
  form.submit();
}
