import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RemoteConfigService } from './core/services/remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  
  private remoteConfSrv = inject(RemoteConfigService);

  ngOnInit() {
    this.initData();
  }

  private async initData() {
    await this.remoteConfSrv.loadRemoteConfig();
    if(this.remoteConfSrv.newTheme()){
      document.documentElement.classList.add('theme-green');
    }else{
      document.documentElement.classList.remove('theme-green');
    }
  }
}
