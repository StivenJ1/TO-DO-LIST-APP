import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskInterface } from 'src/app/core/models/task.interface';
import { IonCheckbox } from "@ionic/angular/standalone";
import { GlobalService } from 'src/app/core/services/global.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [IonCheckbox],
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent {
  @Input() task!: TaskInterface;
  @Output() edit = new EventEmitter<TaskInterface>();

  private globalSrv = inject(GlobalService);
  private toastSrv = inject(ToastService);
  
  protected taskComplete(task: TaskInterface) {
    task.state = !task.state;
    let taskList = this.globalSrv.taskList();
    taskList = taskList.map(task => {
      task.id === this.task.id 
      return task
    });
    this.globalSrv.saveStorageTaskList(taskList);
    if(!task.state){
      this.toastSrv.showAlert('La tarea ha sido marcada como no completada correctamente.', 'success');
      return;
    }
    this.toastSrv.showAlert('La tarea ha sido marcada como completada correctamente.', 'success');
  }

  protected taskDelete(taskId: number){
    let taskList = this.globalSrv.taskList();
    taskList = taskList.filter(task => task.id !== taskId);
    this.globalSrv.saveStorageTaskList(taskList);
    this.toastSrv.showAlert('La tarea ha sido eliminada correctamente.', 'success');
  }

  protected openEdit(){
    this.edit.emit(this.task);
  }
}
