import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VariablesGroup } from 'src/app/model/VariablesGroup';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'variables-group',
  templateUrl: './variables-group.component.html',
  styleUrls: ['./variables-group.component.scss']
})
export class VariablesGroupComponent implements OnInit {
@Input()
variablesGroup : VariablesGroup

  
  constructor(private dataService:DataService,private store:Store) { }

  ngOnInit(): void {

  

  }

  deleteVariablesGroup = ()=>{

    this.dataService.deleteVariableGroup(this.variablesGroup)

  }

}
