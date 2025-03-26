import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/student';
import { ClientService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ClientFormComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: ''
  };
  isUpdateMode = false;
  isViewMode = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isUpdateMode = this.router.url.includes('/update-client');
    this.isViewMode = this.router.url.includes('/client-details');
    
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.loadClient(id);
    }
  }

  loadClient(id: number): void {
    this.clientService.getClient(id).subscribe({
      next: (data) => {
        console.log('Cliente cargado:', data);
        this.client = data;
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
        alert('Error al cargar los datos del cliente');
        this.goToClientList();
      }
    });
  }

  onSubmit(): void {
    if (this.isViewMode) {
      this.goToClientList();
      return;
    }

    if (this.isUpdateMode) {
      const id = Number(this.route.snapshot.params['id']);
      this.clientService.updateClient(id, this.client).subscribe({
        next: (response) => {
          console.log('Cliente actualizado:', response);
          alert('Cliente actualizado con éxito');
          this.goToClientList();
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          alert('Error al actualizar el cliente');
        }
      });
    } else {
      this.clientService.createClient(this.client).subscribe({
        next: (response) => {
          console.log('Cliente creado:', response);
          alert('Cliente creado con éxito');
          this.goToClientList();
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
          alert('Error al crear el cliente');
        }
      });
    }
  }

  goToClientList(): void {
    this.router.navigate(['/clients']);
  }
}
