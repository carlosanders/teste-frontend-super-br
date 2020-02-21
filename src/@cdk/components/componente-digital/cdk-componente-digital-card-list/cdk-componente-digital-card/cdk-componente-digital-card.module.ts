import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCheckboxModule, MatIconModule,
    MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkComponenteDigitalCardComponent } from './cdk-componente-digital-card.component';

@NgModule({
    declarations: [
        CdkComponenteDigitalCardComponent,
    ],
    imports: [

        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,

        FuseSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCardComponent
    ]
})
export class CdkComponenteDigitalCardModule {
}
