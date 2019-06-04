import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaGridsearchComponent} from './cdk-juntada-gridsearch.component';
import {CdkJuntadaGridModule} from '@cdk/components/juntada/cdk-juntada-grid/cdk-juntada-grid.module';

@NgModule({
    declarations: [
        CdkJuntadaGridsearchComponent
    ],
    imports: [

        CdkJuntadaGridModule,

        FuseSharedModule,
    ],
    providers: [
        JuntadaService
    ],
    exports: [
        CdkJuntadaGridsearchComponent
    ]
})
export class CdkJuntadaGridsearchModule {
}
