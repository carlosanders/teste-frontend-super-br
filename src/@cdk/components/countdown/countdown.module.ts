import {NgModule} from '@angular/core';

import {CdkCountdownComponent} from './countdown.component';

@NgModule({
    declarations: [
        CdkCountdownComponent
    ],
    exports: [
        CdkCountdownComponent
    ],
})
export class CdkCountdownModule
{
}
