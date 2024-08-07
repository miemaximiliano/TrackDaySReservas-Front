import './EventoRenglon.css'
import { useState } from 'react';
import ModalConsulta from '../Modal/ModalConsulta';
import ModalModificar from '../Modal/ModalModificar';
import ModalEliminar from '../Modal/ModalEliminar';

type RenglonData = {
	id: string,
	nombre: string,
	Numero: string,
	fecha: string,
	hora: string,
	descripcion: string,
	sede: string,
	maxEntradas: number,
	trigger: () => void,
}
export default function EventoRenglon(props: RenglonData) {
	const [consulta, setConsulta] = useState(false);
	const [modifica, setModifica] = useState(false);
	const [elimina, setElimina] = useState(false);

	function toggleConsutla() {
		setConsulta(!consulta);
	}

	function toggleModifica() {
		setModifica(!modifica);
	}

	function toggleElimina() {
		setElimina(!elimina);
	}

	return (
		<div className="renglon">
			<div className="renglonNombre">{props.nombre}</div>
			<div className="renglonNumero">{props.Numero}</div>
			<div className="renglonFecha">{props.fecha}</div>
			<div className="renglonHora">{props.hora}</div>
			<div className="renglonSede">{props.sede}</div>
			<div className="renglonMaxEntradas">{props.maxEntradas}</div>
			{/* <div className="renglonDescripcion">{props.descripcion}</div> */}

			<div className='botones'>
				<button className="btn" onClick={toggleConsutla}>🔍</button>
				{consulta && <ModalConsulta onClose={toggleConsutla} data={props} />}

				<button className="btn" onClick={toggleModifica}>✏️</button>
				{modifica && <ModalModificar onClose={toggleModifica} data={props} trigger={props.trigger} />}

				<button className="btn" onClick={toggleElimina}>🗑️</button>
				{elimina && <ModalEliminar onClose={toggleElimina} data={props} trigger={props.trigger} />}
			</div>
		</div>
	)
}
