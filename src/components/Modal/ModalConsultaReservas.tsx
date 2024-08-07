import './Modal.css'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface propTypes {
	onClose: () => void,
	data: data
};

type data = {
	nombre: string;
	fecha: string;
	sede: string;
	zona: string;
	cantidad: number;
};

type TrackSubmitForm = {
	nombre: string;
	fecha: string;
	sede: string;
	zona: string;
	cantidad: number;
};

export default function ModalConsulta(props: propTypes) {
	const {
		register,
		setValue,
		formState: { errors },
	} = useForm<TrackSubmitForm>();

	useEffect(() => {
		setValue("nombre", props.data.nombre);
		setValue("sede", props.data.sede);
		setValue("fecha", props.data.fecha);
		setValue("zona", props.data.zona);
		setValue("cantidad", props.data.cantidad);
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
						<input className="campo" type="text" placeholder="Sede" {...register("sede", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
						{errors.sede && <span className="error">{errors?.sede?.message}</span>}
					</div>
					<div>
						<label className="label">Fecha</label>
						<input className="campo" type="text" placeholder="Fecha" {...register("fecha", { required: "Este campo es requerido.", maxLength: { value: 10, message: "No debe ser mayor de 10 caracteres." } })} />
						{errors.fecha && <span className="error">{errors?.fecha?.message}</span>}
					</div>
					<div>
						<label className="label">Hora</label>
						<input className="campo" type="text" placeholder="Zona" {...register("zona", { required: "Este campo es requerido.", maxLength: { value: 8, message: "No debe ser mayor de 8 caracteres." } })} />
						{errors.zona && <span className="error">{errors?.zona?.message}</span>}
					</div>
					<div>
						<label className="label">Reservas</label>
						<input className="campo" type="number" placeholder="cantidad" {...register("cantidad", { required: "Este campo es requerido.", min: { value: 0, message: "No pueden ser negativas." }, max: { value: 40000, message: "No pueden superar la cantidad permitida." } })} />
						{errors.cantidad && <span className="error">{errors?.cantidad?.message}</span>}
					</div>
				</form>
				<button className="btnCancelar" onClick={props.onClose}>Volver</button>
			</div>
		</div>
	)
}