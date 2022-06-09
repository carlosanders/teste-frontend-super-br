import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CdkTipoRelatorioGridsearchComponent} from './cdk-tipo-relatorio-gridsearch.component';
import {CdkTipoRelatorioGridModule} from '@cdk/components/tipo-relatorio/cdk-tipo-relatorio-grid/cdk-tipo-relatorio-grid.module';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';

@NgModule({
    declarations: [
        CdkTipoRelatorioGridsearchComponent
    ],
    imports: [
        CdkTipoRelatorioGridModule,
        CdkSharedModule,
    ],
    providers: [
        TipoRelatorioService
    ],
    exports: [
        CdkTipoRelatorioGridsearchComponent
    ]
})
export class CdkTipoRelatorioGridsearchModule {
}
