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

  static async getTasks() {
    try {
      const tasks = await Task.find()
      return tasks
    } catch (error) {
      console.error('Error list tasks: ', error)
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
    id = new ObjectId(id)
    try {
      const res = await Task.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      ) // busca por id, actualiza y devuelve
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

// 678c4ea66201767e299748f6