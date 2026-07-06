import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { inject, provideAppInitializer } from '@angular/core';
import { GlobalService } from './app/core/services/global.service';

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
  ],
});
