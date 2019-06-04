import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {CdkVinculacaoUsuarioGridFilterComponent} from './cdk-vinculacao-usuario-grid-filter.component';

@NgModule({
    declarations: [
        CdkVinculacaoUsuarioGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        VinculacaoUsuarioService,
    ],
    exports: [
        CdkVinculacaoUsuarioGridFilterComponent
    ]
})
export class CdkVinculacaoUsuarioGridFilterModule {
}
