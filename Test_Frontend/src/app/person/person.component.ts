import { DeclarationListEmitMode } from '@angular/compiler';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PersonFormComponent } from '../person-form/person-form.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { RestService } from '../rest.service';
export interface PersonData {
  id: string;
  name: string;
  lastname: string;
  age: number;
  date: Date;
  weight: number;
  tall: number;
  idealWeight: number;
}



@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements AfterViewInit {

  displayedColumns: string[] = ['actions', 'name', 'lastname', 'age', 'ageCategory', 'birthdate', 'weight', 'tall', 'idealWeight', 'weightCategory'];
  dataSource!: MatTableDataSource<PersonData>;
  dataValues: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private RestService: RestService) {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, rowData?: any): void {
    this.dialog.open(PersonFormComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: rowData,
      panelClass: 'app-full-bleed-dialog',

    }).afterClosed(
    ).subscribe(e => { this.loadData() });
  }


  ngAfterViewInit() {
    this.loadData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  downloadPdf() {
    var output = this.dataValues.map(function (obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    });

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Reporte Personas", 11, 8);
    (doc as any).autoTable({
      head: [['Nombre', 'Apellido(s)', 'Edad', 'Fecha de Nacimiento', 'Peso (KG)', 'Altura (metros)', 'Peso Ideal (KG)']],
      body: output,
      theme: 'plain',
      // didDrawCell: (data: { column: { index: any; }; }) => {
      //   console.log(data.column.index)
      // }

    })

    doc.output('dataurlnewwindow');
    doc.save('Reporte' + '.pdf');
  }

  loadData() {
    this.RestService.get('http://localhost:8000/api/persons/get')
      .subscribe((response: any) => {
        // console.log(response);
        console.log(response.persons);
        this.dataSource = new MatTableDataSource(response.persons);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  editRow(rowData: any) {
    this.openDialog('0ms', '0ms', rowData);
  }

  deleteRow(_id: string) {
    this.RestService.delete(`http://localhost:8000/api/persons/delete/${_id}`)
      .subscribe((response: any) => {
        this.loadData();
      })
  }
  getAge(date: string) {
    let today = new Date()
    let birthdate = new Date(date);
    let age = today.getFullYear() - birthdate.getFullYear()
    let monthDiference = today.getMonth() - birthdate.getMonth()
    if (
      monthDiference < 0 ||
      (monthDiference === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--
    }
    return age
  }

  getAgeCategory(date: string) {
    let edad = this.getAge(date);
    if (edad >= 0 && edad <= 12)
      return "Niño"
    else if (edad >= 13 && edad <= 29)
      return "Joven"
    else if (edad >= 30 && edad <= 59)
      return "Adulto"
    else if (edad >= 60)
      return "Tercera Edad"

    return null;
  }
}




