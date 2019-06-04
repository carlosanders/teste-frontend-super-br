import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {CdkVinculacaoProcessoGridFilterComponent} from './cdk-vinculacao-processo-grid-filter.component';

@NgModule({
    declarations: [
        CdkVinculacaoProcessoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        VinculacaoProcessoService,
    ],
    exports: [
        CdkVinculacaoProcessoGridFilterComponent
    ]
})
export class CdkVinculacaoProcessoGridFilterModule {
}
