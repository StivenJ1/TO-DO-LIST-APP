import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ɵEmptyOutletComponent } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSelect, IonSelectOption, IonModal, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { CategoryInterface, TaskInterface } from 'src/app/core/models/task.interface';
import { GlobalService } from 'src/app/core/services/global.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TaskViewComponent } from 'src/app/shared/task-view/task-view.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonButton,
            IonSelect,
            IonSelectOption,
            TaskViewComponent,
            IonModal,
            ReactiveFormsModule,
            IonInput,
            IonTextarea],
})
export class HomePage {

  private router = inject(Router);
  private globalSrv = inject(GlobalService);
  private fb = inject(FormBuilder);
  private toastSrv = inject(ToastService);

  protected taskListExist = computed(() => this.globalSrv.taskList());
  protected taskList: WritableSignal<TaskInterface[]> = signal([]);
  protected categoryList: WritableSignal<CategoryInterface[]> = signal([]);
  protected filterName: WritableSignal<string> = signal("Todo");
  protected showModalEdit: boolean = false;
  private taskEdit!: TaskInterface;

  protected formEdit: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required]
  })

  
  constructor(){
    effect(() => {
      this.globalSrv.taskList();
      this.taskList.set(this.globalSrv.taskList());
    })
  }
  
  ngOnInit() {    
    this.taskList.set(this.globalSrv.taskList());
    this.categoryList.set(this.globalSrv.categoryList());
  }
  
  protected redirect(){
    this.router.navigate(['/category']);
  }

  protected redirectTask(){
    this.router.navigate(['/task']);
  }

  protected filterCategory(event: CustomEvent){
    this.taskList.set(this.globalSrv.taskList().filter(task => task.category.id === Number(event.detail.value)));
    const name = this.categoryList().find(category => category.id === event.detail.value)?.name;
    if(name != null) this.filterName.set(name);
  }

  protected editTask() {
    if(!this.formEdit.valid){
     this.toastSrv.showAlert('Por favor, complete todos los campos requeridos.', 'danger');
     return this.formEdit.markAllAsTouched();
    } 
    const categoryName = this.categoryList().find(category => category.id === Number(this.formEdit.value.category))?.name;
    this.taskEdit = {
      ...this.taskEdit,
      name: this.formEdit.value.name!,
      description: this.formEdit.value.description!,
      category: {
        id: this.formEdit.value.category,
        name: categoryName != null ? categoryName : ''
      }
    }
    this.taskList.update(tasks =>
      tasks.map(task =>
        task.id === this.taskEdit.id
          ? {
              ...task,
              ...this.taskEdit
            }
          : task
      )
    );
    this.globalSrv.saveStorageTaskList(this.taskList());
    this.toastSrv.showAlert('La tarea ha sido editada correctamente.', 'success');
    this.showModalEdit = false;
  }
  
  protected selectEditTask(task: TaskInterface){
    this.taskEdit = task;
    this.formEdit.patchValue({
      name: task.name,
      description: task.description,
      category: task.category.id
    })
    this.showModalEdit = true;
  }
}
