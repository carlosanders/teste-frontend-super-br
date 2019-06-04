import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoGridsearchComponent} from './cdk-transicao-gridsearch.component';
import {CdkTransicaoGridModule} from '@cdk/components/transicao/cdk-transicao-grid/cdk-transicao-grid.module';

@NgModule({
    declarations: [
        CdkTransicaoGridsearchComponent
    ],
    imports: [

        CdkTransicaoGridModule,

        FuseSharedModule,
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
