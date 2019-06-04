import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTransicaoService } from '@cdk/services/modalidade-transicao.service';
import { CdkModalidadeTransicaoGridFilterComponent } from './cdk-modalidade-transicao-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeTransicaoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTransicaoService,
    ],
    exports: [
        CdkModalidadeTransicaoGridFilterComponent
    ]
})
export class CdkModalidadeTransicaoGridFilterModule {
}
