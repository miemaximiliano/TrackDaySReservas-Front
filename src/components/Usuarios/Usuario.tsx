import './Usuario.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateRoutes } from '../Models/Routes';

type User = {
	nombre: string,
	apellido: string,
	fechaNacimiento: Date,
	DNI: string,
	tel: string,
	email: string,
	admin?: boolean,
};

export default function Usuario() {

	const [showTracks, setShowTracks] = useState<boolean>();
	const [usuario, setUsuario] = useState<User>();
	const userMongoId = localStorage.getItem('idMongo');

	useEffect(() => {
		fetchUsuario();
	}, [])

	const fetchUsuario = () => {
		fetch(`http://localhost:3000/usuarios/${userMongoId}`)
			.then((response) => response.json())
			.then((response) => {
				setUsuario(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	useEffect(() => {
		if (usuario?.admin) {
			setShowTracks(true);
		} else {
			setShowTracks(true);
		}
	}, [usuario])

	return (
		<div className='contenidoUsuario'>
			<ul>
				<li><Link to={PrivateRoutes.CUENTA}>Mi Cuenta</Link></li>
				{showTracks && <li><Link to={PrivateRoutes.Tracks}>Tracks</Link></li>} 
				<li><Link to={PrivateRoutes.MISRESERVAS}>Mis Reservas</Link></li>
			</ul>
		</div>
	)
}
