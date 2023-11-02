import React from 'react'

function LoadSpinner(props) {
  return (
    <div className={`d-flex justify-content-center${props.center ? ' align-items-center' : ''}`} style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default LoadSpinner