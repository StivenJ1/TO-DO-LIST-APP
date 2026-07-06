import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { CategoryInterface } from 'src/app/core/models/task.interface';
import { GlobalService } from 'src/app/core/services/global.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent {
  category = input.required<CategoryInterface>();
  @Output() edit = new EventEmitter<CategoryInterface>();

  private globalSrv = inject(GlobalService);
  private toastSrv = inject(ToastService);

  constructor(){
    effect(() => {
      this.category();
    })
  }

  protected categoryDelete(categoryId: number){
    let categoryList = this.globalSrv.categoryList();
    const value = this.globalSrv.taskList().some(task => task.category.id === categoryId);
    if(value){
      this.toastSrv.showAlert('No se puede eliminar la categoria ya que tiene tareas asociadas.', 'danger');
      return;
    }
    categoryList = categoryList.filter(category => category.id !== categoryId);
    this.globalSrv.saveStorageCategoryList(categoryList);
    this.toastSrv.showAlert('La categoria ha sido eliminada correctamente.', 'success');
  }

  

  protected openEdit(){
    this.edit.emit(this.category());
  }
}
