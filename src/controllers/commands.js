import { program } from 'commander'
import inquirer from 'inquirer'
import TaskModel from '../models/mongo.js'

export function startCli() {
  program
    .name('Tasks Cli')
    .description('cli app for personal task management')
    .version('1.0.0')

  program.command('save').action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter task title: ',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter task description: ',
      },
    ])

    const taskFormatted = await TaskModel.saveTask({ task: answers })
    console.log('Task saved successfully: ')
    console.table(
      taskFormatted.map(({ _id, title, description, createdAt }) => ({
        _id: _id.toString(),
        title,
        description,
        createdAt: new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      }))
    )
  })

  program.command('list').action(async () => {
    const tasksFormatted = await TaskModel.getTasks()
    console.table(
      tasksFormatted.map(({ _id, title, description, createdAt }) => ({
        _id: _id.toString(),
        title,
        description,
        createdAt: new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      }))
    )
  })

  program.command('update').action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter task id to update: ',
      },
      {
        type: 'input',
        name: 'title',
        message: 'Enter new task title: ',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter new task description: ',
      },
    ])

    const res = await TaskModel.updateTask({ task: answers, id: answers.id })
    console.log('task updated successfully: ')
    console.table(
      res.map(({ _id, title, description, createdAt }) => ({
        _id: _id.toString(),
        title,
        description,
        createdAt: new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      }))
    )
  })

  program.command('delete').action(async () => {
    const id = await inquirer.prompt({
      type: 'input',
      name: 'id',
      message: 'Enter task id to delete: ',
    })

    const res = await TaskModel.deleteTask({ id })
    if (res.deletedCount >= 1) console.log('Task deleted successfully')
    else console.log('Task not found')
  })

  program.parse(process.argv)
}
