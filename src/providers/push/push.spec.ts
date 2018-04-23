import { Push, PushObject, PushOptions, PushEvent } from '@ionic-native/push';
import { PushProvider } from './push';
import { HttpClient } from '@angular/common/http';
import { FakePush } from './fake-push';
import { AlertController } from 'ionic-angular';

describe('推播測試', () => {
    const options: PushOptions = {
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
    };

    const http: any = {
        post: () => {},
    } as any;

    const alertCtrl: any = {
        present: () => {},
        create: () => {},
    } as any;

    it('推播測試', () => {
        const push: Push = new Push();
        const pushObject: PushObject = new PushObject(options);
        const pushProvider: PushProvider = new PushProvider(push, http, alertCtrl);

        spyOn(push, 'init').and.returnValue(pushObject);
        spyOn(pushObject, 'on').and.returnValues(
            {
                subscribe: (cb: Function) => {
                    cb({
                        registrationId: 'foo',
                        registrationType: 'APN',
                    });
                },
            },
            {
                subscribe: (cb: Function) => {
                    cb({
                        message: '訊息內容',
                        title: '訊息標題',
                    });
                },
            }
        );

        spyOn(http, 'post').and.callThrough();
        spyOn(alertCtrl, 'create').and.returnValue(alertCtrl);
        spyOn(alertCtrl, 'present').and.returnValue(alertCtrl);

        pushProvider.setup();

        expect(http.post).toBeCalledWith('http://app.dev/', {
            registrationId: 'foo',
            registrationType: 'APN',
        });

        expect(alertCtrl.create).toBeCalledWith({
            buttons: ['Dismiss'],
            subTitle: '訊息內容',
            title: '訊息標題',
        });
    });

    it('推播測試 fake', done => {
        const push: Push = new FakePush() as any;
        const pushProvider: PushProvider = new PushProvider(push, http, alertCtrl);

        spyOn(http, 'post').and.callThrough();
        spyOn(alertCtrl, 'create').and.returnValue(alertCtrl);
        spyOn(alertCtrl, 'present').and.returnValue(alertCtrl);

        pushProvider.setup();

        expect(http.post).toBeCalledWith('http://app.dev/', {
            registrationId: 'foo',
            registrationType: 'APN',
        });

        setTimeout(() => {
            expect(alertCtrl.create).toBeCalledWith({
                buttons: ['Dismiss'],
                subTitle: '訊息內容',
                title: '訊息標題',
            });
            done();
        }, 3000);
    });
});
