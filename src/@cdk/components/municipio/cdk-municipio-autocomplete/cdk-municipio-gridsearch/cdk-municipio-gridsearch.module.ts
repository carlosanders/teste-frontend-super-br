import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {MunicipioService} from '@cdk/services/municipio.service';
import {CdkMunicipioGridsearchComponent} from './cdk-municipio-gridsearch.component';
import {CdkMunicipioGridModule} from '@cdk/components/municipio/cdk-municipio-grid/cdk-municipio-grid.module';

@NgModule({
    declarations: [
        CdkMunicipioGridsearchComponent
    ],
    imports: [

        CdkMunicipioGridModule,

        CdkSharedModule,
    ],
    providers: [
        MunicipioService
    ],
    exports: [
        CdkMunicipioGridsearchComponent
    ]
})
export class CdkMunicipioGridsearchModule {
}
