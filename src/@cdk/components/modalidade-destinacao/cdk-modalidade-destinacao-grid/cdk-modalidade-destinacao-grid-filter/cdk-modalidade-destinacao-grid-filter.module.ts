import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeDestinacaoService } from '@cdk/services/modalidade-destinacao.service';
import { CdkModalidadeDestinacaoGridFilterComponent } from './cdk-modalidade-destinacao-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeDestinacaoGridFilterComponent,
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
        CdkModalidadeDestinacaoGridFilterComponent
    ]
})
export class CdkModalidadeDestinacaoGridFilterModule {
}
