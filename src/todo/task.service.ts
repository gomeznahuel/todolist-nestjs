import { NotFoundException, Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
  _tasks: TaskModel[] = [];

  findAllTasks(): TaskModel[] {
    return this._tasks;
  }

  findTaskById(id: number): TaskModel {
    return this._tasks.find((t) => t.id == id);
  }

  createTask(task: TaskModel): TaskModel {
    let newTask = new TaskModel();
    newTask.id = this._tasks.length + 1;
    newTask.description = task.description;
    this._tasks.push(newTask);
    return newTask;
  }

  updateTask(task: TaskModel): TaskModel {
    let index = this._tasks.findIndex((t) => t.id == task.id);
    if (index == -1) throw new NotFoundException(`Task with ID ${task.id} not found`);
    this._tasks[index] = task;
    return task;
  }

  deleteTask(id: number): TaskModel {
    let index = this._tasks.findIndex((t) => t.id == id);
    if (index == -1) throw new NotFoundException(`Task with ID ${id} not found`);
    let task = this._tasks[index];
    this._tasks.splice(index, 1);
    return task;
  }
}
