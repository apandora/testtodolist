const express = require('express');

const Todo = require('../models/todo');

const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {

    try {
        const [lastTodo] = await Todo.find().sort({ _id: -1 }).limit(1)

        const todo = new Todo({
            title: req.body.title,
            description: req.body.description ?? '',
            position: (lastTodo?.position ?? 0) + 1
        })

        const dataToSave = todo.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ _id: -1 })

        
        res.status(200).json(todos)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate({"_id": req.params.id}, {...req.body}, {new: true})
        
        res.status(200).json(todo)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;

