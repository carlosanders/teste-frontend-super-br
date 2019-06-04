import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeOrgaoCentralService } from '@cdk/services/modalidade-orgao-central.service';
import { CdkModalidadeOrgaoCentralGridFilterComponent } from './cdk-modalidade-orgao-central-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeOrgaoCentralGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeOrgaoCentralService,
    ],
    exports: [
        CdkModalidadeOrgaoCentralGridFilterComponent
    ]
})
export class CdkModalidadeOrgaoCentralGridFilterModule {
}
