import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkCadastroIdentificadorGridFilterComponent } from './cdk-cadastro-identificador-grid-filter.component';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkCadastroIdentificadorGridFilterComponent
    ]
})
export class CdkCadastroIdentificadorGridFilterModule {
}
