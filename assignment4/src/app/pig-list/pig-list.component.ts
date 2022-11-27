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
  public pigInfoName: string;
  public pigInfoLocation: string;
  public pigInfoPhoneNumber: string;
  public pigInfoPigInfo: string;
  public pigInfoExtraNotes: string;
  public pigInfoDate: string;
  public pigInfoStatus: string;

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

    this.pigInfoName = values.name;
    this.pigInfoPhoneNumber = values.phoneNumber;
    this.pigInfoPigInfo = values.pigInfo;
    this.pigInfoLocation = values.location;
    this.pigInfoExtraNotes = values.extraNote;
    this.pigInfoDate = values.timeReported;
    this.pigInfoStatus = values.status;

	}

} 
