import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';

  clientForm!: FormGroup;
  editingClient: Client | null = null;
  showFormModal: boolean = false;

  constructor(private clientService: ClientService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadClients();
    this.initForm();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = [...this.clients];
      },
      error: (err) => console.error('Error loading clients', err)
    });
  }

  initForm(): void {
    this.clientForm = this.fb.group({
      numero_permis: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      cin: ['', Validators.required]
    });
  }

  filterClients(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredClients = this.clients.filter(c =>
      c.numero_permis.toLowerCase().includes(term) ||
      c.nom.toLowerCase().includes(term) ||
      c.prenom.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.telephone.toLowerCase().includes(term) ||
      c.cin.toLowerCase().includes(term)
    );
  }

  openCreateForm(): void {
    this.editingClient = null;
    this.clientForm.reset();
    this.showFormModal = true;
  }

  openEditForm(client: Client): void {
    this.editingClient = client;
    this.clientForm.patchValue(client);
    this.showFormModal = true;
  }

  submitForm(): void {
    if (this.clientForm.invalid) return;

    const clientData: Client = this.clientForm.value;

    if (this.editingClient) {
      this.clientService.update(this.editingClient.numero_permis, clientData).subscribe({
        next: () => {
          this.loadClients();
          this.showFormModal = false;
        },
        error: (err) => console.error('Update error', err)
      });
    } else {
      this.clientService.create(clientData).subscribe({
        next: () => {
          this.loadClients();
          this.showFormModal = false;
        },
        error: (err) => console.error('Create error', err)
      });
    }
  }

  deleteClient(client: Client): void {
    if (!confirm(`Supprimer le client ${client.nom} ${client.prenom}?`)) return;
    this.clientService.delete(client.numero_permis).subscribe({
      next: () => this.loadClients(),
      error: (err) => console.error('Delete error', err)
    });
  }
}
