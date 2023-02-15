import { MongoClient } from 'mongodb';
import { fail, redirect } from '@sveltejs/kit';

const client = new MongoClient(MONGODB);