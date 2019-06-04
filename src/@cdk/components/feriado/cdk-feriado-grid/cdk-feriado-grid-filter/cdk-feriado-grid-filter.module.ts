import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoGridFilterComponent} from './cdk-feriado-grid-filter.component';

@NgModule({
    declarations: [
        CdkFeriadoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        FeriadoService,
    ],
    exports: [
        CdkFeriadoGridFilterComponent
    ]
})
export class CdkFeriadoGridFilterModule {
}
