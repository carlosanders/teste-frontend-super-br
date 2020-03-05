import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {NomeService} from '@cdk/services/nome.service';
import {CdkNomeGridsearchComponent} from './cdk-nome-gridsearch.component';
import {CdkNomeGridModule} from '@cdk/components/nome/cdk-nome-grid/cdk-nome-grid.module';

@NgModule({
    declarations: [
        CdkNomeGridsearchComponent
    ],
    imports: [

        CdkNomeGridModule,

        CdkSharedModule,
    ],
    providers: [
        NomeService
    ],
    exports: [
        CdkNomeGridsearchComponent
    ]
})
export class CdkNomeGridsearchModule {
}
