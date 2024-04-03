import { Request, Response } from "express";
import todo from "../models/todo";
import requestAuthentication from "../interfaces/authentication";


export const createTask = async (req: requestAuthentication, res: Response) => {
    try {
        const { name, email } = req.body;

        const todoTask = await todo.findOne({ name: name, email: email })

        if (todoTask) {
            return res.status(401).json({ error: 'This task is already present' });
        }

        const newTask = new todo({
            name,
            email
        })

        await newTask.save();
        return res.status(200).json({ message: 'Todo task added successfully', newTask });
    } catch (error) {
        console.error('Error in creatingTask:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

export const updateTask = async (req: requestAuthentication, res: Response) => {
    try {
        const { name, email, completed } = req.body;
        const todoTask = await todo.findOne({ name: name, email: email })
        if (!todoTask) {
            return res.status(401).json({ error: 'no todo task found of this name' });
        }
        todoTask.completed = completed
        await todoTask.save()
        return res.status(200).json({ message: 'Todo task updated successfully', todoTask });
    } catch (error) {
        console.error('Error in Updating task:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

export const deleteTask = async (req: requestAuthentication, res: Response) => {
    try {
        const { name, email } = req.body;
        if(!name){
            return res.status(401).json({ error: 'no task is provided' });
        }
        const todoTask = await todo.deleteOne({ name: name, email: email })

        return res.status(200).json({ message: 'Todo task deleted successfully', todoTask });
    } catch (error) {
        console.error('Error in deleting Task:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

export const getTask = async (req: requestAuthentication, res: Response) => {
    try {
        const { name, email } = req.body;
        if (name) {
            const todoTask = await todo.findOne({ name: name, email: email })
            return res.status(200).json(todoTask);
        }
        const todoTasks = await todo.find({ email: email })
        return res.status(200).json(todoTasks);
    } catch (error) {
        console.error('Error in getting tasks:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}