import mongoose from 'mongoose'
import Task from '../schemas/tasks.js'
import {MONGODB_URI} from '../config/config.js'

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
      await Task.create(task)
      console.log('Task saved')
    } catch (e) {
      console.error('Error saving task: ', e)
    }
  }

  static async getTasks() {
    try {
      const tasks = await Task.find()
      console.log(tasks)
    } catch (error) {
      console.error('Error deleting task: ', error)
    }
  }

  static async getTask({ id }) {
    try {
      const task = await Task.findOne({ id })
      console.log(task)
    } catch (error) {
      console.error('Error deleting task: ', error)
    }
  }

  static async updateTask({ id, task }) {
    const { title, description } = task
    id = new mongoose.Schema.Types.ObjectId(id)
    try {
      await Task.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      ) // busca por id, actualiza y devuelve

    } catch (error) {
      console.error('Error updating task: ', error)
    }
    console.log('Task updated', task)
  }

  static async deleteTask({ id }) {
    try {
      await Task.findByIdAndDelete(new mongoose.Schema.Types.ObjectId(id))
      console.log('Task deleted')
    } catch (error) {
      console.error('Error deleting task: ', error)
    }
  }
}
