import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Push, PushObject, PushOptions} from '@ionic-native/push';

/*
  Generated class for the PushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushProvider {

  constructor(private push: Push, private http: HttpClient) {

  }

  setup() {
    const pushObject: PushObject = this.push.init({
      android: {},
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
   } as PushOptions);

   pushObject.on('registration').subscribe((registration: any) => console.log(registration));
  }
}
