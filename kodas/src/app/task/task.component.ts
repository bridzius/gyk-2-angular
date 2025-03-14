import { Component, Input } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Task } from '../types';

@Component({
  selector: 'app-task',
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;
}
