import React from 'react'
import { Grid, Row, Cell } from '@material/react-layout-grid'

class Dashboard extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
						Dashboard placeholder...
					</Cell>
				</Row>
			</Grid>
		)
	}
}

export default Dashboard
