import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();
	api.use('/facets', facets({ config, db }));
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
