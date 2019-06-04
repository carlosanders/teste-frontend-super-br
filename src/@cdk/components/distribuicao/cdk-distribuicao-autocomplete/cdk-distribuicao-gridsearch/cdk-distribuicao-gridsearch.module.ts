import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {CdkDistribuicaoGridsearchComponent} from './cdk-distribuicao-gridsearch.component';
import {CdkDistribuicaoGridModule} from '@cdk/components/distribuicao/cdk-distribuicao-grid/cdk-distribuicao-grid.module';

@NgModule({
    declarations: [
        CdkDistribuicaoGridsearchComponent
    ],
    imports: [

        CdkDistribuicaoGridModule,

        FuseSharedModule,
    ],
    providers: [
        DistribuicaoService
    ],
    exports: [
        CdkDistribuicaoGridsearchComponent
    ]
})
export class CdkDistribuicaoGridsearchModule {
}
