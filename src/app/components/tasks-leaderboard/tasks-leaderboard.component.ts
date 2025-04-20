import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelptextComponent } from '../helptext/helptext.component';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../enum/task-status.enum';
import { TaskRankingTypes } from '../../enum/task-ranking-types.enum';

@Component({
  selector: 'app-tasks-leaderboard',
  standalone: true,
  templateUrl: './tasks-leaderboard.component.html',
  styleUrl: './tasks-leaderboard.component.sass',
  imports: [CommonModule, HelptextComponent]
})
export class TasksLeaderboardComponent implements OnInit {
  @Input() todoTasks: Task[] = [];
  @Input() inProgressTasks: Task[] = [];
  @Input() doneTasks: Task[] = [];

  currentSort: string = TaskRankingTypes.DUE_DATE;

  ngOnInit(): void { 
    this.loadCurrentSortFromLocalStorage();
  }

  sortByDueDate(): void {
    this.currentSort = TaskRankingTypes.DUE_DATE;
    this.saveCurrentSortToLocalStorage();
  }

  sortByEstimateEffort(): void {
    this.currentSort = TaskRankingTypes.EFFORT_ESTIMATE;
    this.saveCurrentSortToLocalStorage();
  }

  getUrgentTasksByDueDate(): Task[] {
    const allTasks = [...this.todoTasks, ...this.inProgressTasks];
    const nonDoneTasks = allTasks.filter(task => task.status !== TaskStatus.DONE);
  
    return nonDoneTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  getUrgentTasksByEstimateEffort(): Task[] {
    const allTasks = [...this.todoTasks, ...this.inProgressTasks];
    const nonDoneTasks = allTasks.filter(task => task.status !== TaskStatus.DONE);
  
    return nonDoneTasks.sort((a, b) => b.effortEstimate - a.effortEstimate);
  }

  getTaskRanking(sort: string): Task[] {
    if (sort === TaskRankingTypes.DUE_DATE) {
      return this.getUrgentTasksByDueDate();
    } else if (sort === TaskRankingTypes.EFFORT_ESTIMATE) {
      return this.getUrgentTasksByEstimateEffort();
    }
    return [];
  }

  getTaskRankClass(index: number): string {
    if (index === 0) {
      return 'gold';
    } else if (index === 1) {
      return 'silver';
    } else if (index === 2) {
      return 'bronze';
    }
    return '';
  }

  saveCurrentSortToLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const currentSort = this.currentSort;
      localStorage.setItem('currentSort', JSON.stringify(currentSort));
    }
  }
  
  loadCurrentSortFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedSort = localStorage.getItem('currentSort');
      if (storedSort) {
        const parsedSort = JSON.parse(storedSort);
        this.currentSort = parsedSort;
      }
    }
  }

}
