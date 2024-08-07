import { useEffect, useState } from 'react';
import './Modal.css'
import { useForm } from 'react-hook-form';
import { PrivateRoutes } from '../Models/Routes';
import { useNavigate } from 'react-router-dom';

interface propTypes {
	nombre: string;
	fecha: string;
	sede: string;
	zona: string;
	cantidad: number;
	idEvento: string;
	idUsuario: string;
	onClose: () => void,
};

type ReservasSubmitForm = {
	nombre: string;
	fecha: string;
	sede: string;
	zona: string;
	cantidad: number;
	idEvento: string;
	idUsuario: string;
};

export default function ModalAgregar(props: propTypes) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ReservasSubmitForm>();
	const sede = localStorage.getItem('eventSede');
	const navigate = useNavigate();

	// Estado para controlar la selección de zona
	const [zona, setZona] = useState(props.zona);

	useEffect(() => {
		setValue("nombre", props.nombre);
		setValue("fecha", props.fecha);
		setValue("sede", props.sede);
		setValue("idEvento", props.idEvento);
		setValue("idUsuario", props.idUsuario);
		setZona(props.zona);

		if (props.zona === 'Zona 5') {
			setValue("cantidad", 1);
		}

	}, [props]);

	const handleZonaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedZona = event.target.value;
		setZona(selectedZona);

		if (selectedZona === 'Zona 5') {
			setValue("cantidad", 1);
		}
		if (selectedZona === 'Zona 5') {
			setValue("cantidad", 1);
		}
	};

	async function onSubmit(data: ReservasSubmitForm) {
		console.log(JSON.stringify(data))
		try {
			const response = await fetch("http://localhost:3000/reservas", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			if (responseData.status === 201) {
				props.onClose();
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
		navigate(PrivateRoutes.MISRESERVAS);
	}

	return (
		<div className="modal">
			<div className="overlay"></div>
			<div className="formTrack">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="label">Nombre</label>
						<input className="campo" type="text" placeholder="Nombre" {...register("nombre", { required: "Este campo es requerido.", maxLength: { value: 500, message: "No debe ser mayor de 50 caracteres." } })} disabled />
						{errors.nombre && <span className="error">{errors?.nombre?.message}</span>}
					</div>
					<div>
						<label className="label">Fecha</label>
						<input className="campo" type="text" placeholder="Fecha" {...register("fecha", { required: "Este campo es requerido.", maxLength: { value: 100, message: "No debe ser mayor de 10 caracteres." } })} disabled />
						{errors.fecha && <span className="error">{errors?.fecha?.message}</span>}
					</div>
					<div>
						<label className="label">Sede</label>
						<input className="campo" type="text" placeholder="Sede" {...register("sede", { required: "Este campo es requerido.", maxLength: { value: 100, message: "No debe ser mayor de 10 caracteres." } })} disabled />
						{errors.sede && <span className="error">{errors?.sede?.message}</span>}
					</div>
					<div className="combos">
						<p>Zona:</p>
						<select {...register("zona", { required: "Este campo es requerido." })} onChange={handleZonaChange}>
							{sede === 'Rosario' ? (
								<>
									<option value="Zona 1">Tribuna General</option>
									<option value="Zona 2">Tribuna Preferencial</option>
									<option value="Zona 3">Tribuna de Boxes</option>
									<option value="Zona 4">Zona de Acampe</option>
									<option value="Zona 5">Auto+Piloto+Boxes</option>
								</>
							) : (
								<>
									
									<option value="Zona 1">Tribuna General</option>
									<option value="Zona 3">Tribuna Preferencial</option>
									<option value="Zona 5">Auto+Piloto+Boxes</option>
								</>
							)}
						</select>
					</div>

					<div className="combos">
						<p>Cantidad:</p>
						<select {...register("cantidad", { required: "Este campo es requerido." })} disabled={zona === 'Zona 5'}>
							{[...Array(10).keys()].map(n => (
								<option key={n+1} value={n+1} disabled={zona === 'Zona 5' && n > 0}>{n+1}</option>
							))}
						</select>
					</div>

					<input className="hidden" type="text" {...register("idEvento", { required: "Este campo es requerido." })} disabled />
					<input className="hidden" type="text" {...register("idUsuario", { required: "Este campo es requerido." })} disabled />

					<input className="btnAceptar" type="submit" value="Agregar" />
				</form>
				<button className="btnCancelar" onClick={props.onClose}>Cancelar</button>
			</div>
		</div>
	);
}
