import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import rp from 'request-promise';

export default ({ config, db }) => {
	let api = Router();
	api.use('/facets', facets({ config, db }));
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/aadhar/initiate-verification', (req, res) => {
		const params = req.body;
		console.log('params', params);
		res.json({ status: 'otp_sent' });
	});

	api.post('/aadhar/verify-otp', (req, res) => {
		const params = req.body;
		console.log('params', params);
		// if aadhar response is success call bank api to update customer details
		res.json({ status: 'success' });
	});



	api.post('/bob/customer-details', (req, res) => {
		const params = req.body;
		const options = {
			method: 'POST',
			uri: 'http://104.211.176.248:8080/bob/bobuat/api/GetKYCDetails',
			body: req.body,
			resolveWithFullResponse: true,
			json: true,
			headers: {
				apikey: process.env.APIKEY
			}
		}
		rp(options).then((response) => {
			if (response.statusCode === 200) {
				res.status(response.statusCode).json({status: 'success', response: response.body[0]});
			} else {
				res.status(response.statusCode).json({status: 'error', response: {errorCode: response.ErrorCode , errorDescription: response.ErrorDescription}})
			}
		}).catch(err => {
			console.log(err);
			res.status(500).json({status: 'error', resposne: err})
		})
	});

	return api;
}
