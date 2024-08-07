import './ReservaRenglon.css';
import { useState } from 'react';
import ModalConsultaReservas from '../Modal/ModalConsultaReservas';

type RenglonData = {
	idUsuario: string;
	idEvento: string;
	nombre: string;
	fecha: string;
	sede: string;
	zona: string;
	cantidad: number;
}
export default function ReservasRenglon(props: RenglonData) {
	const [consulta, setConsulta] = useState(false);

	function toggleConsutla() {
		setConsulta(!consulta);
	}

	return (
		<div className="renglonReserva">
			<div className="renglonReservaNombre">{props.nombre}</div>
			<div className="renglonReservaFecha">{props.fecha}</div>
			<div className="renglonReservaSede">{props.sede}</div>
			<div className="renglonReservaZona">{props.zona}</div>
			<div className="renglonReservasCantidad">{props.cantidad}</div>

			<div className='botonRenglonReserva'>
				<button className="" onClick={toggleConsutla}>🔍</button>
				{consulta && <ModalConsultaReservas onClose={toggleConsutla} data={props} />}

			</div>
		</div>
	)
}

