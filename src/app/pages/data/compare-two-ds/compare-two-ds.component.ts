import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-compare-two-ds',
  templateUrl: './compare-two-ds.component.html',
  styleUrls: ['./compare-two-ds.component.scss']
})
export class CompareTwoDsComponent implements OnInit {
 
  private svg;
  private margin = 50;
  private width = 1500 - (this.margin * 2);
  private height = 1000 - (this.margin * 2);
  private h2 = 900;
  currentIndex = 0
  data: any[];
  tables: any;
  waiting: boolean;
  constructor(
    private dataService:DataService,
    private store:Store  ) { }

  ngOnInit(): void {

    this.createSvg()
    
    this.dataService.tables$.subscribe(this.chooseTables)

  }
  ngOnChanges(): void {
  
    this.waiting = false

  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  chooseTables = (data)=>{
    if(data.length > 0){
      this.tables = data
      this.firstPlot(this.tables[0])
    }

  }

  toggleDataset = ()=>{

    this.currentIndex = (this.currentIndex +1 ) % this.tables.length
   
    this.firstPlot(this.tables[this.currentIndex])
  }

  firstPlot = (data)=>{
    this.waiting = true
    this.data = data
    if(data.length>0){
    
      console.log("data",this.data)

      if(this.svg){
        this.svg.selectAll("*").remove()
      }
  
      //let dataSplit = this.data[0].slice(1,500).map(data=>data.slice(0,100))
  
      let end = data[0].length+1<100 ?  data[0].length+1 : 100

      let dataSplit = this.data.slice(1,end)
  
      console.log("dataSplit",dataSplit)

      let na_table_t = []
      dataSplit[0].map((data,i)=>{
        na_table_t[i] = []
      })
      setTimeout(() => {
        let na_table = dataSplit.map((data,i)=>{
      
          let result = data.map((data,j)=>{

            na_table_t[j][i] =  data != "FALSE"

            return data != "FALSE"

          })
          

          return result

        }) 



      let nrow = na_table_t.length
      let ncol = na_table_t[0].length

      let px_per_cell_x = this.width / nrow
      let px_per_cell_y = this.h2 / ncol

        console.log(px_per_cell_x,px_per_cell_y)

        console.log(na_table_t)
      
        na_table_t.map((data,i)=>{
          //console.log(i)
          this.svg.selectAll()
                .data(data)
                .enter()
                .append("circle")
                .attr("class","na_cell_"+i)
                .attr("cx",(i*px_per_cell_x)+px_per_cell_x/2)
                .attr("cy",(data,j)=>(j*px_per_cell_y)+px_per_cell_y/2)
                .attr("r",(data,j)=>(data)?1:0)
                //.attr("stroke","black")
                .attr("stroke-width",1)
                .attr("fill","black")
        })

        this.waiting = false
      }, 1);
      
      
    
  }
}

secondPlot = ()=>{
    
    this.waiting = true
    console.log("data",this.data)

    if(this.svg){
      this.svg.selectAll("*").remove()
    }

    let dataSplit = this.tables[0]

    setTimeout(() => {

    let na_table_t_1 = this.calcul_na_table_t(this.tables[0])
  
    let na_table_t_2 = this.calcul_na_table_t(this.tables[1])
  

    let na_table_diff = na_table_t_1.map((data,i)=>{

      let result = dataSplit.map((data,j)=>{

        return na_table_t_1[i][j] ==   na_table_t_2[i][j]

      })
      

      return result

    }) 

    let nrow = na_table_t_1.length
    let ncol = na_table_t_1[0].length

    let px_per_cell_x = this.width / nrow
    let px_per_cell_y = this.h2 / ncol

    console.log(px_per_cell_x,px_per_cell_y)

    let longTab = []

    for(let i in na_table_diff){
      for(let j in na_table_diff[i]){
        if(!na_table_diff[i][j]){
          longTab.push({i:i,j:j,value:na_table_diff[i][j]})

        }
     
      }
    }

    console.log(longTab)

      this.svg.selectAll()
            .data(longTab)
            .enter()
            .append("circle")
            .attr("class","na_cell")
            .attr("cx",(data)=>(data.i*px_per_cell_x)+px_per_cell_x/2)
            .attr("cy",(data,j)=>(data.j*px_per_cell_y)+px_per_cell_y/2)
            .attr("r",(data,j)=>(data.value)?0:1)
            //.attr("stroke","black")
            .attr("stroke-width",1)
            .attr("fill","black")


            this.waiting = false
          }, 1);    
    
  }
  

  calcul_na_table_t = (data)=>{

      this.data = data
      let dataSplit = this.data.slice(1,this.data[0].length+1)

      //console.log("dataSplit",dataSplit)

      let na_table_t = []
      dataSplit[0].map((data,i)=>{
        na_table_t[i] = []
      })

      let na_table = dataSplit.map((data,i)=>{

        let result = data.map((data,j)=>{

          na_table_t[j][i] =  data != "FALSE"

          return data != "FALSE"

        })
        

        return result

      }) 



 

      //console.log(na_table_t)

      return na_table_t

  }

}
