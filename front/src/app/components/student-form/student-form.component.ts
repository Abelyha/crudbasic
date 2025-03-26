import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class StudentFormComponent implements OnInit {
  student: Student = {
    stundentId: undefined,
    firstName: '',
    lastName: '',
    email: ''
  };
  isUpdateMode = false;
  isViewMode = false;
  studentId?: number;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.params['id']);
    if (this.studentId) {
      console.log('ID del estudiante en la ruta:', this.studentId);
      this.loadStudent(this.studentId);
      this.isUpdateMode = this.router.url.includes('/update-student');
      this.isViewMode = this.router.url.includes('/student-details');
      console.log('Modo actualización:', this.isUpdateMode);
      console.log('Modo visualización:', this.isViewMode);
    }
  }

  loadStudent(id: number): void {
    console.log('Cargando estudiante con ID:', id);
    this.studentService.getStudent(id).subscribe({
      next: (data) => {
        console.log('Estudiante cargado:', data);
        this.student = data;
      },
      error: (error) => {
        console.error('Error al cargar estudiante:', error);
        alert('Error al cargar los datos del estudiante.');
        this.goToStudentList();
      }
    });
  }

  onSubmit(): void {
    console.log('Enviando formulario. isUpdateMode:', this.isUpdateMode);
    
    if (this.isViewMode) {
      this.goToStudentList();
      return;
    }
    
    if (this.isUpdateMode && this.studentId) {
      console.log('Actualizando estudiante con ID:', this.studentId);
      
      // Si estamos actualizando, asegurarnos de que el ID esté establecido
      const updatedStudent: Student = {
        ...this.student,
        stundentId: this.studentId
      };
      
      console.log('Datos a enviar:', updatedStudent);
      
      this.studentService.updateStudent(this.studentId, updatedStudent).subscribe({
        next: (response) => {
          console.log('Estudiante actualizado exitosamente:', response);
          alert('Estudiante actualizado con éxito');
          this.goToStudentList();
        },
        error: (error) => {
          console.error('Error al actualizar estudiante:', error);
          alert('Error al actualizar el estudiante. Por favor, inténtelo de nuevo.');
        }
      });
    } else {
      console.log('Creando nuevo estudiante');
      // Asegurarse de que no se envía un ID al crear
      const newStudent: Student = {
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        email: this.student.email
      };
      
      console.log('Datos a enviar:', newStudent);
      
      this.studentService.createStudent(newStudent).subscribe({
        next: (response) => {
          console.log('Estudiante creado exitosamente:', response);
          alert('Estudiante creado con éxito');
          this.goToStudentList();
        },
        error: (error) => {
          console.error('Error al crear estudiante:', error);
          alert('Error al crear el estudiante. Por favor, inténtelo de nuevo.');
        }
      });
    }
  }

  goToStudentList(): void {
    this.router.navigate(['/students']);
  }
}
