import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {EspecieRelatorioService} from '@cdk/services/especie-relatorio.service';
import {CdkEspecieRelatorioGridsearchComponent} from './cdk-especie-relatorio-gridsearch.component';
import {CdkEspecieRelatorioGridModule} from '@cdk/components/especie-relatorio/cdk-especie-relatorio-grid/cdk-especie-relatorio-grid.module';

@NgModule({
    declarations: [
        CdkEspecieRelatorioGridsearchComponent
    ],
    imports: [

        CdkEspecieRelatorioGridModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieRelatorioService
    ],
    exports: [
        CdkEspecieRelatorioGridsearchComponent
    ]
})
export class CdkEspecieRelatorioGridsearchModule {
}
