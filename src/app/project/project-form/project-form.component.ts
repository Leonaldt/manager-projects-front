import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  title: string = 'New Project';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  formRegister: FormGroup;

  loading: boolean = false;

  participants: any[] = [];

  project: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service: ProjectService
  ) {
    const _id = this.route.snapshot.params.id;

    if (_id) {
      this.service.getById(_id).subscribe(project => {
        this.project = project;
        this.title = 'Update Project';

        for (let i = 0; i < this.project.participants.length; i++) {
          this.participantControls.push(this.fb.control(this.project.participants[i]));
        }

        this.formRegister.patchValue(this.project);
      });
    }

    this.formRegister = this.fb.group({
      _id: new FormControl(undefined),
      name: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      risk: new FormControl(0, [Validators.required]),
      value: new FormControl(0.00, [Validators.required]),
      participants: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    let project: any = this.formRegister.value;

    if (!project._id)
      this.save(project);
    else
      this.update(project);
  }

  save(project: any) {
    this.loading = true;
    this.service.save(project)
      .subscribe(() => {
        this.snackBar.open('Project added.', 'OK', { duration: 2000 });
        this.router.navigate(['/projects']);
        this.loading = false;
      }, () => {
        this.snackBar.open('Error on submiting the project.', 'OK', { duration: 2000 });
        this.loading = false;
      });
  }

  update(project: any) {
    this.loading = true;
    this.service.update(project)
      .subscribe(() => {
        this.snackBar.open('Project updated.', 'OK', { duration: 2000 });
        this.router.navigate(['/projects']);
        this.loading = false;
      }, () => {
        this.snackBar.open('Error updating the project.', 'OK', { duration: 2000 });
        this.loading = false;
      });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 3) + value == 0 ? ' baixo' : value == 1 ? 'médio' : 'alto';
    }

    return value;
  }

  get participantControls(): FormArray {
    return this.formRegister.controls.participants as FormArray;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.participantControls.push(this.fb.control(value));
    }

    if (input) {
      input.value = "";
    }
  }

  remove(project: string): void {
    const index = this.participantControls.value.indexOf(project);
    if (index >= 0) {
      this.participantControls.removeAt(index);
    }
  }

  initFormArray(projects: any[]) {
    console.log(projects)
    const formArray = this.formRegister.get('participants') as FormArray;
    projects.map(project => {
      formArray.push(this.createForms(project));
    });
    this.formRegister.setControl('participants', formArray);
  }

  createForms(participant): FormGroup {
    let formGroup: FormGroup = new FormGroup({
      participant: new FormControl(participant)
    }
    );
    return formGroup;
  }
}
