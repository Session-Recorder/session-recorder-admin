import axios from "axios";

const AxiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

export const fetcher = (url) => AxiosClient.get(url).then((res) => res.data);

export default AxiosClient;
