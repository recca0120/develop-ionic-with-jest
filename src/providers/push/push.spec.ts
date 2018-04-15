import {Push, PushObject, PushOptions} from '@ionic-native/push';
import { PushProvider } from './push';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingBackend } from '@angular/common/http/testing/src/backend';

describe('推播測試', () => {
  it ('推播測試', () => {
    const push: Push = new Push();
    const backend: HttpClientTestingBackend = new HttpClientTestingBackend;
    const httpClient: HttpClient = new HttpClient(backend);
    const pushObject: PushObject = new PushObject(options);

    spyOn(push, 'init').and.returnValue(pushObject);
    spyOn(pushObject, 'on').and.returnValue({
      subscribe: (cb: Function) => {
        cb({
          registrationId: 'foo',
          registrationType: 'APN',
        });
      }
    })

    const pushProvider: PushProvider = new PushProvider(push, httpClient);
    pushProvider.setup();
  })
});
