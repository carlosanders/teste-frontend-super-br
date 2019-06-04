import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeAlvoInibidorService } from '@cdk/services/modalidade-alvo-inibidor.service';
import { CdkModalidadeAlvoInibidorGridFilterComponent } from './cdk-modalidade-alvo-inibidor-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeAlvoInibidorService,
    ],
    exports: [
        CdkModalidadeAlvoInibidorGridFilterComponent
    ]
})
export class CdkModalidadeAlvoInibidorGridFilterModule {
}
