import { pool } from '../helpers/db.js';
import { Router } from 'express';
import { hash,compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt

const userRouter = Router()

userRouter.post('/register', (req,res,next) => {
    hash(req.body.password,10,(error, hashedPassword) => {
        if (error) next (error)
        try{
            pool.query('INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *',
                [req.body.email,hashedPassword],
                (error,result)=>{
                    if (error) return next (error)
                        return res.status(201).json({id: result.rows[0].email})
                }
            )
        } catch (error){
            return next (error)
        }
    })
})

export { userRouter };