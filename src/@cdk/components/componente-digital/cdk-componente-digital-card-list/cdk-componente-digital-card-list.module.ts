import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatCardModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {CdkComponenteDigitalCardListComponent} from './cdk-componente-digital-card-list.component';
import {CdkComponenteDigitalCardModule} from './cdk-componente-digital-card/cdk-componente-digital-card.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalCardListComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCardModule,

        CdkComponenteDigitalCardModule,

        FuseSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCardListComponent
    ]
})
export class CdkComponenteDigitalCardListModule {
}
