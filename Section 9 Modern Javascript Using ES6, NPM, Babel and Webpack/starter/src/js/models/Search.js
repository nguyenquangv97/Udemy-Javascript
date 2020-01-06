import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
	constructor(query) {
		this.query = query;
		console.log(query)
	}

	async getResult() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);

			this.result = res.data.recipes;
		} catch (error) {
			alert(error);
		}
	}
}
