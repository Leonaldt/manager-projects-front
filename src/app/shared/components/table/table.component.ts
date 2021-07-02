import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'mp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() columns: any[];

  @Input() hasAdd: boolean = true;
  @Input() hasEdit: boolean = true;
  @Input() hasDelete: boolean = true;

  @Input() textButton: string = 'Adicionar';
  @Input() editMessageButton: string = 'Editar';

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() calcInvest =new EventEmitter<any>();

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.displayedColumns = this.columns.map((column: any) => column.name);
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  openFormDialog(item?: any) {
    this.edit.emit(item);
  }

  openConfirmationDeleteDialog(id: number) {
    this.delete.emit(id);
  }

  openCalcInvestDialog(project: any) {
    this.calcInvest.emit(project);
  }

  sortData(sort: Sort) {
    if (sort.active && sort.direction !== '') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name': return this.compare(a.name, b.name, isAsc);
          case 'description': return this.compare(a.description, b.description, isAsc);
          case 'representative': return this.compare(a.representative, b.representative, isAsc);
          case 'type': return this.compare(a.type, b.type, isAsc);
          default: return 0;
        }
      });
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilters() {
    this.dataSource.filter = '';
  }
}
