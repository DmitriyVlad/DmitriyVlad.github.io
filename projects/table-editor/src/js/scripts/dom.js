export function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    element[key] = props[key];
  });

  if (children.length > 0) {
    children.forEach(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        child = document.createTextNode(child);
      }

      element.appendChild(child);
    });
  }

  return element;
}

export function showError(errorText, node) {
  node.textContent = errorText;
}

export function clearError(node) {
  node.textContent = '';
}
