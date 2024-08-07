import './San_Nicolas.css'
import Foto_San_Nicolas from '../../../assets/San_Nicolas.jpg'
import San_Nicolas from '../../../assets/SanNicolasAccesos.png'

function San_nicolas() {
	return (
	<>
        <div className='Sede1'>
            <h2>San Nicolas</h2>
            <img src={Foto_San_Nicolas} alt="Foto_San_Nicolas" />
            <h3>Acerca de</h3>
            <p>El Autódromo San Nicolás es un circuito de competiciones de deporte motor ubicado en las afueras de la ciudad de San Nicolás de los Arroyos, Buenos Aires, Argentina. Se encuentra en el kilómetro 225 de la Autopista Buenos Aires- Rosario y fue inaugurado el 7 de octubre de 2018 con una competencia de Súper TC 2000</p>
            <h3>Ubicacion</h3>
            Mendoza San Nicolás de Los Arroyos Buenos Aires AR, Estanislao del Campo y, B2902 ECF
            <h3>Autodromo</h3>
            <img src={San_Nicolas} alt="SanNicolasAccesos" />
        </div>
	</>
	)
}

export default San_nicolas