"use server"
import User from '@/libs/models/user.model'
import { connect } from '@/libs/db'


export async function createUser(user) {
    try {
        await connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}