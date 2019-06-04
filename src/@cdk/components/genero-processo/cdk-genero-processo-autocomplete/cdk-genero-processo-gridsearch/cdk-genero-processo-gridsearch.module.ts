import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {GeneroProcessoService} from '@cdk/services/genero-processo.service';
import {CdkGeneroProcessoGridsearchComponent} from './cdk-genero-processo-gridsearch.component';
import {CdkGeneroProcessoGridModule} from '@cdk/components/genero-processo/cdk-genero-processo-grid/cdk-genero-processo-grid.module';

@NgModule({
    declarations: [
        CdkGeneroProcessoGridsearchComponent
    ],
    imports: [

        CdkGeneroProcessoGridModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroProcessoService
    ],
    exports: [
        CdkGeneroProcessoGridsearchComponent
    ]
})
export class CdkGeneroProcessoGridsearchModule {
}
