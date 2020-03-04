import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {InteressadoService} from '@cdk/services/interessado.service';
import {CdkInteressadoGridsearchComponent} from './cdk-interessado-gridsearch.component';
import {CdkInteressadoGridModule} from '@cdk/components/interessado/cdk-interessado-grid/cdk-interessado-grid.module';

@NgModule({
    declarations: [
        CdkInteressadoGridsearchComponent
    ],
    imports: [

        CdkInteressadoGridModule,

        CdkSharedModule,
    ],
    providers: [
        InteressadoService
    ],
    exports: [
        CdkInteressadoGridsearchComponent
    ]
})
export class CdkInteressadoGridsearchModule {
}
