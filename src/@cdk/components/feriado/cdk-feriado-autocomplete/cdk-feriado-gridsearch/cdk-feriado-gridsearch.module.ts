import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoGridsearchComponent} from './cdk-feriado-gridsearch.component';
import {CdkFeriadoGridModule} from '@cdk/components/feriado/cdk-feriado-grid/cdk-feriado-grid.module';

@NgModule({
    declarations: [
        CdkFeriadoGridsearchComponent
    ],
    imports: [

        CdkFeriadoGridModule,

        FuseSharedModule,
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
