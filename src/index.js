const installAttributes = (element, attrs) => {
  const newElement = element;

  Object.keys(attrs).map(
      (x) => {
          if (typeof (attrs[x]) !== 'object') {
              newElement[x] = attrs[x]
          } else {
              Object.keys(attrs[x]).map(
                  y => newElement[x][y] = attrs[x][y]
              )
          }
      }
  )

  return newElement;
}

const handleChildren = (children) => {
  const res = document.createDocumentFragment();

  if (Array.isArray(children)) {
      children.forEach(
          (el) => {
              res.appendChild(handleChildren(el));
          })
  } else if (children instanceof Element) {
      res.appendChild(children);
  } else if (typeof (children) === 'string') {
      res.appendChild(document.createTextNode(children));
  }

  return res;
}

const createElement = (type, attrs, children) => {
  let element = document.createElement(type);

  if (typeof (attrs) !== 'undefined') {
      element = installAttributes(element, attrs);
  }

  if (children !== 'undefined') {
      const с = handleChildren(children);
      element.appendChild(с);
  }

  return element;
}

const render = (reactElement, parent) => {
  parent.appendChild(reactElement);
}

const React = {
  createElement,
  render,
};


const app = React.createElement(
  'div',
  { style: { backgroundColor: 'red' } },
  [
      React.createElement('span', undefined, 'Hello world'),
      React.createElement('br'),
      'This is just a text node',
      React.createElement('div', { textContent: 'Text content' }),
  ],
);

React.render(app, document.getElementById('app'));