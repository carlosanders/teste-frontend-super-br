import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AtividadeService} from '@cdk/services/atividade.service';
import {CdkAtividadeGridsearchComponent} from './cdk-atividade-gridsearch.component';
import {CdkAtividadeGridModule} from '@cdk/components/atividade/cdk-atividade-grid/cdk-atividade-grid.module';

@NgModule({
    declarations: [
        CdkAtividadeGridsearchComponent
    ],
    imports: [

        CdkAtividadeGridModule,

        CdkSharedModule,
    ],
    providers: [
        AtividadeService
    ],
    exports: [
        CdkAtividadeGridsearchComponent
    ]
})
export class CdkAtividadeGridsearchModule {
}
