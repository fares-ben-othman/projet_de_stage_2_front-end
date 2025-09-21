import { Component, OnInit } from '@angular/core';

// Interface pour typer un client
interface Client {
  numero_permis: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  cin: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  searchTerm: string = '';
  clients: Client[] = [];
  filteredClients: Client[] = [];

  constructor() { }

  ngOnInit(): void {
    // Données initiales (à remplacer par une API plus tard)
    this.clients = [
      { numero_permis: '123', nom: 'Ben', prenom: 'Fares', email: 'fares@example.com', telephone: '12345678', cin: 'AA123' },
      { numero_permis: '124', nom: 'Doe', prenom: 'John', email: 'john@example.com', telephone: '87654321', cin: 'BB456' },
      { numero_permis: '125', nom: 'Smith', prenom: 'Anna', email: 'anna@example.com', telephone: '55555555', cin: 'CC789' },
      { numero_permis: '126', nom: 'Martin', prenom: 'Paul', email: 'paul@example.com', telephone: '44444444', cin: 'DD012' }
      // tu peux ajouter d'autres clients ici
    ];

    // Initialiser filteredClients
    this.filteredClients = [...this.clients];
  }

  // Filtrer les clients en fonction du searchTerm
  filterClients(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredClients = [...this.clients];
      return;
    }

    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().includes(term) ||
      client.prenom.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.telephone.includes(term) ||
      client.cin.toLowerCase().includes(term)
    );
  }

  // Méthodes pour les boutons (à compléter selon ton besoin)
  viewDetails(client: Client): void {
    console.log('Voir détails de', client);
  }

  editClient(client: Client): void {
    console.log('Éditer client', client);
  }

  deleteClient(client: Client): void {
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer ${client.nom} ${client.prenom} ?`);
    if (confirmDelete) {
      this.clients = this.clients.filter(c => c.numero_permis !== client.numero_permis);
      this.filterClients(); // Mettre à jour la liste filtrée
    }
  }

}
