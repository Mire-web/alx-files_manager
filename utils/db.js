const MongoClient = require('mongodb').MongoClient;

class DBClient {
	constructor() {
		const host = process.env.DB_HOST || 'localhost';
		const port = process.env.DB_PORT || 27017;
		const dbName = process.env.DB_DATABASE || 'files_manager';
		const url = `mongodb://${host}:${port}`;
		const client = new MongoClient(url);
		client.connect();
		const db = client.db(dbName);
		const userCollection = db.collection('users');
		const filesCollection = db.collection('files');
	}

	isAlive() {
		this.client.on('connect', () => {return true});
		this.client.on('error', () => {return false});
	}

	async nbUsers() {
		const findResult = await this.userCollection.find({}).toArray();
		return findResult.length;
	}

	async nbFiles() {
		const result = await this.filesCollection.find({}).toArray();
		return result.length;
	}
}

const dbClient = new DBClient();
export default dbClient;
