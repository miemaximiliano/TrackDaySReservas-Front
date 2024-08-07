import './Modal.css'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface propTypes {
	onClose: () => void,
	trigger: () => void,
	data: data
};

type data = {
	id: string,
	nombre: string,
	Numero: string,
	fecha: string,
	hora: string,
	descripcion: string,
	sede: string,
	maxEntradas: number,
};

type TrackSubmitForm = {
	nombre: string,
	Numero: string,
	fecha: string,
	hora: string,
	descripcion: string,
	sede: string,
	maxEntradas: number,
};

export default function ModalEliminar(props: propTypes) {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TrackSubmitForm>();

	useEffect(() => {
		setValue("nombre", props.data.nombre);
		setValue("Numero", props.data.Numero);
		setValue("fecha", props.data.fecha);
		setValue("hora", props.data.hora);
		setValue("descripcion", props.data.descripcion);
		setValue("sede", props.data.sede);
		setValue("maxEntradas", props.data.maxEntradas);
	}, [])

	async function onSubmit(data: TrackSubmitForm) {
		try {
			const response = await fetch(`http://localhost:3000/eventos/${props.data.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			if (responseData.status === 200) {
				props.trigger();
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
		props.onClose();
	}

	return (
		<div className="modal">
			<div className="overlay"></div>
			<div className="formTrack">
				<div>¿Desea eliminar este Track de la lista?</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="label">Nombre</label>
						<input className="campo" type="text" placeholder="Nombre" {...register("nombre", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } },)} disabled />
						{errors.nombre && <span className="error">{errors?.nombre?.message}</span>}
					</div>
					<div>
						<label className="label">Numero</label>
						<input className="campo" type="text" placeholder="Numero" {...register("Numero", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} disabled />
						{errors.Numero && <span className="error">{errors?.Numero?.message}</span>}
					</div>
					<div>
						<label className="label">Fecha</label>
						<input className="campo" type="text" placeholder="Fecha" {...register("fecha", { required: "Este campo es requerido.", maxLength: { value: 10, message: "No debe ser mayor de 10 caracteres." } })} disabled />
						{errors.fecha && <span className="error">{errors?.fecha?.message}</span>}
					</div>
					<div>
						<label className="label">Hora</label>
						<input className="campo" type="text" placeholder="Hora" {...register("hora", { required: "Este campo es requerido.", maxLength: { value: 8, message: "No debe ser mayor de 8 caracteres." } })} disabled />
						{errors.hora && <span className="error">{errors?.hora?.message}</span>}
					</div>
					<div>
						<label className="label">Sede</label>
						<select className="campo" {...register("sede", { required: "Este campo es requerido." })} disabled >
							<option value="San Nicolas">San Nicolas</option>
							<option value="Rosario">Rosario</option>
						</select>
					</div>
					<div>
						<label className="label">Max Entradas</label>
						<input className="campo" type="number" placeholder="Max Entradas" {...register("maxEntradas", { required: "Este campo es requerido.", min: { value: 0, message: "No pueden ser menos de 10.000 personas." }, max: { value: 84000, message: "No pueden ser más de 84.000 personas." } })} disabled />
						{errors.maxEntradas && <span className="error">{errors?.maxEntradas?.message}</span>}
					</div>
					<div>
						<label className="label">Descripción</label>
						<textarea className="campo" {...register("descripcion", { required: "Este campo es requerido." })} disabled />
						{errors.descripcion && <span className="error">{errors?.descripcion?.message}</span>}
					</div>

					<input className="btnAceptar" type="submit" value="Eliminar" />
				</form>
				<button className="btnCancelar" onClick={props.onClose}>Cancelar</button>
			</div>
		</div>
	)
}