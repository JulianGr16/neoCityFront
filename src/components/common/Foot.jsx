import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'

const Foot = () => {
    return (
        <footer className='container'>
            <section className='row py-4'>
                <article className='col-sm-12 col-md-4 fs-4'>
                    <h4>Redes Social</h4>
                   <div className='d-flex'>
                   <div className='ms-2'>
                   <i class="bi bi-instagram"></i>
                   </div>
                    <div className='mx-2'>
                    <i class="bi bi-linkedin"></i>
                    </div>
                    <div>
                    <i class="bi bi-facebook"></i>
                    </div>
                    <div className='ms-2'>
                    <i class="bi bi-twitter-x"></i>
                    </div>
                   </div>
                </article>
                <article className='col-sm-12 col-md-4 text-center'>
                    <h4>Preguntas Frecuentes</h4>
                    <ul className=' lista-preguntas'>
                        <li>¿Cómo puedo hacer una reserva?</li>
                        <li>¿Puedo cancelar o modificar mi reserva?</li>
                        <li>¿Cuáles son los horarios de check-in y check-out?</li>
                        <li>¿Se permite el ingreso de mascotas?</li>
                        <li>¿El hotel cuenta con estacionamiento?</li>
                    </ul>
                </article>
                <article className='col-sm-12 col-md-4'>
                    <h4>Estamos ubicados <i class="bi bi-geo-alt"></i></h4>
                </article>
            </section>
            <section className='text-center border-top'>
                <h6 className='mt-2'>TODOS LOS DERECHOS RESERVADOS</h6>
                
            </section>
        </footer>
    );
};

export default Foot;