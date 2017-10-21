import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();
	api.use('/facets', facets({ config, db }));
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/aadhar/initiate-verification', (req, res) => {
		const params = req.body;
		console.log('params', params);
		res.json({ status: 'otp_sent'});
	});

	api.post('/aadhar/verify-otp', (req, res) => {
		const params = req.body;
		console.log('params', params);
		// if aadhar response is success call bank api to update customer details
		res.json({ status: 'success'});
	});
	return api;
}
