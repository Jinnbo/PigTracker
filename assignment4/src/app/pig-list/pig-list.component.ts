import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PigService } from '../pig.service';
import { Pig } from '../Pig';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {

  public pigs;

  constructor(private ps: PigService,private modalService: NgbModal){
    this.pigs = [];    
  }
  
  ngOnInit(): void {
    this.ps.getPigs().subscribe((data:any)=>{
      this.pigs = data
    })
  }
  
  open(content, values) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
	}

} 
