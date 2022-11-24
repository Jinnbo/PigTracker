import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})
export class PigAddComponent implements OnInit{
	closeResult = '';

	form: FormGroup;

	constructor(private modalService: NgbModal) {

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
			]),
			date: new FormControl('',[
				Validators.required,
			])
		}

		this.form = new FormGroup(formControls);
	}
  
	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
	}

	ngOnInit(): void {
	}

}
