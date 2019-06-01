import React from 'react'
import { Grid, Row, Cell } from '@material/react-layout-grid'
import Button from '@material/react-button'
import IconButton, { IconToggle } from '@material/react-icon-button'
import Fab from '@material/react-fab'
import Card, {
	CardPrimaryContent,
	CardMedia,
	CardActions,
	CardActionButtons,
	CardActionIcons
} from '@material/react-card'
import { ChipSet, Chip } from '@material/react-chips'
import Dialog, {
	DialogTitle,
	DialogContent,
	DialogFooter,
	DialogButton,
} from '@material/react-dialog'
import MenuSurface, { Corner } from '@material/react-menu-surface'
import List, { ListItem, ListItemText, ListItemGraphic, ListItemMeta, ListDivider, ListGroup, ListGroupSubheader } from '@material/react-list'
import TextField, { HelperText, Input } from '@material/react-text-field'
import Select, { Option } from '@material/react-select'
import Radio, { NativeRadioControl } from '@material/react-radio'
import Checkbox from '@material/react-checkbox'
import Switch from '@material/react-switch'
import MaterialIcon from '@material/react-material-icon'
import {
	Body1,
	Body2,
	Caption,
	Headline1,
	Headline2,
	Headline3,
	Headline4,
	Headline5,
	Headline6,
	Overline,
	Subtitle1,
	Subtitle2
} from '@material/react-typography'
import LinearProgress from '@material/react-linear-progress'
import { Snackbar } from '@material/react-snackbar'
import Tab from '@material/react-tab'
import TabBar from '@material/react-tab-bar'
import TabScroller from '@material/react-tab-scroller'

import { MDCSlider } from '@material/slider'
import { MDCSelect } from '@material/select'

import ReactSelect from 'react-select'

require('./themer.css')

const image1 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg'
const image2 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/2x3/1.jpg'
const image3 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/2x3/3.jpg'
const image4 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/4.jpg'
const image5 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/5.jpg'
const image6 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/2x3/6.jpg'
const image7 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/7.jpg'
const image8 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/9.jpg'
const image9 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/2x3/8.jpg'
const image10 = 'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/10.jpg'

const select2Options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]

