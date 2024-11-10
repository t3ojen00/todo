import { pool } from '../helpers/db.js';
import { Router } from 'express';
import { emptyOrRows } from '../helpers/utils.js';

const todoRouter = Router();

todoRouter.get('/', (req, res) => {
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            return next(error);
        }
        res.status(200).json(emptyOrRows(result));
    });
});


todoRouter.post('/create', (req,res) => {
    const pool = openDb()

    pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *',
        [req.body.description],
        (error, result) => {
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: result.rows[0].id})
        }
    )
})

todoRouter.delete('/delete/:id', (req, res) => {
    const pool = openDb()
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM task WHERE id = $1',
        [id],
        (error, result) => {
            if(error){
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: id})
        }
    )
})

export { todoRouter };