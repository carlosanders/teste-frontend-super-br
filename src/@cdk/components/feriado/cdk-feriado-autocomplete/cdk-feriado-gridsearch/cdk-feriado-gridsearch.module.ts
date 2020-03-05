import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoGridsearchComponent} from './cdk-feriado-gridsearch.component';
import {CdkFeriadoGridModule} from '@cdk/components/feriado/cdk-feriado-grid/cdk-feriado-grid.module';

@NgModule({
    declarations: [
        CdkFeriadoGridsearchComponent
    ],
    imports: [

        CdkFeriadoGridModule,

        CdkSharedModule,
    ],
    providers: [
        FeriadoService
    ],
    exports: [
        CdkFeriadoGridsearchComponent
    ]
})
export class CdkFeriadoGridsearchModule {
}
