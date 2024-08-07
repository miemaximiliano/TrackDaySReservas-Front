import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Pages/Layout'
import { PrivateRoutes, PublicRoutes } from './components/Models/Routes'
import { AuthGuard } from './components/Guards/AuthGuard'

import Eventos from './components/Pages/Eventos'

import San_nicolas from './components/Sedes/San_Nicolas/San_Nicolas'
import Rosario from './components/Sedes/Rosario/Rosario'
import Preguntas from './components/Preguntas/Preguntas'
import Soporte from './components/Soporte/Soporte'

import LogIn from './components/Usuarios/LogIn'
import Register from './components/Usuarios/Register'
import Usuario from './components/Usuarios/Usuario'


import Tracks from './components/Pages/Tracks'

import MiCuenta from './components/Pages/MiCuenta'
import MisReservas from './components/Pages/MisReservas'

import Logout from './components/Pages/Logout'
import Reservas from './components/Pages/Reservas'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path={PublicRoutes.HOME} element={<Eventos />} />

						<Route path={PublicRoutes.Rosario} element={<Rosario />} />
						<Route path={PublicRoutes.San_Nicolas} element={<San_nicolas />} />
						<Route path={PublicRoutes.Preguntas} element={<Preguntas />} />
						<Route path={PublicRoutes.SOPORTE} element={<Soporte />} />

						<Route path={PublicRoutes.INGRESAR} element={<LogIn />} />
						<Route path={PublicRoutes.REGISTRARSE} element={<Register />} />

						<Route element={<AuthGuard />}>
							<Route path={PrivateRoutes.USUARIO} element={<Usuario />} />
							<Route path={PrivateRoutes.Tracks} element={<Tracks />} />
							<Route path={PrivateRoutes.RESERVAS} element={<Reservas />} />
							<Route path={PrivateRoutes.LOGOUT} element={<Logout />} />
							<Route path={PrivateRoutes.CUENTA} element={<MiCuenta />} />
							<Route path={PrivateRoutes.MISRESERVAS} element={<MisReservas />} />

						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
