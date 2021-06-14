import {NgModule} from '@angular/core';

import {CdkSharedModule} from '../../../../shared.module';

import {EstadoService} from '../../../../services/estado.service';
import {CdkEstadoGridsearchComponent} from './cdk-estado-gridsearch.component';
import {CdkEstadoGridModule} from '../../../estado/cdk-estado-grid/cdk-estado-grid.module';

@NgModule({
    declarations: [
        CdkEstadoGridsearchComponent
    ],
    imports: [

        CdkEstadoGridModule,

        CdkSharedModule,
    ],
    providers: [
        EstadoService
    ],
    exports: [
        CdkEstadoGridsearchComponent
    ]
})
export class CdkEstadoGridsearchModule {
}
