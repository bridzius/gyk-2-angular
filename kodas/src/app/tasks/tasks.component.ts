import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../types';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  taskai: Task[] = [];

  pridek() {
    this.taskai.push({
      text: 'Naujas taskas',
      date: new Date(),
    });
  }
}
