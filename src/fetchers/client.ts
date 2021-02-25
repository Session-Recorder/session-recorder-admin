import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://sebastianrcnt.iptime.org:3000",
});

export const fetcher = (url) => AxiosClient.get(url).then((res) => res.data);

export default AxiosClient;
