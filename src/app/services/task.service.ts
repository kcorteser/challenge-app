import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8082/api/challenge/task'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }
  updateTask(taskId: number, isComplete: boolean): Observable<Task> {
    const url = `${this.apiUrl}`;
    const updatedTask = { id: taskId ,isComplete }; // Crear un objeto con la propiedad isComplete actualizada
    return this.http.put<Task>(url, updatedTask);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
