import './Pages.css';
import { useEffect, useState } from "react";
import ReservasRenglon from '../Reserva/ReservaRenglon';

interface reserva {
	_id: string,
	idUsuario: string;
	idEvento: string;
	nombre: string;
	fecha: string;
	sede: string;
	zona: string;
	cantidad: number;
}
export default function MisReservas() {
	const [reservas, setReservas] = useState<reserva[]>([]);


	const fetchEventos = () => {
		fetch("http://localhost:3000/reservas")
			.then((response) => response.json())
			.then((response) => {
				setReservas(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	useEffect(() => {
		fetchEventos();
	}, [])

	return (
		<div className='pagReservas'>
			<div className='reservasTitulo'>
				<h2>Mis Reservas</h2>
			</div>

			<div className="headerReservasRenglon">
				<div className="headerReservasNombre">Nombre</div>
				<div className="headerReservasFecha">Fecha</div>
				<div className="headerReservasSede">Sede</div>
				<div className="headerReservasZona">Zona</div>
				<div className="headerReservasCantidad">Cantidad</div>
				<div className='headerReservasAcciones'>Ver</div>
			</div>

			{reservas.map(reserva => (
				<ReservasRenglon
					key={reserva._id}
					idUsuario={reserva.idUsuario}
					idEvento={reserva.idEvento}
					nombre={reserva.nombre}
					fecha={reserva.fecha}
					sede={reserva.sede}
					zona={reserva.zona}
					cantidad={reserva.cantidad}
				/>
			))}
		</div>
	)
}
