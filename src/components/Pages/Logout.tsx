import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../../helpers/firebase';

export default function Logout() {
	const navigate = useNavigate();

	const handleLogOut = async () => {
		await signOut(auth);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('idMongo');
		localStorage.setItem('authUser', "false");
		navigate("/");
	};

	useEffect(() => {
		handleLogOut();
	}, [])

	return (
		<></>
	)
}
