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

    TaskModel.saveTask({ task: answers })
  })

  program.command('list').action(async () => {
    TaskModel.getTasks()
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

    TaskModel.updateTask({ task: answers, id: answers.id })
  })

  program.command('delete').action(async () => {
    const id = await inquirer.prompt({
      type: 'input',
      name: 'id',
      message: 'Enter task id to delete: ',
    })

    TaskModel.deleteTask({ id })
  })

  program.parse(process.argv)
}
