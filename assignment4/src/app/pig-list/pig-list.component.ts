import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PigService } from '../pig.service';
import { Pig } from '../Pig';

@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {

  public pigs;

  constructor(private ps: PigService){
    this.pigs = [];    
  }
  
  ngOnInit(): void {
    this.ps.getPigs().subscribe((data:any)=>{
      this.pigs = data
      //console.log(this.pigs[0].data[0].name)
    })
  }
  

} 
