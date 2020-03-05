import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoGridsearchComponent} from './cdk-transicao-gridsearch.component';
import {CdkTransicaoGridModule} from '@cdk/components/transicao/cdk-transicao-grid/cdk-transicao-grid.module';

@NgModule({
    declarations: [
        CdkTransicaoGridsearchComponent
    ],
    imports: [

        CdkTransicaoGridModule,

        CdkSharedModule,
    ],
    providers: [
        TransicaoService
    ],
    exports: [
        CdkTransicaoGridsearchComponent
    ]
})
export class CdkTransicaoGridsearchModule {
}
