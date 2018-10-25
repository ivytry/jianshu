import axios from 'axios';
import * as actionType from './actionType';

const login = (data) => ({
	type: actionType.LOGIN,
	login: data
})

export const logIn = (account, password) => {
	return (dispatch) => {
		axios.get("/api/login.json?account="+account+"&password="+password).then((res) => {
			const result = res.data.data;
			dispatch(login((account === result.account && result.password === password) ? true : false))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const logout = () => ({
	type: actionType.LOGOUT,
	login: false
})