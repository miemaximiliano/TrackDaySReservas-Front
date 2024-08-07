import './Rosario.css'
import FotoAutodromo from '../../../assets/AutodromoRosario.jpg'
import AutRosario from '../../../assets/AutRosario.png'

function Rosario() {
	return (
	<>
        <div className='Sede1'>
            <h2>Autodromo Rosario</h2>
            <img src={FotoAutodromo} alt="FotoRosario" />
            <h3>Acerca de</h3>
            <p>Ubicado en la ciudad de Rosario, Santa Fe, el Autódromo de Rosario es un circuito de carreras con una rica historia en el automovilismo argentino. Inaugurado en 1952, ha sido escenario de numerosas competiciones de alto nivel, incluyendo el Turismo Carretera, la Fórmula Renault y diversas categorías regionales y nacionales.

            Características del Circuito:

            Longitud: Aproximadamente 3.000 metros (3 kilómetros).
            Diseño: El circuito cuenta con una combinación de rectas largas y curvas desafiantes, lo que ofrece una experiencia emocionante tanto para pilotos profesionales como para entusiastas durante los track days.
            Recta Principal: Es una recta extensa que permite a los pilotos alcanzar altas velocidades antes de enfrentar las curvas técnicas que siguen.
            Curvas: Incluye una serie de curvas rápidas y lentas, que ponen a prueba la habilidad de los pilotos en términos de frenado y trazado.
            Infraestructura:

            Boxes: El autódromo dispone de un área de boxes bien equipada, permitiendo a los equipos trabajar en sus vehículos durante las pausas de las sesiones.
            Áreas de Espectadores: Hay gradas y zonas para que los espectadores disfruten de las competencias, con buena visibilidad de la pista.
            Servicios: Cuenta con instalaciones básicas como baños, una pequeña cafetería y estacionamiento.</p>
            <h3>Ubicacion</h3>
            Dirección: Avenida Circunvalación y Av. J. B. Justo, Rosario, Santa Fe, Argentina.

            <p>Se encuentra en la zona oeste de la ciudad de Rosario, a unos 15 kilómetros del centro de la ciudad. La ubicación es accesible desde varias arterias principales, facilitando el acceso para los participantes y espectadores.</p>
            <h3>Autodromo</h3>
            <img src={AutRosario} alt="AutodromoRosario" />
        </div>
	</>
	)
}

export default Rosario