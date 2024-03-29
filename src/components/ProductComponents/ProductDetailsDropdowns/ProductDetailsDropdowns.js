import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './styles';

const ProductDetailsDropdowns = () => {
	const classes = useStyles();

	return (
		<>
			<Accordion className={classes.accordion}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading} variant="h6">
						Product Info
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className={classes.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion className={classes.accordion}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading} variant="h6">
						Return & Refund Policy
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className={classes.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion className={classes.accordion}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading} variant="h6">
						Shipping Info
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className={classes.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default ProductDetailsDropdowns;
