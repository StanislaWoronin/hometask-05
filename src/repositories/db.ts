import * as dotenv from "dotenv";
dotenv.config()
import {MongoClient} from 'mongodb';
import {BlogType} from "../types/blogs-type";
import {PostType} from "../types/posts-type";
import {UserDBType} from "../types/user-type";

const mongoUri = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority';

const client = new MongoClient(mongoUri)
const db = client.db('blogsAndPostsDb')

export const blogsCollection = db.collection<BlogType>('blogs')
export const postsCollection = db.collection<PostType>('posts')
export const usersCollection = db.collection<UserDBType>('users')

export async function runDb() {
    try {

        await client.connect()
        await client.db('blogsAndPostsDb').command({ping: 1})
        console.log(`Connected successfully to mongo server: ${mongoUri}`)
    } catch {
        console.log('Can`t connect to db')
        await client.close()
    }
}