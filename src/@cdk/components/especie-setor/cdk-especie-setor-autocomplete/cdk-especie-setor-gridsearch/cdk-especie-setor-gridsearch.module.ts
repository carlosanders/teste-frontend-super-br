import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {CdkEspecieSetorGridsearchComponent} from './cdk-especie-setor-gridsearch.component';
import {CdkEspecieSetorGridModule} from '@cdk/components/especie-setor/cdk-especie-setor-grid/cdk-especie-setor-grid.module';

@NgModule({
    declarations: [
        CdkEspecieSetorGridsearchComponent
    ],
    imports: [

        CdkEspecieSetorGridModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieSetorService
    ],
    exports: [
        CdkEspecieSetorGridsearchComponent
    ]
})
export class CdkEspecieSetorGridsearchModule {
}
