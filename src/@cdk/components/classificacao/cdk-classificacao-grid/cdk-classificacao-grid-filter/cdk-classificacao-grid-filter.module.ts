import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeDestinacaoService } from '@cdk/services/modalidade-destinacao.service';
import { CdkClassificacaoGridFilterComponent } from './cdk-classificacao-grid-filter.component';

@NgModule({
    declarations: [
        CdkClassificacaoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
    ],
    exports: [
        CdkClassificacaoGridFilterComponent
    ]
})
export class CdkClassificacaoGridFilterModule {
}
