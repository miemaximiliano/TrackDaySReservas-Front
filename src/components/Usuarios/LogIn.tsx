import './Usuario.css';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../helpers/firebase';
import { Link, useNavigate } from 'react-router-dom';

type UserLogInForm = {
	email: string,
	contrasena: string,
};

export default function LogIn() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLogInForm>();

	const navigate = useNavigate();

	async function onSubmit(login: UserLogInForm) {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, login.email, login.contrasena);
			const user = userCredential.user;
			localStorage.setItem('token', (await user.getIdToken()).toString());
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('authUser', "true");

			await fetch(`http://localhost:3000/usuarios/email/${login.email}`)
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then(response => {
					localStorage.setItem('idMongo', response.data._id)
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
			navigate("/");
		}
		catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="LogIn">
			<h2>Log In</h2>
			<form className="formLogIn" onSubmit={handleSubmit(onSubmit)}>
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

				<input className="btnLogIn" type="submit" value="Log In" />
			</form>

			<div><Link to={'/registrarse'}>¿No tienes cuenta? ¡Registrate aquí!</Link></div>
		</div>
	);
}
