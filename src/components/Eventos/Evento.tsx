import './Evento.css'
import { useNavigate } from 'react-router-dom';

interface propTypes {
    _id: string,
    nombre: string,
    Numero: string,
    fecha: string,
    hora: string,
    sede: string,
    descripcion: string,
    maxEntradas: number,
}

export function Evento(props: propTypes) {
    const navigate = useNavigate();

    function handleReservas() {
        localStorage.setItem('eventId', props._id);
        localStorage.setItem('eventNombre', props.nombre);
        localStorage.setItem('eventNumero', props.Numero);
        localStorage.setItem('eventFecha', props.fecha);
        localStorage.setItem('eventHora', props.hora);
        localStorage.setItem('eventSede', props.sede);
        localStorage.setItem('eventMaxEntradas', props.maxEntradas.toString())
        localStorage.setItem('eventDescripcion', props.descripcion);
        navigate('/reservas');
    }

    return (
        <div className="evento">
            <div className="eventoText">
                <div className='columna1'>
                    <div className='eventoNombre'>{props.nombre} #{props.Numero}

                    </div>
                </div>
                <div className='columna2'>
                    <div className="fechaHorario">
                        <span className="Fecha">{props.fecha}</span>
                        <span className="Horario">{props.hora}</span>
                    </div>
                    <div className='sede'>{props.sede}</div>
                    <div className='descr'>{props.descripcion}</div>
                </div>
            </div>
            <button className='btnReserva' onClick={handleReservas}>Reservar Entradas</button>
        </div>
    )
}
