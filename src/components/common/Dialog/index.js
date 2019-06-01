import React from 'react'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from '@material/react-dialog'
import { Grid, Row, Cell } from '../Grid'
import MaterialIcon from '@material/react-material-icon'
import Button from '@material/react-button'
import { connect } from 'react-redux'
import { stopEditing } from '../../../store/actions'
require('./dialog.css')

class DialogBase extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: this.props.open ? this.props.open : false,
			action: ''
		}
		this.deaultOnClose = this.deaultOnClose.bind(this)
	}
	componentDidUpdate() {
		if (this.props.open !== this.state.isOpen){
			this.setState({ isOpen: this.props.open })
		}
	}
	deaultOnClose(action: string) {
		this.setState({ isOpen: false, action })
		this.props.dispatch(stopEditing())
	}
	render() {
		const {
			mode,
			title,
			description,
			cancelLabel,
			confirmLabel,
			children,
			onClose,
			className,
			withDescription,
			onConfirm
		} = this.props
		return (
			<Dialog
				className={ className || '' }
				onClose={ onClose || this.deaultOnClose }
				open={ this.state.isOpen }
			>
				{/* header */}
				{( mode === 'modalForm' && withDescription ?
						<DialogTitle className="dialog-header">
							<Grid >
								<Row className="dialog-main-row">
									<Cell>
										<div className="dialog-title">{ title || null }</div>
										<div className="dialog-description">{ description || null }</div>
									</Cell>
									<Cell className="dialog-close">
										<MaterialIcon
											icon="close"
											className="material-icons md-28"
											onClick={ onClose || this.deaultOnClose }/>
										</Cell>
									</Row>
								</Grid>

						</DialogTitle>
							:
							<DialogTitle>{ title || '' }</DialogTitle>
				)}

				<DialogContent>
					{ children }
				</DialogContent>
				<DialogFooter>
					{mode === 'confirm' ? (
					<div>
						<DialogButton action="cancel">{ cancelLabel || 'Cancel' }</DialogButton>
						<DialogButton action="confirm" isDefault>{ confirmLabel || 'OK' }</DialogButton>
					</div>
					) :
					mode === 'modalForm' ? (
						<div>
							<Button data-mdc-dialog-action="close">{ cancelLabel || 'Cancel' }</Button>
							<Button
								raised
								onClick={ !onConfirm ? null : () => {
									onConfirm()
								}}
							>{ confirmLabel || 'OK' }</Button>
						</div>
					) :
					mode === 'alert' ? (
					<DialogButton action="close">{ confirmLabel || cancelLabel || 'OK' }</DialogButton>
					) : (
					<DialogButton action="close">{ confirmLabel || cancelLabel || 'OK' }</DialogButton>
					)}
				</DialogFooter>
			</Dialog>
		)
	}
}

const stateToProps = state => ({})
connect(stateToProps)(DialogBase)

export class Alert extends React.Component {
	render() {
		return (
			<DialogBase{ ...this.props } mode="alert"/>
		)
	}
}

export class Confirm extends React.Component {
	render() {
		return (
			<DialogBase{ ...this.props } mode="confirm"/>
		)
	}
}

export class Modal extends React.Component {
	render() {
		return (
			<DialogBase{ ...this.props } mode="modal"/>
		)
	}
}

export class ModalForm extends React.Component {
	render() {
		return (
			<DialogBase{ ...this.props } mode="modalForm"/>
		)
	}
}

export class ModalSet extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openChildren: []
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		let nextChildren = nextProps.children || []
		nextChildren = !nextChildren.forEach ? [ nextChildren ] : nextChildren
		nextChildren.forEach((child, index) => {
			if (child && child.props) {
				if (child.props.open && this.state.openChildren.indexOf(index) === -1){
					this.setState({ openChildren: [ ...this.state.openChildren, index ] })
				} else if (!child.props.open && this.state.openChildren.indexOf(index) !== -1){
					this.setState({ openChildren: this.state.openChildren.filter(i => i !== index) })
				}
			}
		})
		return true
	}
	render() {
		let children = this.props.children || [] //handle none children case
		children = !children.map ? [ children ] : children // handle only one children (in this case we got object not array)
		const modalSetChildren = children.map((child, index) => {
			if (!child || this.state.openChildren.indexOf(index) === -1){
				return child
			}
			return React.cloneElement(child, { className: 'offset' + this.state.openChildren.indexOf(index) + (child.props.className ? ' ' + child.props.className : ''), key: child.key || index })
		})
		return (
			<div className="modal-set">
				{ modalSetChildren }
			</div>
		)
	}
}
