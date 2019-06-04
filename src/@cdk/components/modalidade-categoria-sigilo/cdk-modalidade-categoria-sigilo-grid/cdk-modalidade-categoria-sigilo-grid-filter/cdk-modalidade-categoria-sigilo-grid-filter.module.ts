import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeCategoriaSigiloService } from '@cdk/services/modalidade-categoria-sigilo.service';
import { CdkModalidadeCategoriaSigiloGridFilterComponent } from './cdk-modalidade-categoria-sigilo-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeCategoriaSigiloGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeCategoriaSigiloService,
    ],
    exports: [
        CdkModalidadeCategoriaSigiloGridFilterComponent
    ]
})
export class CdkModalidadeCategoriaSigiloGridFilterModule {
}
