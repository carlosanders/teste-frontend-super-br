import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AreaTrabalhoService} from '@cdk/services/area-trabalho.service';
import {CdkAreaTrabalhoGridsearchComponent} from './cdk-area-trabalho-gridsearch.component';
import {CdkAreaTrabalhoGridModule} from '@cdk/components/area-trabalho/cdk-area-trabalho-grid/cdk-area-trabalho-grid.module';

@NgModule({
    declarations: [
        CdkAreaTrabalhoGridsearchComponent
    ],
    imports: [

        CdkAreaTrabalhoGridModule,

        CdkSharedModule,
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
