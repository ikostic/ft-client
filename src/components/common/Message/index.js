import React from 'react'
import './message.css'

const Message = ({ type, text }) => (
	<div className={ 'message message-' + type }>{ text }</div>
)

export default Message
