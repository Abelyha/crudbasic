import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    console.log('Cargando estudiantes...');
    this.studentService.getStudents().subscribe({
      next: (data) => {
        console.log('Estudiantes recibidos:', data);
        this.students = data;
        // Revisar la estructura de cada estudiante
        if (this.students.length > 0) {
          console.log('Primer estudiante:', this.students[0]);
          console.log('ID del primer estudiante:', this.students[0].stundentId);
        }
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
      }
    });
  }

  updateStudent(id: number): void {
    console.log('Navegando a editar estudiante:', id);
    this.router.navigate(['/update-student', id]);
  }

  deleteStudent(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      console.log('Eliminando estudiante:', id);
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          console.log('Estudiante eliminado exitosamente');
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error al eliminar estudiante:', error);
        }
      });
    }
  }

  studentDetails(id: number): void {
    console.log('Navegando a detalles del estudiante:', id);
    this.router.navigate(['/student-details', id]);
  }
}
