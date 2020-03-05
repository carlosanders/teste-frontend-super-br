import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCheckboxModule, MatIconModule,
    MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
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

        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCardComponent
    ]
})
export class CdkComponenteDigitalCardModule {
}
