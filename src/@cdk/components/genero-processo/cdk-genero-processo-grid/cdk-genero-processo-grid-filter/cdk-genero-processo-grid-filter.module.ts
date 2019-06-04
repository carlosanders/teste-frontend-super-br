import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroProcessoService} from '@cdk/services/genero-processo.service';
import {CdkGeneroProcessoGridFilterComponent} from './cdk-genero-processo-grid-filter.component';

@NgModule({
    declarations: [
        CdkGeneroProcessoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        GeneroProcessoService,
    ],
    exports: [
        CdkGeneroProcessoGridFilterComponent
    ]
})
export class CdkGeneroProcessoGridFilterModule {
}
