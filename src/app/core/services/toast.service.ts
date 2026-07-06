import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private toastCtrl = inject(ToastController);

  public async showAlert(message: string, color: string, duration: number = 2000) {
    const alert = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      color: color,
    });
    await alert.present();
  }  
}
