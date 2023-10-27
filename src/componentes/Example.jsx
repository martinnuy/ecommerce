import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

function Example() {

    const infiniteTextValue = "👻 20% OFF CON EL CODIGO: OCTUBRE 👻";

  return (
    <div>
        <Nav />
        <h1>Example</h1>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />


        <Footer text={infiniteTextValue}/>
    </div>
  )
}

export default Example