import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeModeloService } from '@cdk/services/modalidade-modelo.service';
import { CdkModalidadeModeloGridFilterComponent } from './cdk-modalidade-modelo-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeModeloGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeModeloService,
    ],
    exports: [
        CdkModalidadeModeloGridFilterComponent
    ]
})
export class CdkModalidadeModeloGridFilterModule {
}
