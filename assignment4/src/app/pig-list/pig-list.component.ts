import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PigService } from '../pig.service';
import { Pig } from '../Pig';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {

  public pigs;
  public pigInfoName: string;
  public pigInfoLocation: string;
  public pigInfoLatitude: string;
  public pigInfoLongitude: string;
  public pigInfoPhoneNumber: string;
  public pigInfoPigInfo: string;
  public pigInfoExtraNotes: string;
  public pigInfoDate: string;
  public pigInfoStatus: string;
  form: FormGroup;

  password: boolean = false;
  htmlContent = '';

  constructor(private ps: PigService,private modalService: NgbModal){
    this.pigs = [];    

    let formControls = {
      password: new FormControl('',[
				Validators.required
			]),
		}

		this.form = new FormGroup(formControls);
  }

  checkPassword(content,form){

    let actual: string = form.value;
    let expected: string = "OINK!!";

    if (actual === expected){
      this.modalService.dismissAll();   
      this.password = true;   
    }
    else{
      this.htmlContent = '<div class="text-danger">Incorrect Password</div>';
      this.password = false;   
    }
  }

  ngOnInit(): void {

    this.ps.refreshNeeded$.subscribe(()=>{
      this.ps.getPigs().subscribe((data:any)=>{
        this.pigs = data
      })
    })

    this.ps.getPigs().subscribe((data:any)=>{
      this.pigs = data
    })
  }
  
  openInfo(content, values) {
		this.modalService.open(content, { ariaLabelledBy: 'Infomodal' }).result;
    
    this.pigInfoName = values.name;
    this.pigInfoPhoneNumber = values.phoneNumber;
    this.pigInfoPigInfo = values.pigInfo;
    this.pigInfoLocation = values.location;
    this.pigInfoExtraNotes = values.extraNote;
    this.pigInfoDate = values.timeReported;
    this.pigInfoStatus = values.status;
    this.pigInfoLatitude = parseFloat(values.latitude).toFixed(10);
    this.pigInfoLongitude = parseFloat(values.longitude).toFixed(10);
	}
  
  openDelete(content, values){
    this.form.reset();

    this.modalService.open(content, { ariaLabelledBy: 'deleteModal' }).result;

    this.pigInfoName = values.name;
    this.pigInfoPhoneNumber = values.phoneNumber;
    this.pigInfoPigInfo = values.pigInfo;
    this.pigInfoLocation = values.location;
    this.pigInfoExtraNotes = values.extraNote;
    this.pigInfoDate = values.timeReported;
    this.pigInfoStatus = values.status;
  }

  onSubmit(values){

    if (this.password){
      this.ps.deletePig(this.pigInfoName);

      console.log(values);
      console.log(this.pigInfoName);
    }
	}


  formReset(){
		this.form.reset();
	}
} 
