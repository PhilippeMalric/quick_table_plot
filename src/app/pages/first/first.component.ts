import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { premiereActions } from 'src/app/Ngrx/main-actions.actions';
import { DataService } from 'src/app/services/data.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  firstFormGroup: any;
  secondFormGroup: any;

  constructor(private _formBuilder: FormBuilder,private dataService:DataService,private store:Store) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.dataService.workBooks$.subscribe((wb:XLSX.WorkBook[])=>{

      if(wb.length > 0){
        console.log("Wb in fist component",wb[0])
        console.log(Object.keys(wb[0]))
        console.log("SheetNames",wb[0].SheetNames)
        console.log("Props",wb[0].Props)
      }

    })

    this.dataService.tables$.subscribe((data:any[])=>{

      if(data.length > 0){
        console.log("data in fist component",data)
        console.log(Object.keys(data[0]))
  
      }
   
    })

  }


test1(){

  this.dataService.tables$.pipe(take(1)).subscribe((data:any[])=>{
  
    console.log("test1",data)
  
  })

  this.store.dispatch(premiereActions())

}




}
