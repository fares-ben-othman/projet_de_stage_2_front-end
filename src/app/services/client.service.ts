import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

// Interface pour typer un client
export interface Client {
  numero_permis: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  cin: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  // Ajoute le token aux headers
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // GET all clients
  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/get-all`, this.getAuthHeaders());
  }

  // CREATE client
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/create`, client, this.getAuthHeaders());
  }

  // UPDATE client
  update(numero_permis: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/update/${numero_permis}`, client, this.getAuthHeaders());
  }

  // DELETE client
  delete(numero_permis: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${numero_permis}`, this.getAuthHeaders());
  }
}
