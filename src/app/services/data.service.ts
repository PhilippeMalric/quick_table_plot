import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as XLSX from 'xlsx';
import { VariablesGroup } from '../model/VariablesGroup';




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
  variablesGroup$: BehaviorSubject<any>;
  variablesGroups: VariablesGroup[];

  constructor() { 

    this.tables = []

  console.log("services works")
  this.variablesGroups = []
  this.variablesGroup$ = new BehaviorSubject<any>([])
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


  addVariableGroup = (vg:VariablesGroup)=>{

    this.variablesGroups.push(vg)
    this.variablesGroup$.next(this.variablesGroups)

  }

  deleteVariableGroup = (vg:VariablesGroup)=>{

    this.variablesGroups = this.variablesGroups.filter((variablesGroup:VariablesGroup)=>{
      return(variablesGroup.name != vg.name)
   })
    this.variablesGroup$.next(this.variablesGroups)
  }

  modifyVariableGroup = (vg:VariablesGroup)=>{
   let objIndex = this.variablesGroups.findIndex(((obj:VariablesGroup) => obj.name == vg.name));
    this.variablesGroups[objIndex].variables = vg.variables
    this.variablesGroup$.next(this.variablesGroups)
  }





}
