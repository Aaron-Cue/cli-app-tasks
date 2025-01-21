import { program } from 'commander'
import inquirer from 'inquirer'
import TaskModel from '../models/mongo.js'
import mongoose from 'mongoose'
import picolors from 'picocolors'
import chalk from 'chalk'

export function startCli() {
  // funcion que muestra la tabla de las tareas recibidas
  const showTasks = (tasks) => {
    console.table(
      tasks.map(({ _id, title, description, createdAt }) => ({
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
  }

  program
    .name('Tasks Cli')
    .description('cli app for personal task management')
    .version('1.0.0')

  program
    .command('save')
    .alias('s')
    .action(async () => {
      try {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: chalk.blue('Enter task title: '),
          },
          {
            type: 'input',
            name: 'description',
            message: chalk.blue('Enter task description: '),
          },
        ])

        const tasks = await TaskModel.saveTask({ task: answers })
        console.log(picolors.green(picolors.bold('Task saved successfully: ')))

        showTasks(tasks)
      } catch (error) {
        console.error('Error saving task: ', error)
      } finally {
        await mongoose.connection.close()
      }
    })

  program
    .command('list')
    .alias('ls')
    .option('-i, --id <id>', 'Show task by id')
    .option('-l, --limit <limit>', 'Limit the number of tasks shown')
    .action(async (options) => {
      // funcion para obtener las tareas segun options
      const getTasks = async (id, limit) => {
        if (id) {
          return await TaskModel.getTask({ id })
        } else {
          return await TaskModel.getTasks({ limit: limit })
        }
      }

      try {
        const tasks = await getTasks(options.id, options.limit)
        showTasks(tasks)
      } catch (error) {
        console.error('Error list tasks: ', error)
      } finally {
        await mongoose.connection.close()
      }
    })

  program
    .command('update')
    .alias('u')
    .action(async () => {
      try {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'id',
            message: chalk.green('Enter task id to update: '),
          },
          {
            type: 'input',
            name: 'title',
            message: chalk.blue('Enter new task title: '),
          },
          {
            type: 'input',
            name: 'description',
            message: chalk.blue('Enter new task description: '),
          },
        ])

        const task = await TaskModel.updateTask({
          task: answers,
          id: answers.id,
        })

        console.log(picolors.cyan('task updated successfully: '))
        showTasks(task)
      } catch (error) {
        console.error('Error updating task: ', error)
      } finally {
        await mongoose.connection.close()
      }
    })

  program
    .command('delete')
    .alias('d')
    .action(async () => {
      try {
        const id = await inquirer.prompt({
          type: 'input',
          name: 'id',
          message: chalk.red('Enter task id to delete: '),
        })

        const res = await TaskModel.deleteTask({ id })

        if (res.deletedCount >= 1)
          console.log(
            picolors.magenta(picolors.bold('Task deleted successfully'))
          )
        else console.log(picolors.red('Task not found'))
      } catch (error) {
        console.error('Error deleting task: ', error)
      } finally {
        await mongoose.connection.close()
      }
    })

  program.parse(process.argv)
}
