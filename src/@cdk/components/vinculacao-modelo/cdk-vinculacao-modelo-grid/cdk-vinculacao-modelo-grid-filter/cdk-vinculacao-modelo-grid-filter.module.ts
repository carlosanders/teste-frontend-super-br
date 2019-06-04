import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloGridFilterComponent} from './cdk-vinculacao-modelo-grid-filter.component';

@NgModule({
    declarations: [
        CdkVinculacaoModeloGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        VinculacaoModeloService,
    ],
    exports: [
        CdkVinculacaoModeloGridFilterComponent
    ]
})
export class CdkVinculacaoModeloGridFilterModule {
}
