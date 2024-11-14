import { Component } from '@angular/core';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  plate: string;
  chassi: string;
  renavam: string;
  year: number;
}

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      plate: 'ABC-1234',
      chassi: 'JTDBE32K123456789',
      renavam: '123456789',
      year: 2020,
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
      plate: 'XYZ-5678',
      chassi: '2HGES165X12345678',
      renavam: '987654321',
      year: 2021,
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Fiesta',
      plate: 'LMN-9101',
      chassi: '3FADP4BJ4EM123456',
      renavam: '112233445',
      year: 2019,
    },
  ];

  selectedVehicle: Vehicle | null = null;
  isEditing: boolean = false;

  save() {
    if (this.selectedVehicle) {
      const index = this.vehicles.findIndex(
        (v) => v.id === this.selectedVehicle!.id
      );
      if (index > -1) {
        this.vehicles[index] = this.selectedVehicle;
      }
      this.selectedVehicle = null;
    }
  }

  delete(vehicle: Vehicle) {
    this.vehicles = this.vehicles.filter((v) => v.id !== vehicle.id);
  }
}
