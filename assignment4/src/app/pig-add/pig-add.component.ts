import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})
export class PigAddComponent implements OnInit{
	closeResult = '';

	form: FormGroup;
	locationChoices: boolean;

	constructor(private modalService: NgbModal) {

		this.locationChoices = true;

		let formControls = {
			name: new FormControl('',[
				Validators.required,
			]),
			phoneNumber: new FormControl('',[
				Validators.required,
				Validators.pattern('[- +()0-9]{10,12}')
			]),
			pigInfo: new FormControl('',[
				Validators.required,
			]),
			location: new FormControl('',[
				Validators.required,
			]),
			extraNote: new FormControl('',[
				Validators.required,
			])
		}

		this.form = new FormGroup(formControls);
	}
  
	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
	}

	locationChoice(){
		this.locationChoices =  !this.locationChoices;
	}

	onSubmit(values){
		console.log(values)
	
	}

	ngOnInit(): void {
	}

}