class Themer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedChoiceChipIds: ['chip1'],
			selectedFilterChipIds: ['chip1', 'chip2'],
			inputChips: [
				{ label: 'Jane Smith', id: 'janesmith' },
				{ label: 'John Doe', id: 'johndoe' }
			],
			inputChipsInput: '',
			alertOpen: false,
			alertAction: '',
			simpleOpen: false,
			simpleAction: '',
			scrollableOpen: false,
			scrollableAction: '',
			listSelectedIndex: -1,
			menu1Open: false,
			menu1AnchorElement: null,
			menu2Open: false,
			menu2Coordinates: null,
			slider1: null,
			slider2: null,
			slider3: null,
			snackbarOpen: false,
			switch1Checked: false,
			tabScroller: null,
			select1: null,
			select1Menu: null,
			rowWithSelect: true,
			expandSortable: Array(6).fill(false),
			arrForSort: Array(6).fill({
				title: "some title"
			}).map((i, idx) => ({ ...i, title: i.title + " " + idx}))
		}
		this.handleInputChipsKeyDown = this.handleInputChipsKeyDown.bind(this)
		this.setMenu1AnchorElement = this.setMenu1AnchorElement.bind(this)
		this.menu2OnClose = this.menu2OnClose.bind(this)
	}
	componentDidMount() {
		if (document){
			if (!this.state.slider1){
				this.setState({ slider1: MDCSlider.attachTo(document.querySelector('#slider1'))})
			}
			if (!this.state.slider2){
				this.setState({ slider2: MDCSlider.attachTo(document.querySelector('#slider2'))})
			}
			if (!this.state.slider3){
				this.setState({ slider3: MDCSlider.attachTo(document.querySelector('#slider3'))})
			}
			if (!this.state.select1){
				this.setState({ select1: MDCSelect.attachTo(document.querySelector('#select1'))})
			}
		}
	}
	handleInputChipsKeyDown(e){
		const label = this.state.inputChipsInput//e.target.value
		const chipLabels = this.state.inputChips.map(c => c.label)
		if (!!label && e.key === 'Enter' && chipLabels.indexOf(label) === -1) {
			const id = label.replace(/\s/g,'')
			const chips = [...this.state.inputChips]
			chips.push({ label, id })
			this.setState({ inputChips: chips, inputChipsInput: '' })
			//e.target.value = ''
		}
	}
	setMenu1AnchorElement(element){
		if (this.state.menu1AnchorElement) {
			return
		}
		this.setState({ menu1AnchorElement: element })
	}
	menu2OnClose(){
		this.setState({ menu2Open: false, menu2Coordinates: null })
	}
	generateAsciiChars(amount, offset, spaceAfter){
		amount = amount || 38
		offset = offset || 122
		spaceAfter = spaceAfter || 20
		let charCounter = 0
		let ascii = ''
		while (charCounter < amount){
			if (spaceAfter !== -1 && charCounter % spaceAfter === 0){
				ascii += ' '
			}
			charCounter++
			ascii += String.fromCharCode(offset + charCounter)
		}
		return ascii
	}
	render() {
		if (this.state.slider1){
			this.state.slider1.listen('MDCSlider:change', () => console.log('Slider1 value changed to ' + this.state.slider1.value))
		}
		if (this.state.slider2){
			this.state.slider2.listen('MDCSlider:change', () => console.log('Slider2 value changed to ' + this.state.slider2.value))
		}
		if (this.state.slider3){
			this.state.slider3.listen('MDCSlider:change', () => console.log('Slider3 value changed to ' + this.state.slider3.value))
		}
		return (
			<>
				<Grid>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>1. Tabs</h2>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>1.1 Simple</h3>
									<TabBar
										activeIndex={ this.state.tabs1ActiveIndex }
										handleActiveIndexUpdate={(tabs1ActiveIndex) => this.setState({ tabs1ActiveIndex }) }>
										<Tab>
											<span className="mdc-tab__text-label">One</span>
										</Tab>
										<Tab>
											<span className="mdc-tab__text-label">Two</span>
										</Tab>
										<Tab>
											<span className="mdc-tab__text-label">Three</span>
										</Tab>
									</TabBar>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>1.2 With Icon</h3>
									<TabBar
										activeIndex={ this.state.tabs2ActiveIndex }
										handleActiveIndexUpdate={(tabs2ActiveIndex) => this.setState({ tabs2ActiveIndex }) }>
										<Tab>
											<MaterialIcon className="mdc-tab__icon" icon="favorite"/>
											<span className="mdc-tab__text-label">One</span>
										</Tab>
										<Tab>
											<MaterialIcon className="mdc-tab__icon" icon="info"/>
											<span className="mdc-tab__text-label">Two</span>
										</Tab>
										<Tab>
											<MaterialIcon className="mdc-tab__icon" icon="star"/>
											<span className="mdc-tab__text-label">Three</span>
										</Tab>
									</TabBar>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>1.3 Custom Indicator</h3>
									<TabBar
										activeIndex={ this.state.tabs3ActiveIndex }
										handleActiveIndexUpdate={(tabs3ActiveIndex) => this.setState({ tabs3ActiveIndex }) }>
										<Tab indicatorContent={ <MaterialIcon className="no-margin" icon="star_outlined"/> }>
											<span className="mdc-tab__text-label">One</span>
										</Tab>
										<Tab indicatorContent={ <MaterialIcon className="no-margin" icon="star_outlined"/> }>
											<span className="mdc-tab__text-label">Two</span>
										</Tab>
										<Tab indicatorContent={ <MaterialIcon className="no-margin" icon="star_outlined"/> }>
											<span className="mdc-tab__text-label">Three</span>
										</Tab>
									</TabBar>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>1.4 Narrow (Minimal Width)</h3>
									<TabBar
										activeIndex={ this.state.tabs4ActiveIndex }
										handleActiveIndexUpdate={(tabs4ActiveIndex) => this.setState({ tabs4ActiveIndex }) }>
										<Tab minWidth={ true }>
											<MaterialIcon className="mdc-tab__icon" icon="favorite"/>
											<span className="mdc-tab__text-label">One</span>
										</Tab>
										<Tab minWidth={ true }>
											<MaterialIcon className="mdc-tab__icon" icon="info"/>
											<span className="mdc-tab__text-label">Two</span>
										</Tab>
										<Tab minWidth={ true }>
											<MaterialIcon className="mdc-tab__icon" icon="star"/>
											<span className="mdc-tab__text-label">Three</span>
										</Tab>
									</TabBar>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>1.5 Fading Indicator</h3>
									<TabBar
										activeIndex={ this.state.tabs5ActiveIndex }
										handleActiveIndexUpdate={(tabs5ActiveIndex) => this.setState({ tabs5ActiveIndex }) }>
										<Tab isFadingIndicator={ true }>
											<span className="mdc-tab__text-label">One</span>
										</Tab>
										<Tab isFadingIndicator={ true }>
											<span className="mdc-tab__text-label">Two</span>
										</Tab>
										<Tab isFadingIndicator={ true }>
											<span className="mdc-tab__text-label">Three</span>
										</Tab>
									</TabBar>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>1.6 Stacked</h3>
									<TabBar
										activeIndex={ this.state.tabs6ActiveIndex }
										handleActiveIndexUpdate={(tabs6ActiveIndex) => this.setState({ tabs6ActiveIndex }) }>
										<Tab stacked={ true }>
											<MaterialIcon className="mdc-tab__icon" icon="favorite"/>
											<span className="mdc-tab__text-label">One</span>
										</Tab>
										<Tab stacked={ true }>
											<MaterialIcon className="mdc-tab__icon" icon="info"/>
											<span className="mdc-tab__text-label">Two</span>
										</Tab>
										<Tab stacked={ true }>
											<MaterialIcon className="mdc-tab__icon" icon="star"/>
											<span className="mdc-tab__text-label">Three</span>
										</Tab>
									</TabBar>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h3>1.7 Scrollable</h3>
							<TabScroller>
								<TabBar
									activeIndex={ this.state.tabs7ActiveIndex }
									handleActiveIndexUpdate={(tabs7ActiveIndex) => this.setState({ tabs7ActiveIndex }) }>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="favorite"/>
										<span className="mdc-tab__text-label">One</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="info"/>
										<span className="mdc-tab__text-label">Two</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="star"/>
										<span className="mdc-tab__text-label">Three</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="favorite"/>
										<span className="mdc-tab__text-label">One</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="info"/>
										<span className="mdc-tab__text-label">Two</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="star"/>
										<span className="mdc-tab__text-label">Three</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="favorite"/>
										<span className="mdc-tab__text-label">One</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="info"/>
										<span className="mdc-tab__text-label">Two</span>
									</Tab>
									<Tab>
										<MaterialIcon className="mdc-tab__icon" icon="star"/>
										<span className="mdc-tab__text-label">Three</span>
									</Tab>
								</TabBar>
							</TabScroller>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>2. Typography</h2>
							<Row>
								<Cell columns={ 6 } tabletColumns={ 4 }>
									<h3>2.1 Classes</h3>
									<Headline1>Headline1</Headline1>
									<Headline2>Headline2</Headline2>
									<Headline3>Headline3</Headline3>
									<Headline4>Headline4</Headline4>
									<Headline5>Headline5</Headline5>
									<Headline6>Headline6</Headline6>
									<Subtitle1>Subtitle1</Subtitle1>
									<Subtitle2>Subtitle2</Subtitle2>
									<Body1>Body1</Body1>
									<Body2>Body2</Body2>
									<Caption>Caption</Caption><br/>
									<Overline>Overline</Overline>
								</Cell>
								<Cell columns={ 6 } tabletColumns={ 4 }>
									<h3>2.2 ASCII Support</h3>
									<h4>2.2.1 Basic Characters</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
									<p>0123456789</p>
									<p>{ this.generateAsciiChars(26, 64, -1)} { this.generateAsciiChars(26, 96, -1)}</p>
									{/*<p>{ this.generateAsciiChars(32, '0')}</p>*/}
									<p>{ this.generateAsciiChars(15, 32, -1)}{ this.generateAsciiChars(7, 57, -1)}{ this.generateAsciiChars(6, 90, -1)}{ this.generateAsciiChars(4, 122, -1)}</p>
									<h4>2.2.2 Extended Characters</h4>
									<p>{ this.generateAsciiChars(31, 160)}</p>
									<p>{ this.generateAsciiChars(191, 191)}</p>
									<p>{ this.generateAsciiChars(69, 382)}</p>
									<p>{ this.generateAsciiChars(9, 451)}</p>
									<p>{ this.generateAsciiChars(17, 460)}</p>
									<p>{ this.generateAsciiChars(100, 477)}</p>
									<p>{ this.generateAsciiChars(80, 901)}</p>
									<p>{ this.generateAsciiChars(89, 1030)}</p>
									<h4>2.2.3 Formatted Text</h4>
									<p><strong>Formatted</strong> <em>text</em> <u>example</u></p>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>3. Buttons</h2>
							<Row>
								<Cell columns={ 3 } tabletColumns={ 4 }>
									<h3>3.1 Normal</h3>
									<p><Button>Flat</Button></p>
									<p><Button outlined>Outlined</Button></p>
									<p><Button raised>Raised</Button></p>
									<p><Button unelevated>Unelevated</Button></p>
								</Cell>
								<Cell columns={ 3 } tabletColumns={ 4 }>
									<h3>3.2 Dense</h3>
									<p><Button dense>Flat</Button></p>
									<p><Button dense outlined>Outlined</Button></p>
									<p><Button dense raised>Raised</Button></p>
									<p><Button dense unelevated>Unelevated</Button></p>
								</Cell>
								<Cell columns={ 3 } tabletColumns={ 4 }>
									<h3>3.3 With Icon</h3>
									<p><Button icon={<MaterialIcon icon="star"/>}>Flat</Button></p>
									<p><Button outlined icon={<MaterialIcon icon="star"/>}>Outlined</Button></p>
									<p><Button raised icon={<MaterialIcon icon="star"/>}>Raised</Button></p>
									<p><Button unelevated icon={<MaterialIcon icon="star"/>}>Unelevated</Button></p>
								</Cell>
								<Cell columns={ 3 } tabletColumns={ 4 }>
									<h3>3.4 With Trailing Icon</h3>
									<p><Button trailingIcon={<MaterialIcon icon="favorite"/>}>Flat</Button></p>
									<p><Button outlined trailingIcon={<MaterialIcon icon="favorite"/>}>Outlined</Button></p>
									<p><Button raised trailingIcon={<MaterialIcon icon="favorite"/>}>Raised</Button></p>
									<p><Button unelevated trailingIcon={<MaterialIcon icon="favorite"/>}>Unelevated</Button></p>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>4. Cards</h2>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 8 }>
									<h3>4.1 Basic</h3>
									<Card>
										<CardPrimaryContent className="mdc-card__body">
											<Headline6>
												Our Changing Planet
											</Headline6>
											<Subtitle2>
												by Kurt Wagner
											</Subtitle2>
											<Body2>
												Visit ten places on our planet that are undergoing the biggest changes today.
											</Body2>
										</CardPrimaryContent>
									</Card>
									<h3>4.2 Compact</h3>
									<Card>
										<CardPrimaryContent className="mdc-card__row">
											<CardMedia square imageUrl="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg" style={{ flexBasis: '100px', height: '100px' }}/>
											<div className="mdc-card__body">
												<Headline6>
													Our Changing Planet
												</Headline6>
												<Subtitle2>
													by Kurt Wagner
												</Subtitle2>
												<Body2>
													Visit ten places on our planet that are undergoing the biggest changes today.
												</Body2>
											</div>
										</CardPrimaryContent>
										<CardActions>
											<CardActionButtons>
												<Button>Read</Button>
												<Button>Bookmark</Button>
											</CardActionButtons>
											<CardActionIcons>
												<IconButton>
													<MaterialIcon icon="favorite_border"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="share"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="more_vert"/>
												</IconButton>
											</CardActionIcons>
										</CardActions>
									</Card>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 8 }>
									<h3>4.3 Media Card with Actions</h3>
									<Card>
										<CardPrimaryContent>
											<CardMedia wide imageUrl="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"/>
											<div className="mdc-card__body">
												<Headline6>Our Changing Planet</Headline6>
												<Subtitle2>by Kurt Wagner</Subtitle2>
												<Body2>Visit ten places on our planet that are undergoing the biggest changes today.</Body2>
											</div>
										</CardPrimaryContent>
										<CardActions>
											<CardActionButtons>
												<Button>Read</Button>
												<Button>Bookmark</Button>
											</CardActionButtons>
											<CardActionIcons>
												<IconButton>
													<MaterialIcon icon="favorite_border"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="share"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="more_vert"/>
												</IconButton>
											</CardActionIcons>
										</CardActions>
									</Card>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 8 }>
									<h3>4.4 Media Card with Header</h3>
									<Card>
										<div className="mdc-card__body">
											<Headline6>
												Our Changing Planet
											</Headline6>
											<Subtitle2>
												by Kurt Wagner
											</Subtitle2>
										</div>
										<CardPrimaryContent>
											<CardMedia wide imageUrl="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"/>
											<Body2 className="mdc-card__body">
												Visit ten places on our planet that are undergoing the biggest changes today.
											</Body2>
										</CardPrimaryContent>
										<CardActions>
											<CardActionButtons>
												<Button>Read</Button>
												<Button>Bookmark</Button>
											</CardActionButtons>
											<CardActionIcons>
												<IconButton>
													<MaterialIcon icon="favorite_border"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="share"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="more_vert"/>
												</IconButton>
											</CardActionIcons>
										</CardActions>
									</Card>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 8 }>
									<h3>4.5 Text over Media</h3>
									<Card>
										<CardPrimaryContent>
											<CardMedia wide imageUrl="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg">
												<div className="mdc-card__body mdc-card__text-over-media">
													<Headline6>
														Our Changing Planet
													</Headline6>
													<Subtitle2>
														by Kurt Wagner
													</Subtitle2>
												</div>
											</CardMedia>
											<Body2 className="mdc-card__body">
												Visit ten places on our planet that are undergoing the biggest changes today.
											</Body2>
										</CardPrimaryContent>
										<CardActions>
											<CardActionButtons>
												<Button>Read</Button>
												<Button>Bookmark</Button>
											</CardActionButtons>
											<CardActionIcons>
												<IconButton>
													<MaterialIcon icon="favorite_border"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="share"/>
												</IconButton>
												<IconButton>
													<MaterialIcon icon="more_vert"/>
												</IconButton>
											</CardActionIcons>
										</CardActions>
									</Card>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>5. Chips</h2>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>5.1 Choice Chips (Single Selection)</h3>
									<ChipSet choice selectedChipIds={ this.state.selectedChoiceChipIds } handleSelect={(selectedChoiceChipIds) => this.setState({ selectedChoiceChipIds })}>
										<Chip id="chip1" label="Small"/>
										<Chip id="chip2" label="Medium"/>
										<Chip id="chip3" label="Large"/>
									</ChipSet>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>5.2 Filter Chips (Multi Selection)</h3>
									<ChipSet filter selectedChipIds={ this.state.selectedFilterChipIds } handleSelect={(selectedFilterChipIds) => this.setState({ selectedFilterChipIds })}>
										<Chip id="chip1" label="Tops"/>
										<Chip id="chip2" label="Bottoms"/>
										<Chip id="chip3" label="Shoes"/>
									</ChipSet>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>5.3 Input Chips</h3>
									<TextField label="Some Label" helperText={ <HelperText>Press "Enter" to add chip</HelperText> }
										onTrailingIconSelect={() => this.setState({ inputChipsInput: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }>
										<Input onKeyDown={ this.handleInputChipsKeyDown } value={ this.state.inputChipsInput } onChange={(e) => this.setState({ inputChipsInput: e.currentTarget.value })}/>
									</TextField>
									<ChipSet input updateChips={(inputChips) => this.setState({ inputChips })}>
									{ this.state.inputChips.map((chip) =>
										<Chip id={ chip.id } key={ chip.id } label={ chip.label } trailingIcon={ <MaterialIcon icon="cancel"/> }/>
									)}
									</ChipSet>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>5.4 With Leading Icon</h3>
									<ChipSet>
										<Chip id="chip1" label="Calendar" leadingIcon={ <MaterialIcon icon="event"/> }/>
										<Chip id="chip2" label="Bookmark" leadingIcon={ <MaterialIcon icon="bookmark"/> }/>
										<Chip id="chip3" label="Alarm" leadingIcon={ <MaterialIcon icon="alarm"/> }/>
									</ChipSet>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>5.5 With Trailing Icon</h3>
									<ChipSet>
										<Chip id="chip1" label="Calendar" trailingIcon={ <MaterialIcon icon="event"/> }/>
										<Chip id="chip2" label="Bookmark" trailingIcon={ <MaterialIcon icon="bookmark"/> }/>
										<Chip id="chip3" label="Alarm" trailingIcon={ <MaterialIcon icon="alarm"/> }/>
									</ChipSet>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>5.6 Custom Radius Chips</h3>
									<ChipSet className="radius-2">
										<Chip id="chip1" label="Calendar"/>
										<Chip id="chip2" label="Bookmark" trailingIcon={ <MaterialIcon icon="event"/> } leadingIcon={ <MaterialIcon icon="bookmark"/> }/>
										<Chip id="chip3" label="Alarm" trailingIcon={ <MaterialIcon icon="alarm"/> }/>
									</ChipSet>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell desktopColumns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>6. Dialogs</h2>
							<Button raised onClick={() => this.setState({ alertOpen: true })}>Alert</Button>
							{ <>&nbsp;</> }
							<Button raised onClick={() => this.setState({ simpleOpen: true })}>Confirm</Button>
							{ <>&nbsp;</> }
							<Button raised onClick={() => this.setState({ scrollableOpen: true })}>Scrollable</Button>
						</Cell>
					</Row>
					<Row>
						<Cell desktopColumns={ 6 } tabletColumns={ 4 } phoneColumns={ 4 }>
							<h2>7. Round Buttons & Fab</h2>
							<h3>7.1 Icon Buttons</h3>
							<IconButton>
								<MaterialIcon icon="share"/>
							</IconButton>
							<IconButton>
								<IconToggle isOn>
									<MaterialIcon icon="favorite"/>
								</IconToggle>
								<IconToggle>
									<MaterialIcon icon="favorite_border"/>
								</IconToggle>
							</IconButton>
							<IconButton>
								<MaterialIcon icon="more_vert"/>
							</IconButton>
						</Cell>
						<Cell desktopColumns={ 6 } tabletColumns={ 4 } phoneColumns={ 4 }>
							<h2>{ <>&nbsp;</> }</h2>
							<h3>7.2 Fab</h3>
							<Fab icon={ <MaterialIcon icon="favorite"/> }/>
							{ <>&nbsp;</> }
							<Fab textLabel="With Label" icon={ <MaterialIcon icon="search"/> }/>
							{ <>&nbsp;</> }
							<Fab mini icon={ <MaterialIcon icon="event"/> }/>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>8. Image List</h2>
							<h3>8.1 Standard Image List</h3>
							<ul className="mdc-image-list mdc-image-list--standard mdc-image-list--with-text-protection">
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image1 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 1</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image2 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 2</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image3 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 3</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image4 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 4</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image5 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 5</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image6 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 6</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image7 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 7</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image8 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 8</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image9 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 9</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<div className="mdc-image-list__image-aspect-container">
										<img alt="" className="mdc-image-list__image" src={ image10 }/>
									</div>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 10</span>
									</div>
								</li>
							</ul>
							<h3>8.2 Masonry Image List</h3>
							<ul className="mdc-image-list mdc-image-list--masonry">
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image1 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 1</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image2 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 2</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image3 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 3</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image4 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 4</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image5 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 5</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image6 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 6</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image7 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 7</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image8 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 8</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image9 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 9</span>
									</div>
								</li>
								<li className="mdc-image-list__item">
									<img alt="" className="mdc-image-list__image" src={ image10 }/>
									<div className="mdc-image-list__supporting">
										<span className="mdc-image-list__label">Text label 10</span>
									</div>
								</li>
							</ul>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>9. Linear Progress</h2>
							<h3>9.1 Standard</h3>
							<LinearProgress progress={ 0.6 }/>
							<br/>
							<LinearProgress progress={ 0.6 } buffer={ 1 }/>
							<h3>9.2 Buffered</h3>
							<LinearProgress progress={ 0.6 } buffer={ 0.8 } bufferingDots={ true }/>
							<h3>9.3 Indeterminate</h3>
							<LinearProgress indeterminate={ true } progress={ 0.6 } buffer={ 0.8 }/>
							<h3>9.4 Reversed</h3>
							<LinearProgress progress={ 0.6 } reversed={ true }/>
							<br/>
							<LinearProgress progress={ 0.6 } buffer={ 1 } reversed={ true }/>
							<h3>9.5 Reversed Buffered</h3>
							<LinearProgress progress={ 0.6 } buffer={ 0.8 } reversed={ true } bufferingDots={ true }/>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>10. List</h2>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.1 Standard</h3>
									<List className="bordered">
										<ListItem>
											<ListItemText primaryText="Item #1"/>
										</ListItem>
										<ListItem>
											<ListItemText primaryText="Item #2"/>
										</ListItem>
										<ListItem>
											<ListItemText primaryText="Item #3"/>
										</ListItem>
									</List>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.2 Two Line</h3>
									<List twoLine className="bordered">
										<ListItem>
											<ListItemText primaryText="Item #1" secondaryText="Item #1 additional info"/>
										</ListItem>
										<ListItem>
											<ListItemText primaryText="Item #2" secondaryText="Item #2 additional info"/>
										</ListItem>
										<ListItem>
											<ListItemText primaryText="Item #3" secondaryText="Item #3 additional info"/>
										</ListItem>
									</List>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.3 Leading Icon</h3>
									<List className="bordered">
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="star"/> }/>
											<ListItemText primaryText="Item #1"/>
										</ListItem>
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="send"/> }/>
											<ListItemText primaryText="Item #2"/>
										</ListItem>
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="wifi"/> }/>
											<ListItemText primaryText="Item #3"/>
										</ListItem>
									</List>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.4 Trailing Icon</h3>
									<List className="bordered">
										<ListItem>
											<ListItemText primaryText="Item #1"/>
											<ListItemMeta meta={ <MaterialIcon icon="info"/> }/>
										</ListItem>
										<ListItem>
											<ListItemText primaryText="Item #2"/>
											<ListItemMeta meta={ <MaterialIcon icon="info"/> }/>
										</ListItem>
										<ListItem>
											<ListItemText primaryText="Item #3"/>
											<ListItemMeta meta={ <MaterialIcon icon="info"/> }/>
										</ListItem>
									</List>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.5 Leading Checkbox</h3>
									<List
										className="bordered"
										selectedIndex={[]}>
										<label htmlFor="a1">
											<ListItem>
												<div className="mdc-list-item__graphic">
													<Checkbox nativeControlId="a1" checked={ false }/>
												</div>
												<ListItemText primaryText="Item #1"/>
											</ListItem>
										</label>
										<label htmlFor="a2">
											<ListItem>
												<div className="mdc-list-item__graphic">
													<Checkbox nativeControlId="a2" checked={ false }/>
												</div>
												<ListItemText primaryText="Item #2"/>
											</ListItem>
										</label>
										<label htmlFor="a3">
											<ListItem>
												<div className="mdc-list-item__graphic">
													<Checkbox nativeControlId="a3" checked={ false }/>
												</div>
												<ListItemText primaryText="Item #3"/>
											</ListItem>
										</label>
									</List>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.6 Trailing Checkbox</h3>
									<List
										className="bordered"
										selectedIndex={[]}>
										<label htmlFor="cb1">
											<ListItem>
												<ListItemText primaryText="Item #1"/>
												<ListItemMeta meta={ <Checkbox nativeControlId="cb1" checked={ false }/> }/>
											</ListItem>
										</label>
										<label htmlFor="cb2">
											<ListItem>
												<ListItemText primaryText="Item #2"/>
												<ListItemMeta meta={ <Checkbox nativeControlId="cb2" checked={ false }/> }/>
											</ListItem>
										</label>
										<label htmlFor="cb3">
											<ListItem>
												<ListItemText primaryText="Item #3"/>
												<ListItemMeta meta={ <Checkbox nativeControlId="cb3" checked={ false }/> }/>
											</ListItem>
										</label>
									</List>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.7 Leading Radio</h3>
									<List className="bordered">
										<label htmlFor="choice1">
											<ListItem>
												<div className="mdc-list-item__graphic">
													<Radio><NativeRadioControl id="choice1" name="radios1"/></Radio>
												</div>
												<ListItemText primaryText="Item #1"/>
											</ListItem>
										</label>
										<label htmlFor="choice2">
											<ListItem>
												<div className="mdc-list-item__graphic">
													<Radio><NativeRadioControl id="choice2" name="radios1"/></Radio>
												</div>
												<ListItemText primaryText="Item #2"/>
											</ListItem>
										</label>
										<label htmlFor="choice3">
											<ListItem>
												<div className="mdc-list-item__graphic">
													<Radio><NativeRadioControl id="choice3" name="radios1"/></Radio>
												</div>
												<ListItemText primaryText="Item #3"/>
											</ListItem>
										</label>
									</List>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.8 Trailing Radio</h3>
									<List className="bordered">
										<label htmlFor="aaa">
											<ListItem>
												<ListItemText primaryText="Item #3"/>
												<Radio wrapperClasses="mdc-list-item__meta"><NativeRadioControl id="aaa" name="radios2"/></Radio>
											</ListItem>
										</label>
										<label htmlFor="bbb">
											<ListItem>
												<ListItemText primaryText="Item #2"/>
												<Radio wrapperClasses="mdc-list-item__meta"><NativeRadioControl id="bbb" name="radios2"/></Radio>
											</ListItem>
										</label>
										<label htmlFor="ccc">
											<ListItem>
												<ListItemText primaryText="Item #3"/>
												<Radio wrapperClasses="mdc-list-item__meta"><NativeRadioControl id="ccc" name="radios2"/></Radio>
											</ListItem>
										</label>
									</List>
								</Cell>
							</Row>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.9 Single Selection</h3>
									<List className="bordered" singleSelection selectedIndex={ this.state.listSelectedIndex } handleSelect={(listSelectedIndex) => this.setState({ listSelectedIndex })}>
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="star"/> }/>
											<ListItemText primaryText="Item #1"/>
										</ListItem>
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="send"/> }/>
											<ListItemText primaryText="Item #2"/>
										</ListItem>
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="wifi"/> }/>
											<ListItemText primaryText="Item #3"/>
										</ListItem>
									</List>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>10.10 Group & Divider</h3>
									<List className="bordered">
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="star"/> }/>
											<ListItemText primaryText="Item #1"/>
										</ListItem>
										<ListDivider/>
										<ListItem>
											<ListItemGraphic graphic={ <MaterialIcon icon="send"/> }/>
											<ListItemText primaryText="Item #2"/>
										</ListItem>
										<ListGroup>
											<ListGroupSubheader>Group #1</ListGroupSubheader>
											<ListItem>
												<ListItemGraphic graphic={ <MaterialIcon icon="wifi"/> }/>
												<ListItemText primaryText="Item #3"/>
											</ListItem>
											<ListItem>
												<ListItemGraphic graphic={ <MaterialIcon icon="inbox"/> }/>
												<ListItemText primaryText="Item #4"/>
											</ListItem>
										</ListGroup>
										<ListGroup>
											<ListGroupSubheader>Group #2</ListGroupSubheader>
											<ListItem>
												<ListItemGraphic graphic={ <MaterialIcon icon="info"/> }/>
												<ListItemText primaryText="Item #5"/>
											</ListItem>
										</ListGroup>
									</List>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>11. Menu</h2>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>11.1 Anchored to Element</h3>
									<div className="mdc-menu-surface--anchor" ref={ this.setMenu1AnchorElement }>
										<Button raised onClick={() => this.setState({ menu1Open: true })}>Open Menu</Button>
										<MenuSurface
											open={ this.state.menu1Open }
											anchorCorner={ Corner.BOTTOM_LEFT }
											onClose={() => this.setState({ menu1Open: false })}
											anchorElement={ this.state.menu1AnchorElement }>
											<List>
												<ListItem>
													<ListItemGraphic graphic={ <MaterialIcon icon="star"/> }/>
													<ListItemText primaryText="Item #1"/>
												</ListItem>
												<ListItem>
													<ListItemGraphic graphic={ <MaterialIcon icon="send"/> }/>
													<ListItemText primaryText="Item #2"/>
												</ListItem>
												<ListItem>
													<ListItemGraphic graphic={ <MaterialIcon icon="wifi"/> }/>
													<ListItemText primaryText="Item #3"/>
												</ListItem>
											</List>
										</MenuSurface>
									</div>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h3>11.2 Anchored to mouse coordinates (web only)</h3>
									<div
										onContextMenu={(evt) => {
											evt.preventDefault()
											this.setState({
												menu2Open: true,
												menu2Coordinates: { x: evt.clientX, y: evt.clientY }
											})
										}}
										style={{ width: '100%', height: '40px', backgroundColor: '#ddd', border: '1px solid #ccc', textAlign: 'center', paddingTop: '20px' }}>
										Right-click somewhere in this box
									</div>
									<MenuSurface
										open={ this.state.menu2Open }
										onClose={ this.menu2OnClose }
										coordinates={ this.state.menu2Coordinates }>
										<List>
											<ListItem>
												<ListItemGraphic graphic={ <MaterialIcon icon="star"/> }/>
												<ListItemText primaryText="Item #1"/>
											</ListItem>
											<ListItem>
												<ListItemGraphic graphic={ <MaterialIcon icon="send"/> }/>
												<ListItemText primaryText="Item #2"/>
											</ListItem>
											<ListItem>
												<ListItemGraphic graphic={ <MaterialIcon icon="wifi"/> }/>
												<ListItemText primaryText="Item #3"/>
											</ListItem>
										</List>
									</MenuSurface>
								</Cell>
							</Row>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>12. Sliders</h2>
							<h3>12.1 Continuous Slider</h3>
							<div className="mdc-slider" id="slider1" tabIndex="0" role="slider"
								aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
								aria-label="Select Value">
								<div className="mdc-slider__track-container">
									<div className="mdc-slider__track"></div>
								</div>
								<div className="mdc-slider__thumb-container">
									<svg className="mdc-slider__thumb" width="21" height="21">
										<circle cx="10.5" cy="10.5" r="7.875"></circle>
									</svg>
									<div className="mdc-slider__focus-ring"></div>
								</div>
							</div>
							<h3>12.2 Discrete Slider</h3>
							<div className="mdc-slider mdc-slider--discrete" id="slider2" tabIndex="0" role="slider"
								aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
								aria-label="Select Value">
								<div className="mdc-slider__track-container">
									<div className="mdc-slider__track"></div>
								</div>
								<div className="mdc-slider__thumb-container">
									<div className="mdc-slider__pin">
										<span className="mdc-slider__pin-value-marker"></span>
									</div>
									<svg className="mdc-slider__thumb" width="21" height="21">
										<circle cx="10.5" cy="10.5" r="7.875"></circle>
									</svg>
									<div className="mdc-slider__focus-ring"></div>
								</div>
							</div>
							<h3>12.3 Discrete Slider with Markers</h3>
							<div className="mdc-slider mdc-slider--discrete mdc-slider--display-markers" id="slider3" tabIndex="0" role="slider"
								aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
								aria-label="Select Value">
								<div className="mdc-slider__track-container">
									<div className="mdc-slider__track"></div>
									<div className="mdc-slider__track-marker-container"></div>
								</div>
								<div className="mdc-slider__thumb-container">
									<div className="mdc-slider__pin">
										<span className="mdc-slider__pin-value-marker"></span>
									</div>
									<svg className="mdc-slider__thumb" width="21" height="21">
										<circle cx="10.5" cy="10.5" r="7.875"></circle>
									</svg>
									<div className="mdc-slider__focus-ring"></div>
								</div>
							</div>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>13. Snackbar</h2>
							<Button raised onClick={() => this.setState({ snackbarOpen: true })}>Show Snackbar</Button>
							{ this.state.snackbarOpen ? (
								<Snackbar message="Snackbar Message" actionText="Dismiss" onClose={() => this.setState({ snackbarOpen: false })}/>
							) : null }
							<h2>14. Switch</h2>
							<Switch
								nativeControlId="switch1"
								checked={ this.state.switch1Checked }
								onChange={(e) => this.setState({ switch1Checked: e.target.checked })}/>
							<label htmlFor="switch1"> { <>&nbsp;</> } { <>&nbsp;</> } Switch #1</label>
						</Cell>
					</Row>
					<Row>
						<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
							<h2>15 Form Elements</h2>
							<h3>15.1 Input</h3>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h4>15.1.1 Standard</h4>
									<TextField label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formInput1Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }>
										<Input value={ this.state.formInput1Value }
											onChange={(e) => this.setState({ formInput1Value: e.currentTarget.value })}/>
									</TextField>
									<h4>15.1.2 Dense</h4>
									<TextField dense={ true } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formInput2Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }>
										<Input value={ this.state.formInput2Value }
											onChange={(e) => this.setState({ formInput2Value: e.currentTarget.value })}/>
									</TextField>
									<h4>15.1.3 Full Width</h4>
									<TextField fullWidth={ true } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formInput3Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }>
										<Input value={ this.state.formInput3Value }
											onChange={(e) => this.setState({ formInput3Value: e.currentTarget.value })}/>
									</TextField>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h4>15.1.4 With Leading Icon</h4>
									<TextField label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formInput4Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }
										leadingIcon={ <MaterialIcon icon="mail"/> }>
										<Input value={ this.state.formInput4Value }
											onChange={(e) => this.setState({ formInput4Value: e.currentTarget.value })}/>
									</TextField>
									<h4>15.1.5 Outlined</h4>
									<TextField outlined={ true } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formInput5Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }>
										<Input value={ this.state.formInput5Value }
											onChange={(e) => this.setState({ formInput5Value: e.currentTarget.value })}/>
									</TextField>
									<h4>15.1.6 Outlined Dense with Leading Icon</h4>
									<TextField outlined={ true } dense={ true } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formInput6Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }
										leadingIcon={ <MaterialIcon icon="phone"/> }>
										<Input value={ this.state.formInput6Value }
											onChange={(e) => this.setState({ formInput6Value: e.currentTarget.value })}/>
									</TextField>
								</Cell>
							</Row>
							<h3>16.1 Textarea</h3>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h4>16.1.1 Standard</h4>
									<TextField textarea={ true } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formTextarea1Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }>
										<Input value={ this.state.formTextarea1Value }
											onChange={(e) => this.setState({ formTextarea1Value: e.currentTarget.value })}/>
									</TextField>
									<h4>16.1.2 Dense</h4>
									<TextField textarea={ true } dense={ true } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formTextarea2Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }>
										<Input value={ this.state.formTextarea2Value }
											onChange={(e) => this.setState({ formTextarea2Value: e.currentTarget.value })}/>
									</TextField>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h4>16.1.3 With Leading Icon</h4>
									<TextField textarea={ true } outlined={ false } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formTextarea3Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }
										leadingIcon={ <MaterialIcon icon="phone"/> }>
										<Input value={ this.state.formTextarea3Value }
											onChange={(e) => this.setState({ formTextarea3Value: e.currentTarget.value })}/>
									</TextField>
									<h4>16.1.4 Dense with Leading Icon</h4>
									<TextField textarea={ true } dense={ true } label="Label" helperText={ <HelperText>Helper Text</HelperText> }
										onTrailingIconSelect={() => this.setState({ formTextarea4Value: '' })}
										trailingIcon={ <MaterialIcon role="button" icon="delete"/> }
										leadingIcon={ <MaterialIcon icon="phone"/> }>
										<Input value={ this.state.formTextarea4Value }
											onChange={(e) => this.setState({ formTextarea4Value: e.currentTarget.value })}/>
									</TextField>
								</Cell>
							</Row>
							<h3>17.1 Select</h3>
							<Row>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h4>17.1.1 Standard</h4>
									{/* Instead of rendering option tags as children, you can provide "options" prop to element,
										an array of objects in the format [{ label: 'Option #1', value: 'option1'},...] */}
									<Select
										label="Choose Option..."
										value={ this.state.formSelect1Value }
										onChange={(evt) => this.setState({ formSelect1Value: evt.target.value })}>
										<Option value="" disabled></Option>
										<Option value="option1">Select Option #1</Option>
										<Option value="option2">Select Option #2</Option>
										<Option value="option3">Select Option #3</Option>
										<Option value="option4">Select Option #4</Option>
										<Option value="option5">Select Option #5</Option>
									</Select>
									<h4>17.1.2 Full Width</h4>
									<Select
										label="Choose Option..."
										className="full-width"
										value={ this.state.formSelect2Value }
										onChange={(evt) => this.setState({ formSelect2Value: evt.target.value })}>
										<Option value="" disabled></Option>
										<Option value="option1">Select Option #1</Option>
										<Option value="option2">Select Option #2</Option>
										<Option value="option3">Select Option #3</Option>
										<Option value="option4">Select Option #4</Option>
										<Option value="option5">Select Option #5</Option>
									</Select>
									<h4>17.1.3 Enhanced</h4>
									<h5>a) With MDC Foundation</h5>
									<div className="mdc-select" id="select1">
										<input type="hidden" name="enhanced-select"/>
										<i className="mdc-select__dropdown-icon"></i>
										<div className="mdc-select__selected-text">Vegetables</div>
										<div className="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
											<ul className="mdc-list">
												<li className="mdc-list-item" data-value=""></li>
												<li className="mdc-list-item" data-value="grains">
													Bread, Cereal, Rice, and Pasta
												</li>
												<li className="mdc-list-item mdc-list-item--selected" data-value="vegetables">
													Vegetables
												</li>
												<li className="mdc-list-item" data-value="fruit">
													Fruit
												</li>
											</ul>
										</div>
										<span className="mdc-floating-label mdc-floating-label--float-above">Pick a Food Group</span>
										<div className="mdc-line-ripple"></div>
									</div>
									<h5>b) With MDC React Select</h5>
									<Select
										enhanced
										label="Choose Option..."
										value={ this.state.formSelect3Value }
										onEnhancedChange={(index, item) => this.setState({ formSelect3Value: item.getAttribute('data-value')})}>
										<Option value="" disabled></Option>
										<Option value="option1">Bread, Cereal, Rice, and Pasta</Option>
										<Option value="option2">Vegetables</Option>
										<Option value="option3">Fruit</Option>
										<Option value="option4">Jam</Option>
										<Option value="option5">Junk Food</Option>
									</Select>
								</Cell>
								<Cell desktopColumns={ 6 } tabletColumns={ 4 }>
									<h4>17.1.4 Outlined</h4>
									<Select
										outlined={ true }
										label="Choose Option..."
										value={ this.state.formSelect4Value }
										onChange={(evt) => this.setState({ formSelect4Value: evt.target.value })}>
										<Option value="" disabled></Option>
										<Option value="option1">Select Option #1</Option>
										<Option value="option2">Select Option #2</Option>
										<Option value="option3">Select Option #3</Option>
										<Option value="option4">Select Option #4</Option>
										<Option value="option5">Select Option #5</Option>
									</Select>
									<h4>17.1.5 Full Width Outlined</h4>
									<Select
										outlined={ true }
										className="full-width"
										label="Choose Option..."
										value={ this.state.formSelect5Value }
										onChange={(evt) => this.setState({ formSelect5Value: evt.target.value })}>
										<Option value="" disabled></Option>
										<Option value="option1">Select Option #1</Option>
										<Option value="option2">Select Option #2</Option>
										<Option value="option3">Select Option #3</Option>
										<Option value="option4">Select Option #4</Option>
										<Option value="option5">Select Option #5</Option>
									</Select>
									<h4>17.1.6 Multiselect</h4>
									<h5>a) With Non-MDC, React-Select Component</h5>
									<ReactSelect
										className="basic-multi-select react-select-container"
										classNamePrefix="react-select"
										options={ select2Options }
										defaultValue={[select2Options[0], select2Options[2]]}
										isSearchable={ true }
										name="select2"
										placeholder="Choose Option..."
										isMulti/>
									<p>Above solution achieved using "react-select" component (<a href="https://react-select.com/" target="_blank" rel="noopener noreferrer">react-select.com</a>) and some custom css for visual approximation (no outlined version for now).</p>
								</Cell>
							</Row>
						</Cell>
					</Row>
				</Grid>

				<Dialog onClose={(alertAction: string) => this.setState({ alertOpen: false, alertAction })} open={ this.state.alertOpen }>
					<DialogContent>
						<p>Some info...</p>
					</DialogContent>
					<DialogFooter>
						<DialogButton action="close">OK</DialogButton>
					</DialogFooter>
				</Dialog>
				<Dialog onClose={(simpleAction: string) => this.setState({ simpleOpen: false, simpleAction })} open={ this.state.simpleOpen }>
					<DialogTitle>Some Title</DialogTitle>
					<DialogContent>
						<p>Some content...</p>
					</DialogContent>
					<DialogFooter>
						<DialogButton action="dismiss" isDefault>Cancel</DialogButton>
						<DialogButton action="confirm">Confirm</DialogButton>
					</DialogFooter>
				</Dialog>
				<Dialog onClose={(scrollableAction: string) => this.setState({ scrollableOpen: false, scrollableAction })} open={ this.state.scrollableOpen }>
					<DialogTitle>Some Title</DialogTitle>
					<DialogContent>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
					</DialogContent>
					<DialogFooter>
						<DialogButton action="decline" isDefault>Decline</DialogButton>
						<DialogButton action="accept">Accept</DialogButton>
					</DialogFooter>
				</Dialog>
			</>
		)
	}
}

export default Themer
