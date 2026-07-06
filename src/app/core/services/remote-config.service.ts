import { inject, Injectable } from '@angular/core';
import { fetchAndActivate, RemoteConfig } from '@angular/fire/remote-config';
import { getBoolean } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {

  private remoteConfig = inject(RemoteConfig);

  public async loadRemoteConfig() {
    this.remoteConfig.settings = {
      fetchTimeoutMillis:2000,
      minimumFetchIntervalMillis: 0
    };
    await fetchAndActivate(this.remoteConfig);
  }

  public newTheme(): boolean {
    return getBoolean(this.remoteConfig,'theme');
  }
}
