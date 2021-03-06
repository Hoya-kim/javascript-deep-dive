// axios쓰면 굳이 이렇게 만들 이유가 없음
const ajax = {
  get(url) {
    return axios.get(url).then(({ data }) => data);
  },
  post(url, payload) {
    return axios.post(url, payload).then(({ data }) => data);
  },
  patch(url, payload) {
    return axios.patch(url, payload).then(({ data }) => data);
  },
  delete(url) {
    return axios.delete(url).then(({ data }) => data);
  },
};

export default ajax;
