import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleService } from '../../services/vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchTerm: string = '';

  // Pour le formulaire de création / modification
  vehicleForm!: FormGroup;
  editingVehicle: Vehicle | null = null;
  showFormModal: boolean = false;

  constructor(private vehicleService: VehicleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.initForm();
  }

  loadVehicles(): void {
    this.vehicleService.getAll().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.filteredVehicles = [...this.vehicles];
      },
      error: (err) => console.error('Error loading vehicles', err)
    });
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      immatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      kilometrage: [0, Validators.required],
      statut: ['disponible', Validators.required],
      date_assurance: ['', Validators.required],
      agence_id: [1, Validators.required]
    });
  }

  filterVehicles(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredVehicles = [...this.vehicles];
      return;
    }
    this.filteredVehicles = this.vehicles.filter(v =>
      v.immatriculation.toLowerCase().includes(term) ||
      v.marque.toLowerCase().includes(term) ||
      v.modele.toLowerCase().includes(term) ||
      v.statut.toLowerCase().includes(term)
    );
  }

  // Modal Form
  openCreateForm(): void {
    this.editingVehicle = null;
    this.vehicleForm.reset({ statut: 'disponible', annee: new Date().getFullYear(), kilometrage: 0, agence_id: 1 });
    this.showFormModal = true;
  }

  openEditForm(vehicle: Vehicle): void {
    this.editingVehicle = vehicle;
    this.vehicleForm.patchValue(vehicle);
    this.showFormModal = true;
  }

  submitForm(): void {
    if (this.vehicleForm.invalid) return;

    const vehicleData: Vehicle = this.vehicleForm.value;

    if (this.editingVehicle) {
      // Update
      this.vehicleService.update(this.editingVehicle.immatriculation!, vehicleData).subscribe({
        next: (res) => {
          this.loadVehicles();
          this.showFormModal = false;
        },
        error: (err) => console.error('Update error', err)
      });
    } else {
      // Create
      this.vehicleService.create(vehicleData).subscribe({
        next: (res) => {
          this.loadVehicles();
          this.showFormModal = false;
        },
        error: (err) => console.error('Create error', err)
      });
    }
  }

  deleteVehicle(vehicle: Vehicle): void {
    if (!confirm(`Are you sure you want to delete vehicle ${vehicle.immatriculation}?`)) return;
    this.vehicleService.delete(vehicle.immatriculation!).subscribe({
      next: () => this.loadVehicles(),
      error: (err) => console.error('Delete error', err)
    });
  }
}
