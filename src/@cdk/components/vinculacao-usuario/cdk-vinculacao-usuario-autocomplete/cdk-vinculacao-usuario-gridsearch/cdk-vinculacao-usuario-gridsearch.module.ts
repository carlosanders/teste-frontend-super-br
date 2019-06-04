import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {CdkVinculacaoUsuarioGridsearchComponent} from './cdk-vinculacao-usuario-gridsearch.component';
import {CdkVinculacaoUsuarioGridModule} from '@cdk/components/vinculacao-usuario/cdk-vinculacao-usuario-grid/cdk-vinculacao-usuario-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoUsuarioGridsearchComponent
    ],
    imports: [

        CdkVinculacaoUsuarioGridModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoUsuarioService
    ],
    exports: [
        CdkVinculacaoUsuarioGridsearchComponent
    ]
})
export class CdkVinculacaoUsuarioGridsearchModule {
}
