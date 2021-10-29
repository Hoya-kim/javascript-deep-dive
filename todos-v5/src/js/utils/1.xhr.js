// callback pattern
// problem: hard to handling error exception
const req = (method, url, callback, payload) => {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      callback(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status, xhr.statusText);
    }
  };
};

const ajax = {
  get(url, callback) {
    req('GET', url, callback);
  },
  post(url, payload, callback) {
    req('POST', url, callback, payload);
  },
  patch(url, payload, callback) {
    req('PATCH', url, callback, payload);
  },
  delete(url, callback) {
    req('DELETE', url, callback);
  },
};

export default ajax;
