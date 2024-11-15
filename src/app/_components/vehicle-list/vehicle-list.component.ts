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
    { id: 1, brand: 'Toyota', model: 'Corolla', plate: 'ABC-1234', chassi: 'JTDBE32K123456789', reindeer: '123456789', year: 2020 },
    { id: 2, brand: 'Honda', model: 'Civic', plate: 'XYZ-5678', chassi: '2HGES165X12345678', reindeer: '987654321', year: 2021 },
    { id: 3, brand: 'Ford', model: 'Fiesta', plate: 'LMN-9101', chassi: '3FADP4BJ4EM123456', reindeer: '112233445', year: 2019 },
  ];

  showSuccessAlert: boolean = false;
  showAttentionAlert: boolean = false;
  attentionMessage: string = ''; // Declara a variável de mensagem de atenção
  showDeleteModal: boolean = false;
  vehicleToDelete: any = null;
  newVehicle: Vehicle = { id: 0, brand: '', model: '', plate: '', chassi: '', reindeer: '', year: 0 };
  isAddingNew: boolean = false;

  selectedVehicle: Vehicle | null = null;
  isEditing: boolean = false;

  sortOrder: { [key: string]: boolean } = {};

  addNewVehicle() {
    this.isAddingNew = true;
    this.newVehicle = { id: 0, brand: '', model: '', plate: '', chassi: '', reindeer: '', year: 0 };
  }

  saveNewVehicle() {
    const currentYear = new Date().getFullYear();
    const year = this.newVehicle.year ? parseInt(this.newVehicle.year.toString(), 10) : NaN; // Garantir que year seja um número válido
    const platePattern = /^[A-Za-z0-9]{7}$/; // Expressão regular para verificar placa com 8 caracteres

    // Verificação do ano
    if (isNaN(year) || year < 1941 || year > currentYear) {
      this.attentionMessage = 'O ano inserido não é válido. Por favor, corrija.';
      this.showAttentionAlert = true;

      const yearInput = document.getElementById(`year-new`) as HTMLInputElement;
      if (yearInput) {
        yearInput.focus();
      }

      setTimeout(() => {
        this.showAttentionAlert = false;
      }, 3000);
      return; // Não continua se o ano for inválido
    }

    // Verificação da placa
    if (!platePattern.test(this.newVehicle.plate)) {
      this.attentionMessage = 'A placa deve ter exatamente 7 caracteres alfanuméricos.';
      this.showAttentionAlert = true;

      const plateInput = document.getElementById(`plate-new`) as HTMLInputElement;
      if (plateInput) {
        plateInput.focus();
      }

      setTimeout(() => {
        this.showAttentionAlert = false;
      }, 3000);
      return; // Não continua se a placa for inválida
    }

    // Verificação de campos obrigatórios
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
      // Adiciona o novo veículo no início da tabela
      this.vehicles.unshift({ ...this.newVehicle });
      this.cancelNewVehicle(); // Cancela a inserção de novo veículo após salvar
      this.showSuccessAlert = true; // Exibe o alerta de sucesso

      // Esconde o alerta de sucesso após 3 segundos
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 3000);
    } else {
      this.attentionMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.showAttentionAlert = true;

      setTimeout(() => {
        this.showAttentionAlert = false;
      }, 3000);
    }
  }


  cancelNewVehicle() {
    this.isAddingNew = false;
  }

  editVehicle(index: number) {
    const vehicle = this.vehicles[index];
    if (vehicle) {
      vehicle.isEditing = true;
      vehicle.originalData = { ...vehicle };
    }
  }

  saveVehicle(index: number) {
    const vehicle = this.vehicles[index];

    const currentYear = new Date().getFullYear();
    const year = vehicle.year ? parseInt(vehicle.year.toString(), 10) : NaN; // Garantir que year seja um número válido
    const platePattern = /^[A-Za-z0-9]{7}$/; // Expressão regular para verificar placa com 8 caracteres

    // Verificação do ano
    if (isNaN(year) || year < 1941 || year > currentYear) {
      this.attentionMessage = 'O ano inserido não é válido. Por favor, corrija.';
      this.showAttentionAlert = true;

      const yearInput = document.getElementById(`year-${index}`) as HTMLInputElement;
      if (yearInput) {
        yearInput.focus();
      }

      setTimeout(() => {
        this.showAttentionAlert = false;
      }, 3000);
      return; // Não continua se o ano for inválido
    }

    // Verificação da placa
    if (!platePattern.test(vehicle.plate)) {
      this.attentionMessage = 'A placa deve ter exatamente 7 caracteres alfanuméricos.';
      this.showAttentionAlert = true;

      const plateInput = document.getElementById(`plate-${index}`) as HTMLInputElement;
      if (plateInput) {
        plateInput.focus();
      }

      setTimeout(() => {
        this.showAttentionAlert = false;
      }, 3000);
      return; // Não continua se a placa for inválida
    }

    // Verificação de campos obrigatórios
    if (
      vehicle.brand &&
      vehicle.model &&
      vehicle.plate &&
      vehicle.chassi &&
      vehicle.reindeer &&
      vehicle.year
    ) {
      vehicle.isEditing = false;
      this.showSuccessAlert = true; // Exibe o alerta de sucesso

      // Esconde o alerta de sucesso após 3 segundos
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 3000);
    } else {
      this.attentionMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.showAttentionAlert = true;

      setTimeout(() => {
        this.showAttentionAlert = false;
      }, 3000);
    }
  }

  cancelEdit(vehicle: Vehicle) {
    if (vehicle.originalData) {
      vehicle.brand = vehicle.originalData?.brand;
      vehicle.model = vehicle.originalData?.model;
      vehicle.plate = vehicle.originalData?.plate;
      vehicle.chassi = vehicle.originalData?.chassi;
      vehicle.reindeer = vehicle.originalData?.reindeer;
      vehicle.year = vehicle.originalData?.year;
      vehicle.isEditing = false;
    }
  }

  delete(vehicle: any): void {
    this.vehicleToDelete = vehicle;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    const index = this.vehicles.indexOf(this.vehicleToDelete);
    if (index > -1) {
      this.vehicles.splice(index, 1);
    }

    this.showDeleteModal = false;
    this.vehicleToDelete = null;
  }

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

  closeAlert() {
    this.showSuccessAlert = false;
  }

  closeAttentionAlert() {
    this.showAttentionAlert = false;
  }
}
