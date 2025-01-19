import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import Task from '../schemas/tasks.js'
import { MONGODB_URI } from '../config/config.js'

export async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URI)
  } catch (e) {
    console.error('Error connecting to the database: ', e)
  }
}

export default class TaskModel {
  static async saveTask({ task }) {
    try {
      const newTask = await Task.create(task)
      return [newTask]
    } catch (e) {
      console.error('Error saving task: ', e)
    }
  }

  static async getTasks({limit}) {
    try {
      if (limit) {
        const tasks = await Task.find().limit(limit)
        return tasks
      }
      const tasks = await Task.find()
      return tasks
    } catch (error) {
      console.error('Error list tasks: ', error)
    }
  }

  static async getTask({ id }) {
    try {
      id = id = new ObjectId(id)
      const task = await Task.findOne({ _id: id })
      return [task]
    } catch (error) {
      console.error('Error deleting task: ', error)
    }
  }

  static async updateTask({ id, task }) {
    const { title, description } = task
    id = new ObjectId(id)
    try {
      const res = await Task.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      ) 
      return [res]
    } catch (error) {
      console.error('Error updating task: ', error)
    }
  }

  static async deleteTask({ id }) {
    try {
      id = new ObjectId(id)
      const res = await Task.deleteOne({ _id: id })
      return res
    } catch (error) {
      console.error('Error deleting task: ', error)
    }
  }
}
