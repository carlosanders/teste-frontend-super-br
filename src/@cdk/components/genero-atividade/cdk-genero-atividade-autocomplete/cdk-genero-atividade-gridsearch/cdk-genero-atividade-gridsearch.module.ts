import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {GeneroAtividadeService} from '@cdk/services/genero-atividade.service';
import {CdkGeneroAtividadeGridsearchComponent} from './cdk-genero-atividade-gridsearch.component';
import {CdkGeneroAtividadeGridModule} from '@cdk/components/genero-atividade/cdk-genero-atividade-grid/cdk-genero-atividade-grid.module';

@NgModule({
    declarations: [
        CdkGeneroAtividadeGridsearchComponent
    ],
    imports: [

        CdkGeneroAtividadeGridModule,

        CdkSharedModule,
    ],
    providers: [
        GeneroAtividadeService
    ],
    exports: [
        CdkGeneroAtividadeGridsearchComponent
    ]
})
export class CdkGeneroAtividadeGridsearchModule {
}
