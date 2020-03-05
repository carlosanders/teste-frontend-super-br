import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {RepresentanteService} from '@cdk/services/representante.service';
import {CdkRepresentanteGridsearchComponent} from './cdk-representante-gridsearch.component';
import {CdkRepresentanteGridModule} from '@cdk/components/representante/cdk-representante-grid/cdk-representante-grid.module';

@NgModule({
    declarations: [
        CdkRepresentanteGridsearchComponent
    ],
    imports: [

        CdkRepresentanteGridModule,

        CdkSharedModule,
    ],
    providers: [
        RepresentanteService
    ],
    exports: [
        CdkRepresentanteGridsearchComponent
    ]
})
export class CdkRepresentanteGridsearchModule {
}
