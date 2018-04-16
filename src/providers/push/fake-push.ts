import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';

export class FakePush {
    init() {
        return this;
    }

    on(event: string) {
        switch (event) {
            case 'registration':
                return of({
                    registrationId: 'foo',
                    registrationType: 'APN',
                });

            case 'notification':
                return of({
                    message: '訊息內容',
                    title: '訊息標題',
                }).pipe(delay(2900));
        }
    }
}
