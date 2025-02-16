import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductDetailsDropdowns = () => {
	return (
		<>
			<Accordion className="accordion">
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className="heading" variant="h6">
						Product Info
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion className="accordion">
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className="heading" variant="h6">
						Return & Refund Policy
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion className="accordion">
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className="heading" variant="h6">
						Shipping Info
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default ProductDetailsDropdowns;
