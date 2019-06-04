import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkTramitacaoGridFilterComponent} from './cdk-tramitacao-grid-filter.component';

@NgModule({
    declarations: [
        CdkTramitacaoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        TramitacaoService,
    ],
    exports: [
        CdkTramitacaoGridFilterComponent
    ]
})
export class CdkTramitacaoGridFilterModule {
}
