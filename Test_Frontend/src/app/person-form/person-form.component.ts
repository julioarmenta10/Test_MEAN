import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  titleAlert: string = 'This field is required';
  post: any = '';
  formGroup!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
    , private formBuilder: FormBuilder, private RestService: RestService, private dialogRef: MatDialog) { }
  ngOnInit() {
    this.createForm();
    console.log(this.data);
    if (this.data) {
      this.formGroup.setValue({
        name: this.data.name,
        lastname: this.data.lastname,
        curp: this.data.curp,
        weight: this.data.weight,
        tall: this.data.tall,
        gender: this.data.gender,
        zone: this.data.zone,
        validate: ''
      });
    }
    // this.setChangeValidate()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'weight': [null, Validators.required],
      'tall': [null, Validators.required],
      'gender': [null, Validators.required],

      'zone': [null, [Validators.required]],
      'curp': [null, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],

      'validate': ''
    });
  }



  get name() {
    return this.formGroup.get('name') as FormControl
  }




  onSubmit(post: any) {
    if (!this.data) {
      this.RestService.post('http://localhost:8000/api/persons/create', post)
        .subscribe((response: any) => {
          this.post = post;
          this.dialogRef.closeAll();

        });
    } else {
      this.RestService.put(`http://localhost:8000/api/persons/update/${this.data._id}`, post)
        .subscribe((response: any) => {
          this.post = post;
          this.dialogRef.closeAll();

        });
    }

  }

}
