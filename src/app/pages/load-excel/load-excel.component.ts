import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as XLSX from 'xlsx';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'load-excel',
  templateUrl: './load-excel.component.html',
  styleUrls: ['./load-excel.component.css']
})
export class LoadXlsxComponent implements OnInit {


  csvRecords: any[] = [];
  header = false;
  interval:any
  fileName:Observable<String>
  options: any;
  arrayBuffer: any;
  filelist: any[] = [];
  form: any;
  propsTab: { key: string; value: any; }[];
  selectedValue: any;
  propsObject: XLSX.Properties;
  selectedKey: any;
  file_infos_tab: any[];
  propsObject2: any;
  selectedKey2: any;
  selectedValue2: any;

  

  constructor(
    private  changeDetectorRef: ChangeDetectorRef,
    private dataService:DataService,
    private store:Store) {
      this.selectedValue = ""
      this.selectedKey = ""
      this.propsTab = []
      this.file_infos_tab = []
      this.fileName = new Observable()

      this.store.pipe(take(1)).subscribe((data:any)=>{

     
  })
 

  }



  @ViewChild('xlsxReader', { static: false }) fileImportInput: any;

  ngOnInit(){

    this.dataService.file_infos$.subscribe((data:File)=>{
      console.log("file_infos",data)
      if(!(Object.keys(data).length === 0
      && Object.getPrototypeOf(data) === Object.prototype)){
        this.propsObject2 = {name:data.name,size:formatBytes(data.size,1)}
        this.file_infos_tab = Object.keys(this.propsObject2).map(k=>{
          return {key:k,value:this.propsObject2[k]}
        })
      }
    

      console.log("file_infos_tab",this.file_infos_tab,Object.keys(data))

      this.changeDetectorRef.markForCheck()
    })

    this.dataService.workBooksProps$.subscribe((data)=>{

      console.log(data)
      this.propsObject = {...data,...this.propsObject2}
      this.propsTab = [...this.file_infos_tab,...Object.keys(data).map(k=>{
        return {key:k,value:data[k]}
      })]
      if(this.selectedKey != ""){
        this.selectedValue =  this.propsObject[this.selectedKey]

      }
      
    })
   
  }
  
  selectProp = (key)=>{

    console.log(key)
    this.selectedKey = key
    this.selectedValue = this.propsObject[key]

  }

  selectProp2 = (key)=>{

    console.log(key)
    this.selectedKey2 = key
    this.selectedValue2 = this.propsObject2[key]

  }

  // Your applications input change listener for the CSV File
  uploadListener($event): void {

    // Select the files from the event
    const files = $event.srcElement.files;
    //console.log('files', files);
    if(files.length > 0 ){
      console.log(files)

      this.dataService.file_infos$.next(files[0])

      //this.store.dispatch(updateFileSize({data:formatBytes(files[0].size)}))
      let fileReader = new FileReader();    
      fileReader.readAsArrayBuffer(files[0]);     
      fileReader.onload = (e) => {    
          this.arrayBuffer = fileReader.result;    
          var data = new Uint8Array(this.arrayBuffer);    
          var arr = new Array();    
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
          var bstr = arr.join("");    
          var workbook = XLSX.read(bstr, {type:"binary"});    

          this.dataService.workBooks$.next([workbook])



          var first_sheet_name = workbook.SheetNames[0];    
          var worksheet_var = workbook.Sheets[first_sheet_name]; 
          let variables = XLSX.utils.sheet_to_json(worksheet_var,{raw:true})

          console.log("variables");
          console.log(variables);
         // this.dataService.variablesdd$.next(variables)
          var sec_sheet_name = workbook.SheetNames[1];    
          var worksheet_cat = workbook.Sheets[sec_sheet_name];  
          let categories = XLSX.utils.sheet_to_json(worksheet_cat,{raw:true})  
          console.log(categories);   
          //this.dataService.categoriesdd$.next(categories)
      }    
    }
    // Parse the file you want to select for the operation along with the configuration
    
  }



  

  
}

function formatBytes(bytes:any, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

