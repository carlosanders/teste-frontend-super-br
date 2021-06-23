import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeGridsearchComponent} from './cdk-especie-atividade-gridsearch.component';
import {CdkEspecieAtividadeGridModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-grid/cdk-especie-atividade-grid.module';

@NgModule({
    declarations: [
        CdkEspecieAtividadeGridsearchComponent
    ],
    imports: [

        CdkEspecieAtividadeGridModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieAtividadeService
    ],
    exports: [
        CdkEspecieAtividadeGridsearchComponent
    ]
})
export class CdkEspecieAtividadeGridsearchModule {
}
