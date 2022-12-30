/* eslint-disable no-unused-vars */
export function button(req) {
  return {
    type: 4,
    data: {
      content: 'Hello, World!',
    },
  };
}

export function button1(req) {
  return {
    type: 4,
    data: {
      content: 'You pressed button 1!',
    },
  };
}

export function button2(req) {
  return {
    type: 4,
    data: {
      content: 'You pressed button 2!',
    },
  };
}
