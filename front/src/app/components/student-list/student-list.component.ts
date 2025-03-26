import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../models/student';
import { ClientService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.getClients();
  }

  private getClients(): void {
    this.clientService.getClientList().subscribe({
      next: (data) => {
        console.log('Clientes cargados:', data);
        this.clients = data;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  updateClient(id: number): void {
    this.router.navigate(['/update-client', id]);
  }

  deleteClient(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          console.log('Cliente eliminado exitosamente');
          this.getClients();
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
        }
      });
    }
  }

  clientDetails(id: number): void {
    this.router.navigate(['/client-details', id]);
  }
}
