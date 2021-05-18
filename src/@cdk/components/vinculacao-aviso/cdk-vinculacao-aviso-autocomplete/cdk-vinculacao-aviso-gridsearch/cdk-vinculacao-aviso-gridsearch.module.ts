import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoAvisoService} from '@cdk/services/vinculacao-aviso.service';
import {CdkVinculacaoAvisoGridsearchComponent} from './cdk-vinculacao-aviso-gridsearch.component';
import {CdkVinculacaoAvisoGridModule} from '@cdk/components/vinculacao-aviso/cdk-vinculacao-aviso-grid/cdk-vinculacao-aviso-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoAvisoGridsearchComponent
    ],
    imports: [
        CdkVinculacaoAvisoGridModule,
        CdkSharedModule,
    ],
    providers: [
        VinculacaoAvisoService
    ],
    exports: [
        CdkVinculacaoAvisoGridsearchComponent
    ]
})
export class CdkVinculacaoAvisoGridsearchModule {
}
