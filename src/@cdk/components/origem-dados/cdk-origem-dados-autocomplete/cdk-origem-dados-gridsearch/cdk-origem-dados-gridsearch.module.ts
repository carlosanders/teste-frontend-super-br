import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {CdkOrigemDadosGridsearchComponent} from './cdk-origem-dados-gridsearch.component';
import {CdkOrigemDadosGridModule} from '@cdk/components/origem-dados/cdk-origem-dados-grid/cdk-origem-dados-grid.module';

@NgModule({
    declarations: [
        CdkOrigemDadosGridsearchComponent
    ],
    imports: [

        CdkOrigemDadosGridModule,

        CdkSharedModule,
    ],
    providers: [
        OrigemDadosService
    ],
    exports: [
        CdkOrigemDadosGridsearchComponent
    ]
})
export class CdkOrigemDadosGridsearchModule {
}
