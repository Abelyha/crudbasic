import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/v1/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    console.log('Obteniendo estudiantes...');
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    console.log('Obteniendo estudiante con ID:', id);
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    console.log('Creando estudiante:', student);
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    console.log('Actualizando estudiante:', { id, student });
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    console.log('Eliminando estudiante con ID:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
