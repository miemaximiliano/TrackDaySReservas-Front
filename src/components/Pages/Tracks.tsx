import './Pages.css';
import { useEffect, useState } from "react";
import ModalAgregar from "../Modal/ModalAgregar";
import EventoRenglon from "../Eventos/EventoRenglon";

interface evento {
	_id: string,
	nombre: string,
	Numero: string,
	fecha: string,
	hora: string,
	descripcion: string,
	sede: string,
	maxEntradas: number,
}
export default function Tracks() {
	const [showModal, setShowModal] = useState(false);
	const [eventos, setEventos] = useState<evento[]>([]);

	function toggleShowModal() {
		setShowModal(!showModal);
	}

	const fetchEventos = () => {
		fetch("http://localhost:3000/eventos")
			.then((response) => response.json())
			.then((response) => {
				setEventos(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	useEffect(() => {
		fetchEventos();
	}, [])

	function agregar() {
		toggleShowModal();
	}

	return (
		<div className='pagTracks'>
			<div className='TracksTitulo'>
				<h2>Tracks</h2>
				<button className="btnAgregar" onClick={agregar}>➕</button>
			</div>
			{showModal && <ModalAgregar onClose={toggleShowModal} trigger={fetchEventos} />}

			<div className="headerRenglon">
				<div className="headerNombre">Nombre</div>
				<div className="headerNumero">Numero</div>
				<div className="headerFecha">Fecha</div>
				<div className="headerHora">Hora</div>
				{/* <div className="headerDescripcion">Descripción</div> */}
				<div className="headerSede">Sede</div>
				<div className="headerMaxEntradas">Max Entradas</div>
				<div className='headerAcciones'>Acciones</div>
			</div>

			{eventos.map(evento => (
				<EventoRenglon
					key={evento._id}
					id={evento._id}
					nombre={evento.nombre}
					Numero={evento.Numero}
					fecha={evento.fecha}
					hora={evento.hora}
					descripcion={evento.descripcion}
					sede={evento.sede}
					maxEntradas={evento.maxEntradas}
					trigger={fetchEventos} />
			))}
		</div>
	)
}
