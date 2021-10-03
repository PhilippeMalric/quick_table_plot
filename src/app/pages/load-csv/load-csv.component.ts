import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as XLSX from 'xlsx';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';


@Component({
  selector: 'load-csv',
  templateUrl: './load-csv.component.html',
  styleUrls: ['./load-csv.component.css']
})
export class LoadCsvComponent implements OnInit {


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
  varNames: any;
  nbEntree: any;
  myData: any;
  name = ""
  waiting = false

  constructor(
    private  changeDetectorRef: ChangeDetectorRef,
    private dataService:DataService,
    private ngxCsvParser: NgxCsvParser,
    private store:Store) {
      this.selectedValue = ""
      this.selectedKey = ""
      this.propsTab = []
      this.file_infos_tab = []
      this.fileName = new Observable()

      this.store.pipe(take(1)).subscribe((data:any)=>{

     
  })
 

  }



  @ViewChild('csvReader', { static: false }) fileImportInput: any;

  ngOnInit(){

    this.dataService.file_infos$.subscribe((data)=>{

      this.name = data.name


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
  uploadListener($event: any): void {
    this.waiting = true
    // Select the files from the event
    const files = $event.srcElement.files;
    console.log('files', files);
    if(files.length > 0 ){
      //this.store.dispatch(updateFileName({data:files[0].name}))
      //this.store.dispatch(updateFileSize({data:formatBytes(files[0].size)}))

      this.dataService.file_infos$.next(files[0])
    }
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        console.log('---------------Result', result);

        this.varNames = result[0]

        this.nbEntree = this.varNames.length

        this.myData = this.varNames.map((e,i)=>{
          
          let nbNA = result.slice(1,this.nbEntree).filter((row)=>{

           return (row[i] == "" || row[i] == "NA")

          }).length
          //console.log(nbNA)
          return {pcNA: (nbNA / this.nbEntree),name:e}

        })
        this.waiting = false
        console.log("---------------myData")
        console.log(this.myData)
        this.csvRecords = result
        this.dataService.dataset$.next(result)
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
      
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

