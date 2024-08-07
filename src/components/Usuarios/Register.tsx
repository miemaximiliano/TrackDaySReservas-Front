import './Usuario.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { auth } from '../../helpers/firebase';
import { Link, useNavigate } from 'react-router-dom';

type UserSubmitForm = {
	nombre: string,
	apellido: string,
	fechaNacimiento: Date,
	DNI: string,
	tel: string,
	email: string,
	contrasena: string,
	repetirContrasena: string
};

export default function Registro() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UserSubmitForm>();

	const contrasena = useRef({});
	contrasena.current = watch("contrasena", "");

	const navigate = useNavigate();

	async function onSubmit(data: UserSubmitForm) {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.contrasena);
			const user = userCredential.user;
			localStorage.setItem('token', (await user.getIdToken()).toString());
			localStorage.setItem('user', JSON.stringify(user));
		}
		catch (error) {
			console.error(error);
		}

		try {
			const response = await fetch("http://localhost:3000/usuarios", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			if (responseData.status === 201) {
				localStorage.setItem('idMongo', responseData.data._id)
				navigate("/");
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}

	return (
		<div className="registro">
			<h2>Registro</h2>
			<form className="formRegistro" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label className="label">Nombre</label>
					<input className="campo" type="text" placeholder="Nombre" {...register("nombre", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
					{errors.nombre && <span className="error">{errors?.nombre?.message}</span>}
				</div>
				<div>
					<label className="label">Apellido</label>
					<input className="campo" type="text" placeholder="Apellido" {...register("apellido", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
					{errors.apellido && <span className="error">{errors?.apellido?.message}</span>}
				</div>
				<div>
					<label className="label">Fecha de Nacimiento</label>
					<input className="campo" type="date" placeholder="Fecha de Nacimiento" {...register("fechaNacimiento", { required: "Este campo es requerido." })} />
					{errors.fechaNacimiento && <span className="error">{errors?.fechaNacimiento?.message}</span>}
				</div>
				<div>
					<label className="label">D.N.I.</label>
					<input className="campo" type="number" placeholder="D.N.I." {...register("DNI", { required: "Este campo es requerido.", min: { value: 10000000, message: "No debe ser menor de 8 caracteres." }, max: { value: 99999999, message: "No debe ser mayor de 8 caracteres." } })} />
					{errors.DNI && <span className="error">{errors?.DNI?.message}</span>}
				</div>

				<div>
					<label className="label">Teléfono</label>
					<input className="campo" type="text" placeholder="Teléfono" {...register("tel", {})} />
				</div>
				<div>
					<label className="label">Email</label>
					<input className="campo" type="email" placeholder="Email" {...register("email", { required: "Este campo es requerido." })} />
					{errors.email && <span className="error">{errors?.email?.message}</span>}
				</div>
				<div>
					<label className="label">Contraseña</label>
					<input className="campo" type="password" placeholder="Contraseña" {...register("contrasena", { required: "Este campo es requerido.", minLength: { value: 8, message: "No debe ser menor de 8 caracteres." }, maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
					{errors.contrasena && <span className="error">{errors?.contrasena?.message}</span>}
				</div>
				<div>
					<label className="label">Repetir Contraseña</label>
					<input className="campo" type="password" placeholder="Repetir Contraseña" {...register("repetirContrasena", { required: "Este campo es requerido.", minLength: { value: 8, message: "No debe ser menor de 8 caracteres." }, maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." }, validate: value => value === contrasena.current || "Las contraseñas son diferentes." })} />
					{errors.repetirContrasena && <span className="error">{errors?.repetirContrasena?.message}</span>}
				</div>

				<input className="btnRegistrarse" type="submit" value="Registrarse" />
			</form>

			<div><Link to={'/ingresar'}>¿Ya tienes cuenta? ¡Ingresa aquí!</Link></div>
		</div>
	);
}
