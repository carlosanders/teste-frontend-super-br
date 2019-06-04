import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroAtividadeService} from '@cdk/services/genero-atividade.service';
import {CdkGeneroAtividadeGridFilterComponent} from './cdk-genero-atividade-grid-filter.component';

@NgModule({
    declarations: [
        CdkGeneroAtividadeGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        GeneroAtividadeService,
    ],
    exports: [
        CdkGeneroAtividadeGridFilterComponent
    ]
})
export class CdkGeneroAtividadeGridFilterModule {
}
