import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {
  wb$: any;
  sheetNames: string[];
  xlsx: typeof XLSX;
  variables: unknown[];
  wb: XLSX.WorkBook;

  constructor(private dataService:DataService,private store:Store) {

    this.xlsx = XLSX
    this.sheetNames= []

    //this.xlsx.utils.sheet_to_json()

   }

  ngOnInit(): void {

    this.dataService.workBooks$.pipe(map((data)=>{
      if(data.length > 0){
        console.log(data)
        this.wb = data[0]
        //this.wb.SheetNames
  
        this.sheetNames = this.wb.SheetNames
  
        var worksheet_var = this.wb.Sheets[this.sheetNames[0]]; 
        this.variables = XLSX.utils.sheet_to_json(worksheet_var,{raw:true})
  
        return this.wb

      }else{
        return undefined
      }

    })).subscribe()

  }

  changeWorkSheet = (sheetName)=>{
    var worksheet_var = this.wb.Sheets[sheetName]; 
    this.variables = XLSX.utils.sheet_to_json(worksheet_var,{raw:true})
    console.log("new variables",this.variables)
    this.dataService.variables$.next(this.variables)
  }


}
