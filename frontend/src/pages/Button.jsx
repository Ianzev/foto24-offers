import React from 'react'

export default function Button({text, action}) {
  return (
    <div>
        <button onClick={action}>{text}</button>      
    </div>
  )
}
