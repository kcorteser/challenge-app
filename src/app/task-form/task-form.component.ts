import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    name: '',
    description: '',
    expirationDate: null,
    isComplete: false
  };
  taskForm: FormGroup = new FormGroup({});
  constructor(private taskService: TaskService,private router: Router,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      expirationDate: ['', Validators.required],
      isComplete: [false]
    });
  }
  onSubmit() {
    if (this.taskForm.invalid) {
      // Si el formulario es inválido, no hacemos nada y mostramos los errores
      return;
    }

    const taskData = this.taskForm.value;

    this.taskService.createTask(taskData).subscribe(
      (createdTask) => {
        console.log('Tarea creada:', createdTask);
        this.router.navigate(['/task-list']);
      },
      (error) => {
        console.error('Error al crear la tarea:', error);
      }
    );
  }

}
