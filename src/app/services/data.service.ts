import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as XLSX from 'xlsx';




@Injectable({
  providedIn: 'root'
})
export class DataService {


  file_infos$ : BehaviorSubject<any>
  workBooks$ : BehaviorSubject<XLSX.WorkBook[]>
  workBooksProps$ : BehaviorSubject<XLSX.Properties>
  tables$ : BehaviorSubject<any[]>
  tables : any[]
  variables$: BehaviorSubject<any>;
  dataset$: BehaviorSubject<any[]>;

  constructor() { 

    this.tables = []

  console.log("services works")


  this.dataset$ = new BehaviorSubject<any>([])
  this.variables$ = new BehaviorSubject<any>([])
  this.file_infos$ = new BehaviorSubject<any>({})
  this.workBooks$ = new BehaviorSubject<any[]>([])
  this.workBooksProps$ = new BehaviorSubject<XLSX.Properties>({})



  this.dataset$.subscribe((ds)=>{
    if(ds.length > 0){
      this.tables.push(ds)
      this.tables$.next(this.tables)
    }
  })



  this.workBooks$.subscribe((list)=>{

    console.log(list[0])
    let wb = list[0]
    if(list.length > 0){

      this.workBooksProps$.next(wb.Props)
      

      for(let name of wb.SheetNames){
        var worksheet_var = wb.Sheets[name]; 
        let variables = XLSX.utils.sheet_to_json(worksheet_var,{raw:true})
        
      }

      this.tables$.next(this.tables)
    }
    

    })
    this.tables$ = new BehaviorSubject<any[]>([])
  }












}
