import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkUsuarioGridsearchComponent} from './cdk-usuario-gridsearch.component';
import {CdkUsuarioGridModule} from '@cdk/components/usuario/cdk-usuario-grid/cdk-usuario-grid.module';

@NgModule({
    declarations: [
        CdkUsuarioGridsearchComponent
    ],
    imports: [
        CdkUsuarioGridModule,
        CdkSharedModule,
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
