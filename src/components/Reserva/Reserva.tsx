import './Reserva.css';
import FotoSanNicolas from '../../assets/ReservasSanNicolas.png';
import FotoRosario from '../../assets/ReservasRosario.png';
import ModalAgregarReserva from '../Modal/ModalAgregarReserva';
import { useState } from 'react';

export default function Reserva() {
	const [showModal, setShowModal] = useState(false);

	const nombre = localStorage.getItem('eventNombre') || "";
	const fecha = localStorage.getItem('eventFecha') || "";
	const sede = localStorage.getItem('eventSede') || "";
	const idEvento = localStorage.getItem('eventId') || "";
	const idUsuario = localStorage.getItem('idMongo') || "";

	function toggleShowModal() {
		setShowModal(!showModal);
	}

	function reservar() {
		toggleShowModal();
	}

	return (
		<div className="reserva-contenedor">

			<h1>{nombre}</h1>
			<h2>{fecha}</h2>
			<h2>{sede}</h2>

			<h2>Seleccione una Ubicación</h2>
			<img className="imgMapa" src={sede === 'Rosario' ? FotoRosario : FotoSanNicolas} alt="imagenTrack " />

			{showModal && <ModalAgregarReserva
				nombre={nombre}
				fecha={fecha}
				sede={sede}
				zona={""}
				cantidad={0}
				idEvento={idEvento}
				idUsuario={idUsuario}
				onClose={toggleShowModal} />}

			<button className="btnReservar" onClick={reservar}>Reservar</button>
		</div>
	);
}
