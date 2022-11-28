import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { PigService } from '../pig.service';
import { PigListComponent } from '../pig-list/pig-list.component';

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})
export class PigAddComponent implements OnInit{
	closeResult = '';
	form: FormGroup;

	constructor(private modalService: NgbModal, private ps: PigService) {

		let formControls = {
			name: new FormControl('',[
				Validators.required,
			]),
			phoneNumber: new FormControl('',[
				Validators.required,
				Validators.minLength(10)
			]),
			pigInfo: new FormControl('',[
				Validators.required,
			]),
			location: new FormControl('',[
				Validators.required,
				this.locationValidator
			]),
			extraNote: new FormControl('',[
				Validators.required,
			])
		}

		this.form = new FormGroup(formControls);
	}

	locationValidator(control: FormControl){
		// if there are 2 commas then return null
		let commaCounter = 0;
		
		if (control.value != null){	
			for (let i=0;i<control.value.length;i++){
				if (control.value[i] == ',') commaCounter++;
			}
		}
		
		if (commaCounter == 2) return null;
		else return control.value;
	}
  
	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'addModal' }).result;
	}

	onSubmit(values){
		this.ps.addPigs(values);
		this.form.reset();
	}



	ngOnInit(): void {
	}

}
