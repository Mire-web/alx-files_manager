import { MongoClient } from 'mongodb';

class DBClient {
	constructor() {
		this.host = process.env.DB_HOST || 'localhost';
		this.port = process.env.DB_PORT || 27017;
		this.dbName = process.env.DB_DATABASE || 'files_manager';
		this.url = `mongodb://${this.host}:${this.port}`;
		this.client = new MongoClient(this.url, { useUnifiedTopology: true });
		this.init();
	}

	async init() {
		try {
			await this.client.connect();
			console.log('database connected')
			this.db = this.client.db(this.dbName);
		} catch (error) {
			console.log(error);
		}
	}

	isAlive() {
		return this.client.isConnected();
	}

	async nbUsers() {
		if (!this.db) throw new Error('Database not Connected');
		const usersCollection = await this.db().collection('users');
		return usersCollection.countDocuments();
	}

	async nbFiles() {
		if (!this.db) throw new Error('Database not Connected');
		const filesCollection = await this.db().collection('files');
		return filesCollection.countDocuments();
	}
}

const dbClient = new DBClient();
export default dbClient;
