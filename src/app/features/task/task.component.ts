import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoryInterface, TaskInterface } from 'src/app/core/models/task.interface';
import { IonButton, IonContent, IonHeader, IonInput, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [IonHeader, 
            IonToolbar, 
            IonTitle, 
            IonContent, 
            IonTextarea, 
            IonSelect, 
            IonInput, 
            IonButton, 
            ReactiveFormsModule, 
            IonSelectOption],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  {

  private fb = inject(FormBuilder);
  private globalSrv = inject(GlobalService);
  private router = inject(Router);
  private toastSrv = inject(ToastService);
  
  private taskCreate: TaskInterface = {} as TaskInterface;
  protected categoryList: WritableSignal<CategoryInterface[]> = signal([]);

  ngOnInit() {
    this.categoryList.set(this.globalSrv.categoryList());
  }

  protected formCreate: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required]
  })

  protected createTask() {
    if(!this.formCreate.valid){
     this.toastSrv.showAlert('Por favor, complete todos los campos requeridos.', 'danger');
     return this.formCreate.markAllAsTouched();
    } 
    const categoryName = this.categoryList().find(category => category.id === Number(this.formCreate.value.category))?.name;
    this.taskCreate = {
      id: Date.now(),
      name: this.formCreate.value.name!,
      description: this.formCreate.value.description!,
      state: false,
      category: {
        id: this.formCreate.value.category,
        name: categoryName != null ? categoryName : ''
      }
    };
    this.globalSrv.saveTaskList(this.taskCreate);
    this.toastSrv.showAlert('La tarea ha sido creada correctamente.', 'success');
    this.redirect();
  }

  protected redirect() {
    this.router.navigate(['/home']);
  }
}
