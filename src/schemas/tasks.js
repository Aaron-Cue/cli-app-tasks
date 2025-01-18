import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
}, {
  collection: 'collectionTasks',
  timestamps: true,
  versionKey: false, 
})

const Task = mongoose.model('Task', taskSchema)
export default Task
