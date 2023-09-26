// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from
// 	'@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from
// 	'@mui/icons-material/KeyboardArrowUp';

// function createData(name, color, fuel, capacity, price) {
// 	return {
// 		name,
// 		color,
// 		fuel,
// 		capacity,
// 		price,
// 		history: [
// 			{
// 				date: '2020-01-05',
// 				customerId: '11091700',
// 				amount: 3,
// 			},
// 			{
// 				date: '2020-01-02',
// 				customerId: 'Anonymous',
// 				amount: 1,
// 			},
// 		],
// 	};
// }

// function Row(props) {
// 	const { row } = props;
// 	const [open, setOpen] = React.useState(false);

// 	return (
// 		<React.Fragment>
// 			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
// 				<TableCell>
// 					<IconButton
// 						aria-label="expand row"
// 						size="small"
// 						onClick={() => setOpen(!open)}
// 					>
// 						{open ? <KeyboardArrowUpIcon /> :
// 						<KeyboardArrowDownIcon />}
// 					</IconButton>
// 				</TableCell>
// 				<TableCell component="th" scope="row">
// 					{row.name}
// 				</TableCell>
// 				<TableCell align="right">{row.color}</TableCell>
// 				<TableCell align="right">{row.fuel}</TableCell>
// 				<TableCell align="right">{row.capacity}</TableCell>
// 				<TableCell align="right">{row.price}</TableCell>
// 			</TableRow>
// 			<TableRow>
// 				<TableCell style={{ paddingBottom: 0,
// 					paddingTop: 0 }} colSpan={6}>
// 					<Collapse in={open} timeout="auto" unmountOnExit>
// 						<Box sx={{ margin: 1 }}>
// 							<Typography variant="h6"
// 								gutterBottom component="div">
// 								History
// 							</Typography>
// 							<Table size="small"
// 								aria-label="purchases">
// 								<TableHead>
// 									<TableRow>
// 										<TableCell>
// 											Date
// 										</TableCell>
// 										<TableCell>
// 											Customer
// 										</TableCell>
// 										<TableCell align="right">
// 											Amount
// 										</TableCell>
// 										<TableCell align="right">
// 											Total price ($)
// 										</TableCell>
// 									</TableRow>
// 								</TableHead>
// 								<TableBody>
// 									{row.history.map
// 										((historyRow) => (
// 										<TableRow key=
// 											{historyRow.date}>
// 											<TableCell
// 												component="th"
// 												scope="row">
// 												{historyRow.date}
// 											</TableCell>
// 											<TableCell>
// 												{historyRow.customerId}
// 											</TableCell>
// 											<TableCell align="right">
// 												{historyRow.amount}
// 											</TableCell>
// 											<TableCell align="right">
// 												{Math.round
// 												(historyRow.amount
// 												* row.price * 100) / 100}
// 											</TableCell>
// 										</TableRow>
// 									))}
// 								</TableBody>
// 							</Table>
// 						</Box>
// 					</Collapse>
// 				</TableCell>
// 			</TableRow>
// 		</React.Fragment>
// 	);
// }

// Row.propTypes = {
// 	row: PropTypes.shape({
// 		color: PropTypes.string.isRequired,
// 		capacity: PropTypes.number.isRequired,
// 		fuel: PropTypes.string.isRequired,
// 		history: PropTypes.arrayOf(
// 			PropTypes.shape({
// 				amount: PropTypes.number.isRequired,
// 				customerId: PropTypes.string.isRequired,
// 				date: PropTypes.string.isRequired,
// 			}),
// 		).isRequired,
// 		name: PropTypes.string.isRequired,
// 		price: PropTypes.number.isRequired,
// 	}).isRequired,
// };

// const rows = [
// 	createData('TATA HARRIER', 'BLACK', 'DIESEL', 6, 1400000),
// 	createData('MAHINDRA THAR', 'RED', 'DIESEL', 4, 1600000),
// 	createData('MARUTI SWIFT', 'WHITE', 'PETROL', 5, 900000),
// 	createData('MG HECTOR', 'BLACK', 'PETROL', 5, 1800000),
// 	createData('MERCEDES GLS', 'WHITE', 'DIESEL', 5, 5200000),
// ];

// export default function CollapsibleTable() {
// 	return (
// 		<TableContainer component={Paper}>
// 			<Table aria-label="collapsible table">
// 				<TableHead>
// 					<TableRow>
// 						<TableCell />
// 						<TableCell>
// 							NAME
// 						</TableCell>
// 						<TableCell align="right">
// 							COLOR
// 						</TableCell>
// 						<TableCell align="right">
// 							FUEL
// 						</TableCell>
// 						<TableCell align="right">
// 							CAPACITY
// 						</TableCell>
// 						<TableCell align="right">
// 							PRICE(RS)
// 						</TableCell>
// 					</TableRow>
// 				</TableHead>
// 				<TableBody>
// 					{rows.map((row) => (
// 						<Row key={row.name} row={row} />
// 					))}
// 				</TableBody>
// 			</Table>
// 		</TableContainer>
// 	);
// }
