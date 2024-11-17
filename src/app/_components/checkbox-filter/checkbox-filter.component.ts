import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.css']
})
export class CheckboxFilterComponent implements OnInit {
  @Input() filterOptions: string[] = [];
  @Input() column: string = '';
  @Input() active: boolean = false;
  @Output() applyFilters = new EventEmitter<{ column: string; filters: string[] }>();

  checkedItems: { [key: string]: boolean } = {};
  currentFilterOptions: string[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.currentFilterOptions = [...this.filterOptions];
  }

  onCheckboxChange(option: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.checkedItems[option] = true;
    } else {
      delete this.checkedItems[option];
    }
    this.emitFilters(); // Emite os filtros atualizados
  }

  // Emite os filtros selecionados para o componente pai
  emitFilters(): void {
    const selectedFilters = Object.keys(this.checkedItems);
    this.applyFilters.emit({ column: this.column, filters: selectedFilters });
  }

  onSearchChange(): void {
    this.currentFilterOptions = this.filterOptions.filter(option =>
      option.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  clearFilters(): void {
    this.checkedItems = {};
    this.applyFilters.emit({ column: this.column, filters: [] });
  }
}
