import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['name', 'description', 'expirationDate', 'isComplete', 'actions'];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.dataSource = new MatTableDataSource<Task>(this.tasks);
      console.log(tasks);
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId,).subscribe(() => {
      // If needed, you can also remove the deleted task from the local array to update the table
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.dataSource.data = this.tasks; // Update the MatTableDataSource with the new data
    });
  }

  updateTask(taskId: number, isComplete: boolean) {
    this.taskService.updateTask(taskId, !isComplete).subscribe(
      () => {
        // La solicitud PUT se realizó con éxito, ahora obtener la lista actualizada de tareas
        this.getTasks();
      },
      (error) => {
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }

  goToCreateTask() {
    this.router.navigate(['/task-form']); // Redirigir a la página de creación de tareas
  }

}
