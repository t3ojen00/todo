import { pool } from '../helpers/db.js';
import { Router } from 'express';
import { emptyOrRows } from '../helpers/utils.js';

const todoRouter = Router();

todoRouter.get('/', (req, res, next) => {
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            return next(error);
        }
        res.status(200).json(emptyOrRows(result));
    });
});


todoRouter.post('/create', (req, res) => {
    const { description } = req.body;

    console.log('Received data:', req.body);

    if (!description || typeof description !== 'string') {
        console.log('Description missing or invalid');
        return res.status(400).json({ error: 'Description is required and should be a string.' });
    }

    pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [description], (error, result) => {
        if (error) {
            console.error('Database error:', error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log('Task created:', result.rows[0]);
        return res.status(200).json({ id: result.rows[0].id });
    });
});

todoRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid task id.' });
    }

    pool.query('DELETE FROM task WHERE id = $1', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ id });
    });
});

export { todoRouter };