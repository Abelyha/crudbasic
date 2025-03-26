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

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadStudent(id);
      this.isUpdateMode = this.router.url.includes('/update-student');
      this.isViewMode = this.router.url.includes('/student-details');
    }
  }

  loadStudent(id: number): void {
    console.log('Cargando estudiante:', id);
    this.studentService.getStudent(id).subscribe({
      next: (data) => {
        console.log('Estudiante cargado:', data);
        this.student = data;
      },
      error: (error) => {
        console.error('Error al cargar estudiante:', error);
      }
    });
  }

  onSubmit(): void {
    console.log('Enviando formulario:', this.student);
    if (this.isUpdateMode) {
      const id = this.route.snapshot.params['id'];
      const updatedStudent = { ...this.student, stundentId: id };
      this.studentService.updateStudent(id, updatedStudent).subscribe({
        next: () => {
          console.log('Estudiante actualizado exitosamente');
          this.goToStudentList();
        },
        error: (error) => {
          console.error('Error al actualizar estudiante:', error);
        }
      });
    } else {
      const newStudent = { ...this.student };
      delete newStudent.stundentId;
      this.studentService.createStudent(newStudent).subscribe({
        next: () => {
          console.log('Estudiante creado exitosamente');
          this.goToStudentList();
        },
        error: (error) => {
          console.error('Error al crear estudiante:', error);
        }
      });
    }
  }

  goToStudentList(): void {
    this.router.navigate(['/students']);
  }
}
