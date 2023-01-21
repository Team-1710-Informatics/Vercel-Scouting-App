import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';

const client = new MongoClient(MONGODB);

