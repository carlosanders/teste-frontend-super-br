import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RepresentanteService} from '@cdk/services/representante.service';
import {CdkRepresentanteGridFilterComponent} from './cdk-representante-grid-filter.component';

@NgModule({
    declarations: [
        CdkRepresentanteGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        RepresentanteService,
    ],
    exports: [
        CdkRepresentanteGridFilterComponent
    ]
})
export class CdkRepresentanteGridFilterModule {
}
