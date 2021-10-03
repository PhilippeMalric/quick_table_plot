import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { VariablesGroup } from 'src/app/model/VariablesGroup';
import { premiereActions } from 'src/app/Ngrx/main-actions.actions';
import { DataService } from 'src/app/services/data.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  variableGroup: FormControl;
  variableList: string[];
  tables: any[];
  selections_str: any;
  selections: any;
  vgs: VariablesGroup[];

  constructor(private _formBuilder: FormBuilder,private dataService:DataService,private store:Store) { }

  ngOnInit(): void {
    this.dataService.variablesGroup$.subscribe((data:VariablesGroup[])=>{
      this.vgs = data    
    })
    this.variableList = []
    this.firstFormGroup = this._formBuilder.group({
    });
    
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      filter: [''],
      selection: ['', Validators.required]
    });

    this.secondFormGroup.valueChanges.subscribe((data)=>{

      this.variableList = this.changeFilter(data)

    })


    this.variableGroup = new FormControl();

    this.variableGroup.valueChanges.subscribe((data)=>{

      console.log(data)
      this.selections = data
      this.selections_str = data.join(" , ")

    })

    this.dataService.workBooks$.subscribe((wb:XLSX.WorkBook[])=>{

      if(wb.length > 0){
        console.log("Wb in fist component",wb[0])
        console.log(Object.keys(wb[0]))
        console.log("SheetNames",wb[0].SheetNames)
        console.log("Props",wb[0].Props)
      }

    })

    this.dataService.tables$.subscribe((data:any[])=>{
      this.tables = data

      if(data.length > 0){
        console.log("data in fist component",data)
        console.log(data[0])
        this.variableList = data[0][0]
      }
   
    })

  }

  create_group = ()=>{
  
    let vg = new VariablesGroup(this.secondFormGroup.value.name,this.variableGroup.value)
    console.log("vg",vg)
    this.dataService.addVariableGroup(vg)
    this.variableGroup.setValue([]) 
    this.secondFormGroup.setValue({name:"",filter:"",selection:[]})
  }

  changeFilter = (value)=>{

    console.log(value)
    let table_filtered = this.tables[0][0]
    if(value.name != ""){
      table_filtered = this.tables[0][0].filter((x:string)=>{
        return x.includes(value.filter)
      })
    }
    return table_filtered
    
  }

  test1(){

    this.dataService.tables$.pipe(take(1)).subscribe((data:any[])=>{
    
      console.log("test1",data)
    
    })

    this.store.dispatch(premiereActions())

  }




}
