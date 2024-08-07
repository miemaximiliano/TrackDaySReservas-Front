import './Modal.css'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface propTypes {
	onClose: () => void,
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

export default function ModalConsulta(props: propTypes) {
	const {
		register,
		setValue,
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

	return (
		<div className="modal">
			<div className="overlay"></div>
			<div className="formTrack">
				<form>
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
						<select name="cmbSedes">
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
						<textarea className="campo"  {...register("descripcion", { required: "Este campo es requerido." })} />
						{errors.descripcion && <span className="error">{errors?.descripcion?.message}</span>}
					</div>
				</form>
				<button className="btnCancelar" onClick={props.onClose}>Volver</button>
			</div>
		</div>
	)
}