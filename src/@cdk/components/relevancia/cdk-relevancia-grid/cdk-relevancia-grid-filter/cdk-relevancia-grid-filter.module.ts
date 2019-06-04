import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaGridFilterComponent} from './cdk-relevancia-grid-filter.component';

@NgModule({
    declarations: [
        CdkRelevanciaGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        RelevanciaService,
    ],
    exports: [
        CdkRelevanciaGridFilterComponent
    ]
})
export class CdkRelevanciaGridFilterModule {
}
