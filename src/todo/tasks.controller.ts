import { Body, Controller, Delete, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { TaskModel } from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  // Get all tasks
  @Get()
  getTasks() {
    return this.taskService.findAllTasks();
  }

  // Get a single task
  @Get(':taskId')
  getTaskById(@Param('taskId') id: number) {
    let task = this.taskService.findTaskById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // Create a new task
  @Post()
  createTask(@Body() task: TaskModel) {
    if (!task.description) throw new NotFoundException('Task description is required');
    return this.taskService.createTask(task);
  }

  // Update an existing task
  @Post(':taskId')
  updateTask(@Param('taskId') id: number, @Body() task: TaskModel) {
    if (!task.description) throw new NotFoundException('Task description is required');
    task.id = id;
    return this.taskService.updateTask(task);
  }

  // Delete an existing task
  @Delete(':taskId')
  deleteTask(@Param('taskId') id: number) {
    return this.taskService.deleteTask(id);
  }
}
