import './Header.css';
import logo from "../../assets/TrackDays.svg";
import img from "../../assets/img.svg";
import DropDown from '../DropDown/DropDown';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Header() {
	const sedes = ["Rosario", "San_Nicolas"];
	const opcionesGuest = ["Ingresar", "Registrarse"];
	const opcionesAuthUser = ["LogOut"];
	const [showAuthDropDown, setAuthDropDown] = useState(false);

	function tokenCheck() {
		const token = localStorage.getItem('token');
		if (token) {
			setAuthDropDown(true)
		}
		else {
			setAuthDropDown(false);
		}
	}

	useEffect(() => {
		tokenCheck();
	}, [])

	return (
		<>
			<header className="">
				<img className="logo" src={logo} alt="LogoTrackDays"></img>
				<nav className="">
					<ul>
						<li><Link to={"/"}>Eventos de Trackday</Link></li>
						<li><DropDown btnClass="btnSedes" text="Sedes" img="" imgClass="" options={sedes} panelClass="sedesDropDown" /></li>
						<li><Link to={"/Preguntas"}>Preguntas</Link></li>
						<li><Link to={"/Soporte"}>Soporte</Link></li>
						<li><Link to={"/Usuario"}>Administrar Usuario</Link></li>
					</ul>
				</nav>
				<div onClick={tokenCheck} className="usuario">
					{(!showAuthDropDown) && <DropDown btnClass='btnUsuario' text="" img={img} imgClass='imgUsuario' options={opcionesGuest} panelClass="usuarioDropDown" />}
					{showAuthDropDown && <DropDown btnClass='btnUsuario' text="" img={img} imgClass='imgUsuario' options={opcionesAuthUser} panelClass="usuarioDropDown" />}
				</div>
			</header>
			<div className='divider'></div>
		</>
	)
}
