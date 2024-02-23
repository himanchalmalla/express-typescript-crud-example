import express from 'express';

import { getAllUser, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';


export default(router: express.Router) =>{
    router.get("/users", isAuthenticated,  getAllUser);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner, updateUser)
}