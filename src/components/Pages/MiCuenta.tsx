import './MiCuenta.css';
import { useEffect, useState } from 'react';

interface User {
	nombre: string;
	apellido: string;
	fechaNacimiento: string;
	dni: string;
	tel: string;
	email: string;
}

export default function MiCuenta() {
	const [usuario, setUsuario] = useState<User | null>(null);
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

	if (!usuario) {
		return <div>Cargando datos del usuario...</div>;
	}

	return (
		<div className="MiCuenta">
			<h1>Datos del Usuario</h1>
			
			<div>
				<label>Nombre: {usuario.nombre}</label>
			</div>

			<div>
				<label>Apellido: {usuario.apellido}</label>
			</div>

			<div>
				<label>Fecha de Nacimiento: {usuario.fechaNacimiento.toString().slice(0, 10)}</label>
			</div>

			<div>
				<label>DNI: {usuario.dni}</label>
			</div>

			<div>
				<label>Teléfono: {usuario.tel}</label>
			</div>

			<div>
				<label>Email: {usuario.email}</label>
			</div>
		</div>
	);
}
