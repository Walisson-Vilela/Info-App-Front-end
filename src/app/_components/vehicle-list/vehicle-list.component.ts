import { Component } from '@angular/core';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  plate: string;
  chassi?: string;
  reindeer?: string;  // Alterado de 'renavam' para 'reindeer'
  year?: number;
  isEditing?: boolean;
  originalData?: Vehicle; // Para armazenar os dados originais antes da edição
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
      reindeer: '123456789', // Alterado de 'renavam' para 'reindeer'
      year: 2020,
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
      plate: 'XYZ-5678',
      chassi: '2HGES165X12345678',
      reindeer: '987654321', // Alterado de 'renavam' para 'reindeer'
      year: 2021,
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Fiesta',
      plate: 'LMN-9101',
      chassi: '3FADP4BJ4EM123456',
      reindeer: '112233445', // Alterado de 'renavam' para 'reindeer'
      year: 2019,
    },
  ];

  newVehicle: Vehicle = { id: 0, brand: '', model: '', plate: '', chassi: '', reindeer: '', year: 0 }; // Alterado de 'renavam' para 'reindeer'
  isAddingNew: boolean = false;

  selectedVehicle: Vehicle | null = null;
  isEditing: boolean = false;

  addNewVehicle() {
    this.isAddingNew = true; // Habilita a linha de inserção
    this.newVehicle = { id: 0, brand: '', model: '', plate: '', chassi: '', reindeer: '', year: 0 }; // Limpa os campos
  }

  saveNewVehicle() {
    if (this.newVehicle.brand && this.newVehicle.model && this.newVehicle.plate && this.newVehicle.chassi && this.newVehicle.reindeer && this.newVehicle.year) {
      // Atribui um ID único para o novo veículo (número de veículos + 1)
      this.newVehicle.id = this.vehicles.length + 1;
      // Adiciona o novo veículo no início da tabela (usando unshift())
      this.vehicles.unshift({ ...this.newVehicle });
      this.cancelNewVehicle(); // Cancela a inserção de novo veículo após salvar
    }
  }

  cancelNewVehicle() {
    this.isAddingNew = false; // Cancela a inserção de novo veículo
  }

  editVehicle(index: number) {
    const vehicle = this.vehicles[index];
    vehicle.isEditing = true; // Marca o veículo como sendo editado
    vehicle.originalData = { ...vehicle }; // Salva os dados originais do veículo
  }

  saveVehicle(index: number) {
    const vehicle = this.vehicles[index];
    if (vehicle.brand && vehicle.model && vehicle.plate && vehicle.chassi && vehicle.reindeer && vehicle.year) {
      // Salva as alterações e desmarca o veículo como "em edição"
      vehicle.isEditing = false;
    }
  }

  cancelEdit(vehicle: Vehicle) {
    // Restaura os dados originais e desmarca o veículo como "em edição"
    if (vehicle.originalData) {
      vehicle.brand = vehicle.originalData.brand;
      vehicle.model = vehicle.originalData.model;
      vehicle.plate = vehicle.originalData.plate;
      vehicle.chassi = vehicle.originalData.chassi;
      vehicle.reindeer = vehicle.originalData.reindeer; // Alterado de 'renavam' para 'reindeer'
      vehicle.year = vehicle.originalData.year;
      vehicle.isEditing = false;
    }
  }

  delete(vehicle: Vehicle) {
    this.vehicles = this.vehicles.filter((v) => v.id !== vehicle.id);
  }
}
