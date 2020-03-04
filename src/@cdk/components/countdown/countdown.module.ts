import { NgModule } from '@angular/core';

import { CdkCountdownComponent } from '@cdk/components/countdown/countdown.component';

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
