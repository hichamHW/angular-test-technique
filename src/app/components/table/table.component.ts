import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Car } from 'src/app/models/data';
import { TraitementService } from 'src/app/services/traitement.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent  {
  
  cars: Car[] =[
    {vin:"a1653d4d",brand:"VW",year:1998,color:"White",price:10000},
    {vin:"ddeb9b10",brand:"Mercedes",year:1985,color:"Green",price:25000},
    {vin:"d8ebe413",brand:"Jaguar",year:1979,color:"Silver",price:30000},
    {vin:"aab227b7",brand:"Audi",year:1970,color:"Black",price:12000},
    {vin:"b631f7412",brand:"Volvo",year:1992,color:"Red",price:15500},
    {vin:"7d2d22b0",brand:"VW",year:1993,color:"Maroon",price:40000},
  ];

  sortedData: Car[] = [];
  sortedData1: Car[] = [];
  searchText:string = '';

  constructor(private traitement: TraitementService) {
    this.sortedData1 = this.sortedData = this.cars.slice();
  }
  search(){
    if(this.searchText !==''){
      this.sortedData1 = this.sortedData.filter(data =>
        data.vin.toLowerCase().includes(this.searchText.toLowerCase())||
        data.brand.toLowerCase().includes(this.searchText.toLowerCase())||
        data.color.toLowerCase().includes(this.searchText.toLowerCase())||
        data.price.toString().toLowerCase().includes(this.searchText.toLowerCase())||
        data.year.toString().toLowerCase().includes(this.searchText.toLowerCase())
        );
    }else if(this.searchText === ''){
      this.sortedData1 = this.sortedData;
    }
  }

  sortData(sort: Sort) {
    const data = this.sortedData1.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData1 = data;
      return;
    }
    this.sortedData1 = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'vin': return this.traitement.compare(a.vin, b.vin, isAsc);
        case 'brand': return this.traitement.compare(a.brand, b.brand, isAsc);
        case 'year': return this.traitement.compare(a.year, b.year, isAsc);
        case 'color': return this.traitement.compare(a.color, b.color, isAsc);
        case 'price': return this.traitement.compare(a.price, b.price, isAsc);
        default: return 0;
      }
    });
  }
}

