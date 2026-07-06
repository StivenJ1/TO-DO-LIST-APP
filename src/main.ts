import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth } from '@angular/fire/auth';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { inject, provideAppInitializer } from '@angular/core';
import { GlobalService } from './app/core/services/global.service';
import { environment } from './environments/environment';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';

register();

export function initApp(globalSrv: GlobalService) {
  globalSrv.initStorage();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(() => {
      return initApp(inject(GlobalService));
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideRemoteConfig(() => getRemoteConfig())
  ],
});
