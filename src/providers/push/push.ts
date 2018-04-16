import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the PushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushProvider {
    constructor(private push: Push, private http: HttpClient, private alertCtrl: AlertController) {}

    setup() {
        const pushObject: PushObject = this.push.init({
            android: {},
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false',
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push',
            },
        } as PushOptions);

        pushObject.on('registration').subscribe((registration: any) => {
            this.http.post('http://app.dev/', registration);
        });

        pushObject.on('notification').subscribe((notification: any) => {
            const alert = this.alertCtrl.create({
                title: notification.title,
                subTitle: notification.message,
                buttons: ['Dismiss'],
            });
            alert.present();
        });
    }
}
