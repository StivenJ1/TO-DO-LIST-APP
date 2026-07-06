import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonInput, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CategoryInterface } from 'src/app/core/models/task.interface';
import { GlobalService } from 'src/app/core/services/global.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CategoryViewComponent } from "src/app/shared/category-view/category-view.component";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonButton,
            CategoryViewComponent,
            IonModal,
            ReactiveFormsModule,
            IonInput],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent  {

  private globalSrv = inject(GlobalService);
  private fb = inject(FormBuilder);
  private toastSrv = inject(ToastService);
  private router = inject(Router);

  protected categoryList: WritableSignal<CategoryInterface[]> = signal([]);
  protected showModalCreate: boolean = false;
  protected showModalEdit: boolean = false;
  private categoryCreate!: CategoryInterface;
  private categoryEdit!: CategoryInterface;

  protected formCreate: FormGroup = this.fb.group({
    nameCategory: ['', Validators.required]
  })

  protected formEdit: FormGroup = this.fb.group({
    nameCategory: ['', Validators.required]
  })

  constructor(){
    effect(() => {
      this.globalSrv.categoryList();
      this.categoryList.set(this.globalSrv.categoryList());
    })
  }

  ngOnInit() {    
    this.categoryList.set(this.globalSrv.categoryList());
  }

  protected createCategory(){
    if(!this.formCreate.valid){
     this.toastSrv.showAlert('Por favor, complete todos los campos requeridos.', 'danger');
     return this.formCreate.markAllAsTouched();
    }
    this.categoryCreate = {
      id: Date.now(),
      name: this.formCreate.value.nameCategory!
    }
    this.globalSrv.saveCategoryList(this.categoryCreate);
    this.showModalCreate = false;
    this.toastSrv.showAlert('La categoria ha sido creada correctamente.', 'success');
  }

  protected selectEditCategory(category: CategoryInterface){
    this.categoryEdit = category;
    console.log(this.categoryEdit, category);
    
    this.formEdit.patchValue({
      nameCategory: category.name
    })
    this.showModalEdit = true;
  }

  protected editCategory() {
    if(!this.formEdit.valid){
     this.toastSrv.showAlert('Por favor, complete todos los campos requeridos.', 'danger');
     return this.formEdit.markAllAsTouched();
    } 
    this.categoryEdit = {
      ...this.categoryEdit,
      name: this.formEdit.value.nameCategory!
      }
    this.categoryList.update(categorys =>
      categorys.map(category =>
        category.id === this.categoryEdit.id
          ? {
              ...category,
              ...this.categoryEdit
            }
          : category
      )
    );
    this.globalSrv.saveStorageCategoryList(this.categoryList());
    this.toastSrv.showAlert('La categoria ha sido editada correctamente.', 'success');
    this.showModalEdit = false;
  }

  protected redirect() {
    this.router.navigate(['/home']);
  }

  protected createModal(){
    this.showModalCreate = true;
    this.formCreate.reset();
  }

}
