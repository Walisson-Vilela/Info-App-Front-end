import { Component } from '@angular/core';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  plate: string;
  chassi?: string;
  renavam?: string;
  year?: number;
  isEditing?: boolean;
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

  newVehicle: Vehicle = { id: 0, brand: '', model: '', plate: '' }; // Novo veículo a ser adicionado
  isAddingNew: boolean = false;

  selectedVehicle: Vehicle | null = null;
  isEditing: boolean = false;

  addNewVehicle() {
    this.isAddingNew = true; // Habilita a linha de inserção
    this.newVehicle = { id: 0, brand: '', model: '', plate: '' }; // Limpa os campos
  }

  saveNewVehicle() {
    if (this.newVehicle.brand && this.newVehicle.model && this.newVehicle.plate) {
      // Adiciona o novo veículo ao array
      this.newVehicle.id = this.vehicles.length + 1; // Atribui um ID único
      this.vehicles.push({ ...this.newVehicle });
      this.cancelNewVehicle(); // Cancela o modo de adicionar após salvar
    }
  }

  cancelNewVehicle() {
    this.isAddingNew = false; // Cancela a inserção de novo veículo
  }

  editVehicle(index: number) {
    const vehicle = this.vehicles[index];
    vehicle.isEditing = true;
    this.selectedVehicle = { ...vehicle }; // Faz uma cópia do veículo para edição
  }

  saveVehicle(index: number) {
    const vehicle = this.vehicles[index];
    if (this.selectedVehicle) {
      const updatedVehicle = this.selectedVehicle;
      // Atualiza o veículo no array
      this.vehicles[index] = updatedVehicle;
      vehicle.isEditing = false;
      this.selectedVehicle = null;
    }
  }

  delete(vehicle: Vehicle) {
    this.vehicles = this.vehicles.filter((v) => v.id !== vehicle.id);
  }
}
