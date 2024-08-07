import React, { useState } from 'react';
import './Soporte.css'

const Soporte: React.FC = () => {
    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        mail: '',
        telefono: '',
        dni: '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailData = {
            nombre: formulario.nombre,
            apellido: formulario.apellido,
            mail: formulario.mail,
            telefono: formulario.telefono,
            dni: formulario.dni,
            asunto: formulario.asunto,
            mensaje: formulario.mensaje
        };
        console.log('Enviando correo electrónico a la empresa:', emailData);
    };

    return (
        <div className='Soporte'>
            <h2>Soporte</h2>
            <form onSubmit={handleSubmit}>
                <div className='Renglon'>
                    <label>Nombre: </label>
                    <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                </div>
                <div className='Renglon'>
                    <label>Apellido: </label>
                    <input type="text" name="apellido" value={formulario.apellido} onChange={handleChange} required />
                </div>
                <div className='Renglon'>
                    <label>Email: </label>
                    <input type="email" name="mail" value={formulario.mail} onChange={handleChange} required />
                </div>
                <div className='Renglon'>
                    <label>Teléfono: </label>
                    <input type="tel" name="telefono" value={formulario.telefono} onChange={handleChange} required />
                </div>
                <div className='Renglon'>
                    <label>DNI: </label>
                    <input type="text" name="dni" value={formulario.dni} onChange={handleChange} required />
                </div>
                <div className='Renglon'>
                    <label>Asunto: </label>
                    <input type="text" name="asunto" value={formulario.asunto} onChange={handleChange} required />
                </div>
                <div className='Renglon'>
                    <label>Mensaje: </label>
                    <textarea name="mensaje" value={formulario.mensaje} onChange={handleChange} required />
                </div>
                <button className='btnMandar' type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Soporte;
