import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {CdkGrupoContatoGridsearchComponent} from './cdk-grupo-contato-gridsearch.component';
import {CdkGrupoContatoGridModule} from '@cdk/components/grupo-contato/cdk-grupo-contato-grid/cdk-grupo-contato-grid.module';

@NgModule({
    declarations: [
        CdkGrupoContatoGridsearchComponent
    ],
    imports: [

        CdkGrupoContatoGridModule,

        CdkSharedModule,
    ],
    providers: [
        GrupoContatoService
    ],
    exports: [
        CdkGrupoContatoGridsearchComponent
    ]
})
export class CdkGrupoContatoGridsearchModule {
}
