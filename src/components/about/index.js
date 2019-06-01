import React from 'react'
import { Grid, Row, Cell } from '@material/react-layout-grid'

class About extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
						About placeholder...
					</Cell>
				</Row>
			</Grid>
		)
	}
}

export default About
