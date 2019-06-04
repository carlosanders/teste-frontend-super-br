import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkUsuarioGridFilterComponent } from './cdk-usuario-grid-filter.component';

@NgModule({
    declarations: [
        CdkUsuarioGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkUsuarioGridFilterComponent
    ]
})
export class CdkUsuarioGridFilterModule {
}
