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

export default function ModalModificar(props: propTypes) {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TrackSubmitForm>();

	useEffect(() => {
		setValue("nombre", props.data.nombre, { shouldValidate: true });
		setValue("Numero", props.data.Numero, { shouldValidate: true });
		setValue("fecha", props.data.fecha, { shouldValidate: true });
		setValue("hora", props.data.hora, { shouldValidate: true });
		setValue("descripcion", props.data.descripcion, { shouldValidate: true });
		setValue("sede", props.data.sede, { shouldValidate: true });
		setValue("maxEntradas", props.data.maxEntradas, { shouldValidate: true });
	}, [])

	async function onSubmit(data: TrackSubmitForm) {
		try {
			const response = await fetch(`http://localhost:3000/eventos/${props.data.id}`, {
				method: 'PUT',
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="label">Nombre</label>
						<input className="campo" type="text" placeholder="Nombre" {...register("nombre", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
						{errors.nombre && <span className="error">{errors?.nombre?.message}</span>}
					</div>
					<div>
						<label className="label">Numero</label>
						<input className="campo" type="text" placeholder="Numero" {...register("Numero", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
						{errors.Numero && <span className="error">{errors?.Numero?.message}</span>}
					</div>
					<div>
						<label className="label">Fecha</label>
						<input className="campo" type="text" placeholder="Fecha" {...register("fecha", { required: "Este campo es requerido.", maxLength: { value: 10, message: "No debe ser mayor de 10 caracteres." } })} />
						{errors.fecha && <span className="error">{errors?.fecha?.message}</span>}
					</div>
					<div>
						<label className="label">Hora</label>
						<input className="campo" type="text" placeholder="Hora" {...register("hora", { required: "Este campo es requerido.", maxLength: { value: 8, message: "No debe ser mayor de 8 caracteres." } })} />
						{errors.hora && <span className="error">{errors?.hora?.message}</span>}
					</div>
					<div>
						<label className="label">Sede</label>
						<select className="campo" {...register("sede", { required: "Este campo es requerido." })}>
							<option value="San Nicolas">San Nicolas</option>
							<option value="Rosario">Rosario</option>
						</select>
					</div>
					
					<div>
						<label className="label">Max Entradas</label>
						<input className="campo" type="number" placeholder="Max Entradas" {...register("maxEntradas", { required: "Este campo es requerido.", min: { value: 500, message: "No pueden ser menos de 500 personas." }, max: { value: 40000, message: "No pueden ser más de 40.000 personas." } })} />
						{errors.maxEntradas && <span className="error">{errors?.maxEntradas?.message}</span>}
					</div>
					<div>
						<label className="label">Descripción</label>
						<textarea className="campo" {...register("descripcion", { required: "Este campo es requerido." })} />
						{errors.descripcion && <span className="error">{errors?.descripcion?.message}</span>}
					</div>

					<input className="btnAceptar" type="submit" value="Modificar" />
				</form>
				<button className="btnCancelar" onClick={props.onClose}>Cancelar</button>
			</div>
		</div>
	)
}