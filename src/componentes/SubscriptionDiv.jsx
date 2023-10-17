import React from 'react'
import '../hojas-de-estilos/SubscriptionDiv.css'

function SubscriptionDiv() {
  return (
    <div className='subscription-div py-5'>
        <div className='container text-light text-center'>
            <h2 className='subscription-title'>
                Unite a la tripulación
            </h2>
            <p className='subscription-p'>
                Suscribite a nuestro boletín para ser el primero en enterarte de nuevos lanzamientos y ofertas exclusivas.
            </p>

            <form className='form-inline'>
                <div class="form-group d-inline-block mb-2">
                    <input type="email" class="form-control rounded-pill formSub-text" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese su Email"/>
                </div>
                <button type="submit" class="btn btn-light mb-2 mx-3 d-inline-block rounded-pill formSub-text">Inscribirse</button>
            </form>

        </div>
    </div>
  )
}

export default SubscriptionDiv