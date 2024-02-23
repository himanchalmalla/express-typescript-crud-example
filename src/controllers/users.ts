import express from 'express';


import { getUser, getUserById, deleteUserById } from '../db/users';

export const getAllUser = async(req: express.Request, res: express.Response)=>{
    try {
        const user = await getUser();
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        const user = await getUserById(id);
        if (!user){
            return res.sendStatus(400);
        }

        const isUserDeleted = await deleteUserById(id)
        if(!isUserDeleted){
            return res.sendStatus(400)
        }
        return res.status(200).json(isUserDeleted);

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) =>{
    try {
        const { id } = req.params;
        const{ username } =req.body;
        if(!username){
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        if (!user){
            return res.sendStatus(400);
        }
        user.username=username;
        await user.save();
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}