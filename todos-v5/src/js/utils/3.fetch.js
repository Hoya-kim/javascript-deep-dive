const parseToJSON = res => {
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

const ajax = {
  get(url) {
    return fetch(url).then(parseToJSON);
  },
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(parseToJSON);
  },
  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(parseToJSON);
  },
  delete(url) {
    return fetch(url, {
      method: 'DELETE',
    }).then(parseToJSON);
  },
};

export default ajax;
