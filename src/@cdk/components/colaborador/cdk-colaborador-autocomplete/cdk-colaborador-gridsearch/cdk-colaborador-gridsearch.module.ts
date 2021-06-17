import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkColaboradorGridsearchComponent} from './cdk-colaborador-gridsearch.component';
import {CdkColaboradorGridModule} from '@cdk/components/colaborador/cdk-colaborador-grid/cdk-colaborador-grid.module';

@NgModule({
    declarations: [
        CdkColaboradorGridsearchComponent
    ],
    imports: [

        CdkColaboradorGridModule,

        CdkSharedModule,
    ],
    providers: [
        ColaboradorService
    ],
    exports: [
        CdkColaboradorGridsearchComponent
    ]
})
export class CdkColaboradorGridsearchModule {
}
