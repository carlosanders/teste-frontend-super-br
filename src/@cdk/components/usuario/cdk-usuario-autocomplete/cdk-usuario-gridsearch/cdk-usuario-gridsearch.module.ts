import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkUsuarioGridsearchComponent } from './cdk-usuario-gridsearch.component';
import { CdkUsuarioGridModule } from '@cdk/components/usuario/cdk-usuario-grid/cdk-usuario-grid.module';

@NgModule({
    declarations: [
        CdkUsuarioGridsearchComponent
    ],
    imports: [

        CdkUsuarioGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkUsuarioGridsearchComponent
    ]
})
export class CdkUsuarioGridsearchModule {
}
