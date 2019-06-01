import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import {
	SortableContainer,
	SortableElement,
	sortableHandle,
} from 'react-sortable-hoc'

export const DragHandle = sortableHandle((props) => {
	const { icon, onClick } = props
	return (
		<MaterialIcon
			icon={ icon || "drag_handle" }
			className={ "material-icons md-28 " }
			onClick={ onClick }/>
	)
})

export const SortableItem = SortableElement(({ value }) => value)

export const SortableList = SortableContainer(({items}) => {
	return (
		<span>
			{items.map((value, index) => (
				<SortableItem key={`item-${index}`} index={index} value={value} />
			))}
		</span>
	)
})
