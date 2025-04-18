import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { ColorLegendComponent } from '../color-legend/color-legend.component';
import { HelptextComponent } from '../helptext/helptext.component';
import { QuoteComponent } from '../quote/quote.component';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../enum/task-status.enum';
import { TaskViewsComponent } from '../task-views/task-views.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskFormComponent, TaskDetailsComponent, ColorLegendComponent, HelptextComponent, QuoteComponent, TaskViewsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  isTaskFormOpen = false;
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  selectedTask: Task | null = null;

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  openTaskForm(): void {
    this.isTaskFormOpen = true;
  }

  closeTaskForm(): void {
    this.isTaskFormOpen = false;
  }

  openTaskDetails(task: Task): void {
    this.selectedTask = { ...task };
  }

  updateTask(updatedTask: Task): void {
    const updateTaskInColumn = (tasks: Task[]) => {
      const index = tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = updatedTask;
      }
    };

    updateTaskInColumn(this.todoTasks);
    updateTaskInColumn(this.inProgressTasks);
    updateTaskInColumn(this.doneTasks);

    this.saveTasksToLocalStorage();
    this.selectedTask = null;
  }

  closeTaskDetails(): void {
    this.selectedTask = null;
  }

  addTaskToTodoColumn(task: Task): void {
    this.todoTasks.push(task);
    this.saveTasksToLocalStorage();
    this.closeTaskForm();
  }

  deleteTask(task: Task): void {
    this.todoTasks = this.todoTasks.filter(t => t.id !== task.id);
    this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== task.id);
    this.doneTasks = this.doneTasks.filter(t => t.id !== task.id);
    this.saveTasksToLocalStorage();
  }

  onDragStart(event: DragEvent, task: Task): void {
    event.dataTransfer?.setData('task', JSON.stringify(task));
  }

  onDrop(event: DragEvent, targetColumn: string): void {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('task');
    if (taskData) {
      const task = JSON.parse(taskData);

      this.removeTaskFromColumn(task);

      task.status = targetColumn;
      if (targetColumn === TaskStatus.TODO) {
        this.todoTasks.push(task);
      } else if (targetColumn === TaskStatus.IN_PROGRESS) {
        this.inProgressTasks.push(task);
      } else if (targetColumn === TaskStatus.DONE) {
        this.doneTasks.push(task);
      }

      this.saveTasksToLocalStorage();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  removeTaskFromColumn(task: Task): void {
    this.todoTasks = this.todoTasks.filter(t => t.id !== task.id);
    this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== task.id);
    this.doneTasks = this.doneTasks.filter(t => t.id !== task.id);
  }

  saveTasksToLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const tasks = {
        todoTasks: this.todoTasks,
        inProgressTasks: this.inProgressTasks,
        doneTasks: this.doneTasks
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  
  loadTasksFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        const parsedTasks = JSON.parse(tasks);
        this.todoTasks = parsedTasks.todoTasks || [];
        this.inProgressTasks = parsedTasks.inProgressTasks || [];
        this.doneTasks = parsedTasks.doneTasks || [];
      }
    }
  }

  calculateEstimate(column: string): number{
    let totalEffort: number = 0;
    let tasksList: Task[] = [];

    if(column === TaskStatus.TODO){
      tasksList = this.todoTasks;
    }else if(column === TaskStatus.IN_PROGRESS){
      tasksList = this.inProgressTasks;
    }else if(column === TaskStatus.DONE){
      tasksList = this.doneTasks;
    }else{
      return 0;
    }

    for(let task in tasksList){
      totalEffort += tasksList[task].effortEstimate;
    }
    return totalEffort;
  }
}
