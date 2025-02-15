import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from 'src/app/Models/Tasks/tasks';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = `${environment.apiUrl}/tasks`; 

  token:any = localStorage.getItem('token');
  httpOptions: { headers: any, body: any };

  constructor(private httpClient : HttpClient) { }

  getLocalStorage() : void {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
      body: null
    };
  }

  getTasks(): Observable<Tasks[]> {
    this.getLocalStorage();
    return this.httpClient.get<Tasks[]>(`${this.baseUrl}/index`, this.httpOptions);
  }

  storeTasks(tasks: Tasks): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post<Tasks>(`${this.baseUrl}/store`, tasks, this.httpOptions);
  }

  editTasks(id:number): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.get<Tasks>(`${this.baseUrl}/edit/${id}`, this.httpOptions);
  }
  

  updateTasks(id:number, tasks: Tasks): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.put<Tasks>(`${this.baseUrl}/update/${id}`, tasks, this.httpOptions);
  }

  deleteTasks(id:number): Observable<Object> {
    this.getLocalStorage();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions);
  }

  completeTasks(id:number): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.put<Tasks>(`${this.baseUrl}/complete/${id}`, {},this.httpOptions);
  }
}
