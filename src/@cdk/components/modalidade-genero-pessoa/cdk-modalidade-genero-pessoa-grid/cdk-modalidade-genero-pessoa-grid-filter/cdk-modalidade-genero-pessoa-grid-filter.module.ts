import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeGeneroPessoaService } from '@cdk/services/modalidade-genero-pessoa.service';
import { CdkModalidadeGeneroPessoaGridFilterComponent } from './cdk-modalidade-genero-pessoa-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeGeneroPessoaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeGeneroPessoaService,
    ],
    exports: [
        CdkModalidadeGeneroPessoaGridFilterComponent
    ]
})
export class CdkModalidadeGeneroPessoaGridFilterModule {
}
