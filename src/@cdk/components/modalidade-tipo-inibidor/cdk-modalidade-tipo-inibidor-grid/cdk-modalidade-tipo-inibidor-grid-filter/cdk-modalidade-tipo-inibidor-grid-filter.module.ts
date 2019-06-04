import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTipoInibidorService } from '@cdk/services/modalidade-tipo-inibidor.service';
import { CdkModalidadeTipoInibidorGridFilterComponent } from './cdk-modalidade-tipo-inibidor-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeTipoInibidorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTipoInibidorService,
    ],
    exports: [
        CdkModalidadeTipoInibidorGridFilterComponent
    ]
})
export class CdkModalidadeTipoInibidorGridFilterModule {
}
