import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {AreaTrabalhoService} from '@cdk/services/area-trabalho.service';
import {CdkAreaTrabalhoGridsearchComponent} from './cdk-area-trabalho-gridsearch.component';
import {CdkAreaTrabalhoGridModule} from '@cdk/components/area-trabalho/cdk-area-trabalho-grid/cdk-area-trabalho-grid.module';

@NgModule({
    declarations: [
        CdkAreaTrabalhoGridsearchComponent
    ],
    imports: [

        CdkAreaTrabalhoGridModule,

        FuseSharedModule,
    ],
    providers: [
        AreaTrabalhoService
    ],
    exports: [
        CdkAreaTrabalhoGridsearchComponent
    ]
})
export class CdkAreaTrabalhoGridsearchModule {
}
