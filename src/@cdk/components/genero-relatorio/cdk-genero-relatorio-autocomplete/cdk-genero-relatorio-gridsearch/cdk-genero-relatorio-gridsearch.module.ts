import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {GeneroRelatorioService} from '@cdk/services/genero-relatorio.service';
import {CdkGeneroRelatorioGridsearchComponent} from './cdk-genero-relatorio-gridsearch.component';
import {CdkGeneroRelatorioGridModule} from '@cdk/components/genero-relatorio/cdk-genero-relatorio-grid/cdk-genero-relatorio-grid.module';

@NgModule({
    declarations: [
        CdkGeneroRelatorioGridsearchComponent
    ],
    imports: [

        CdkGeneroRelatorioGridModule,

        CdkSharedModule,
    ],
    providers: [
        GeneroRelatorioService
    ],
    exports: [
        CdkGeneroRelatorioGridsearchComponent
    ]
})
export class CdkGeneroRelatorioGridsearchModule {
}
