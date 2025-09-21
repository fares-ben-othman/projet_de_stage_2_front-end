import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface Vehicle {
  immatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
  statut: 'disponible' | 'loue' | 'maintenance' | 'leasing' | 'transfert' | 'reserve';
  date_assurance: string;
  agence_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = `${environment.apiUrl}/vehicules`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  // Fonction utilitaire pour ajouter le token aux headers
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // GET all vehicles
  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/get-all`, this.getAuthHeaders());
  }

  // GET vehicle by immatriculation
  getById(immatriculation: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/get/${immatriculation}`, this.getAuthHeaders());
  }

  // CREATE new vehicle
  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/create`, vehicle, this.getAuthHeaders());
  }

  // UPDATE vehicle
  update(immatriculation: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/update/${immatriculation}`, vehicle, this.getAuthHeaders());
  }

  // DELETE vehicle
  delete(immatriculation: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${immatriculation}`, this.getAuthHeaders());
  }
}
