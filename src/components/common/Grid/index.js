import React from 'react'
import './grid.css'

export const Grid = (props) => (
	<div className={ 'grid' + (props.className ? ' ' + props.className : '')} onClick={ props.onClick || null } onContextMenu={ props.onContextMenu || null } data={ props.data || null }>{ props.children }</div>
)

export const Row = (props) => (
	<div className={ 'grid-row' + (props.className ? ' ' + props.className : '')} onClick={ props.onClick || null } onContextMenu={ props.onContextMenu || null } data={ props.data || null }>{ props.children }</div>
)

export const Cell = (props) => (
	<div className={ 'grid-cell' + (props.className ? ' ' + props.className : '')} onClick={ props.onClick || null } onContextMenu={ props.onContextMenu || null } data={ props.data || null }>{ props.children }</div>
)
