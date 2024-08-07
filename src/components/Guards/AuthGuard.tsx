import { Navigate, Outlet } from 'react-router-dom'

import { PublicRoutes } from "../Models/Routes"

export const AuthGuard = () => {

	const token = localStorage.getItem('token');

	return (token) ? <Outlet /> : <Navigate replace to={PublicRoutes.HOME} />
}