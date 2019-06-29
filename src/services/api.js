import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
	baseURL: ''
});

api.interceptors.request.use(
	async config => {
		if (!config.headers.Authorization) {
			const token = await getToken();

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	},
	error => Promise.reject(error)
);

getToken = async() => {
	const userToken = await AsyncStorage.getItem('@Appinion:usuario');
	
	if(!userToken)
		return null;

	return JSON.parse(userToken).Token;
}

export default api;