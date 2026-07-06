import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CategoryInterface, TaskInterface } from '../models/task.interface';
import { StorageService } from './storage.service';
import { StorageKeys } from '../models/storage-keys.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private storageSrv = inject(StorageService);

  public taskList: WritableSignal<TaskInterface[]> = signal([]);
  public categoryList: WritableSignal<CategoryInterface[]> = signal([]);

  public saveTaskList(taskList: TaskInterface){
    this.taskList().push(taskList);
    this.saveStorageTaskList(this.taskList());
  }

  public saveCategoryList(categoryList: CategoryInterface){
    this.categoryList().push(categoryList);
    this.saveStorageCategoryList(this.categoryList());
  }

  public saveStorageTaskList(taskList: TaskInterface[]){
    this.taskList.set(taskList);
    this.storageSrv.saveLocalStorage(StorageKeys.TASK_LIST, this.taskList());
  }

  public saveStorageCategoryList(categoryList: CategoryInterface[]){
    this.categoryList.set(categoryList);
    this.storageSrv.saveLocalStorage(StorageKeys.CATEGORY_LIST, this.categoryList());
  }
  
  public getStorageTaskList(){
    const taskLst = this.storageSrv.getLocalStorage(StorageKeys.TASK_LIST);
    if(taskLst == null) return;
    this.taskList.set(taskLst);
  }

  public getStorageCategoryList(){
    const categoryLst = this.storageSrv.getLocalStorage(StorageKeys.CATEGORY_LIST);
    if(categoryLst == null) return;
    this.categoryList.set(categoryLst);
  }

  public initStorage(){
    this.getStorageTaskList();
    this.getStorageCategoryList();
  }


}
