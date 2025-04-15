import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { ColorLegendComponent } from '../color-legend/color-legend.component';
import { TasksLeaderboardComponent } from '../tasks-leaderboard/tasks-leaderboard.component';
import { HelptextComponent } from '../helptext/helptext.component';
import { QuoteComponent } from '../quote/quote.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskFormComponent, TaskDetailsComponent, ColorLegendComponent, TasksLeaderboardComponent, HelptextComponent, QuoteComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  isTaskFormOpen = false;
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  selectedTask: any = null;

  ngOnInit(): void {
    this.loadTasksFromLocalStorage(); // Load tasks when the component initializes
  }

  openTaskForm(): void {
    this.isTaskFormOpen = true;
  }

  closeTaskForm(): void {
    this.isTaskFormOpen = false;
  }

  openTaskDetails(task: any): void {
    this.selectedTask = { ...task }; // Create a copy to avoid direct mutation
  }

  updateTask(updatedTask: any): void {
    const updateTaskInColumn = (tasks: any[]) => {
      const index = tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = updatedTask;
      }
    };

    updateTaskInColumn(this.todoTasks);
    updateTaskInColumn(this.inProgressTasks);
    updateTaskInColumn(this.doneTasks);

    this.saveTasksToLocalStorage(); // Save tasks after updating
    this.selectedTask = null;
  }

  closeTaskDetails(): void {
    this.selectedTask = null;
  }

  addTaskToTodoColumn(task: any): void {
    this.todoTasks.push(task);
    this.saveTasksToLocalStorage(); // Save tasks after adding
    this.closeTaskForm();
  }

  deleteTask(task: any): void {
    this.todoTasks = this.todoTasks.filter(t => t.id !== task.id);
    this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== task.id);
    this.doneTasks = this.doneTasks.filter(t => t.id !== task.id);
    this.saveTasksToLocalStorage(); // Save tasks after deletion
  }

  onDragStart(event: DragEvent, task: any): void {
    event.dataTransfer?.setData('task', JSON.stringify(task));
  }

  onDrop(event: DragEvent, targetColumn: string): void {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('task');
    if (taskData) {
      const task = JSON.parse(taskData);

      // Remove task from its current column
      this.removeTaskFromColumn(task);

      // Update task status and add to the target column
      task.status = targetColumn;
      if (targetColumn === 'TODO') {
        this.todoTasks.push(task);
      } else if (targetColumn === 'In Progress') {
        this.inProgressTasks.push(task);
      } else if (targetColumn === 'Done') {
        this.doneTasks.push(task);
      }

      this.saveTasksToLocalStorage(); // Save tasks after moving
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  removeTaskFromColumn(task: any): void {
    // Remove the task from all columns by matching the ID
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
    let tasksList: any[] = [];

    if(column === 'TODO'){
      tasksList = this.todoTasks;
    }else if(column === 'In Progress'){
      tasksList = this.inProgressTasks;
    }
    else if(column === 'Done'){
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
