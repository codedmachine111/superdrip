import React from 'react'
import './Button.css'

export const Button=(props)=> {
  return (
    <>
        <button type={props.type} onSubmit={props.onSubmit} onClick={props.onClick} id={props.id} className="btn-submit">{props.title} </button>
    </>
  )
}
