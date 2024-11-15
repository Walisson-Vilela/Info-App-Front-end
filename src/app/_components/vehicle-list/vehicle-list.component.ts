import { Component } from '@angular/core';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  plate: string;
  chassi?: string;
  reindeer?: string;
  year?: number;
  isEditing?: boolean;
  originalData?: Vehicle;
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
      reindeer: '123456789',
      year: 2020,
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
      plate: 'XYZ-5678',
      chassi: '2HGES165X12345678',
      reindeer: '987654321',
      year: 2021,
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Fiesta',
      plate: 'LMN-9101',
      chassi: '3FADP4BJ4EM123456',
      reindeer: '112233445',
      year: 2019,
    },
  ];
  showDeleteModal: boolean = false;
  vehicleToDelete: any = null;
  newVehicle: Vehicle = {
    id: 0,
    brand: '',
    model: '',
    plate: '',
    chassi: '',
    reindeer: '',
    year: 0,
  };
  isAddingNew: boolean = false;

  selectedVehicle: Vehicle | null = null;
  isEditing: boolean = false;

  sortOrder: { [key: string]: boolean } = {};

  addNewVehicle() {
    this.isAddingNew = true; // Habilita a linha de inserção
    this.newVehicle = {
      id: 0,
      brand: '',
      model: '',
      plate: '',
      chassi: '',
      reindeer: '',
      year: 0,
    }; // Limpa os campos
  }

  saveNewVehicle() {
    if (
      this.newVehicle.brand &&
      this.newVehicle.model &&
      this.newVehicle.plate &&
      this.newVehicle.chassi &&
      this.newVehicle.reindeer &&
      this.newVehicle.year
    ) {
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
    if (vehicle) {
      vehicle.isEditing = true; // Marca o veículo como sendo editado
      vehicle.originalData = { ...vehicle }; // Salva os dados originais do veículo
    }
  }

  saveVehicle(index: number) {
    const vehicle = this.vehicles[index];
    if (
      vehicle &&
      vehicle.brand &&
      vehicle.model &&
      vehicle.plate &&
      vehicle.chassi &&
      vehicle.reindeer &&
      vehicle.year
    ) {
      // Salva as alterações e desmarca o veículo como "em edição"
      vehicle.isEditing = false;
    }
  }

  cancelEdit(vehicle: Vehicle) {
    // Restaura os dados originais e desmarca o veículo como "em edição"
    if (vehicle.originalData) {
      vehicle.brand = vehicle.originalData?.brand;
      vehicle.model = vehicle.originalData?.model;
      vehicle.plate = vehicle.originalData?.plate;
      vehicle.chassi = vehicle.originalData?.chassi;
      vehicle.reindeer = vehicle.originalData?.reindeer; // Alterado de 'renavam' para 'reindeer'
      vehicle.year = vehicle.originalData?.year;
      vehicle.isEditing = false;
    }
  }

  // Função chamada ao clicar no botão de excluir
  delete(vehicle: any): void {
    this.vehicleToDelete = vehicle;
    this.showDeleteModal = true;
  }

  // Função chamada quando o usuário confirma a exclusão
  confirmDelete(): void {
    // Aqui você pode adicionar a lógica para excluir o veículo (por exemplo, via API ou array local)
    const index = this.vehicles.indexOf(this.vehicleToDelete);
    if (index > -1) {
      this.vehicles.splice(index, 1); // Remove o veículo do array
    }

    // Fechar o modal após a exclusão
    this.showDeleteModal = false;
    this.vehicleToDelete = null;
  }

  // Função chamada quando o usuário cancela a exclusão
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.vehicleToDelete = null;
  }
  sortTable(property: keyof Vehicle) {
    this.sortOrder[property] = !this.sortOrder[property];
    this.vehicles.sort((a, b) => {
      if (a[property] && b[property]) {
        if (a[property] < b[property]) {
          return this.sortOrder[property] ? -1 : 1;
        } else if (a[property] > b[property]) {
          return this.sortOrder[property] ? 1 : -1;
        }
      }
      return 0;
    });
  }
}
