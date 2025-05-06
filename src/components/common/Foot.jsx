import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css'

const Foot = () => {
    return (
        <footer className='container-fluid bg-body-secondary'>
            <section className='row py-4 text-center'>
                <article className='col-sm-12 col-md-3 fs-4'>
                    <h4>Redes Social</h4>
                   <div className='d-flex justify-content-around'>
                   <div className='fs-3'>
                   <i class="bi bi-instagram"></i>
                   </div>
                    <div className='fs-3'>
                    <i class="bi bi-linkedin"></i>
                    </div>
                    <div className='fs-3'>
                    <i class="bi bi-facebook"></i>
                    </div>
                    <div className='fs-3'>
                    <i class="bi bi-twitter-x"></i>
                    </div>
                   </div>
                </article>
                <article className='col-sm-12 col-md-3 '>
                    <h4>Enlaces útiles</h4>
                    <div className=' lista-preguntas'>
                        <li>Política de privacidad</li>
                        <li>Términos y condiciones</li>
                        <li>Preguntas frecuentes</li>
                        <li></li>
                    </div>
                </article>
                <article className='col-sm-12 col-md-3'>
                    <h4>Servicios y amenities</h4>
                    <div className=' lista-preguntas'>
                        <li>Wifi grauito</li>
                        <li>Gimnasio</li>
                        <li>Piscina</li>
                        <li>Restaurante</li>
                    </div>
                </article>
                <article className='col-sm-12 col-md-3'>
                    <h4>Información del contacto</h4>
                    <div className=' lista-preguntas'>
                        <li>Dirección:Salta 78 - San Miguel de Tucuman</li>
                        <li>Teléfono:+5438155689</li>
                        <li>Correo electrónico:info@hotel.com</li>
                        <li>Restaurante</li>
                    </div>
                </article>
            </section>
            <section className='text-center  border-top border-black pb-2'>
                <h6 className='mt-2'>©TODOS LOS DERECHOS RESERVADOS</h6>
                
            </section>
        </footer>
    );
};

export default Foot;