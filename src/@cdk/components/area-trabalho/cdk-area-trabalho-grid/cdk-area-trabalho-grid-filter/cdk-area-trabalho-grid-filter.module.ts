import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkAreaTrabalhoGridFilterComponent } from './cdk-area-trabalho-grid-filter.component';

@NgModule({
    declarations: [
        CdkAreaTrabalhoGridFilterComponent,
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
        CdkAreaTrabalhoGridFilterComponent
    ]
})
export class CdkAreaTrabalhoGridFilterModule {
}
