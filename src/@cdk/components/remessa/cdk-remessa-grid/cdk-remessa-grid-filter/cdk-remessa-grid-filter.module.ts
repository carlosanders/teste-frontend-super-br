import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkRemessaGridFilterComponent} from './cdk-remessa-grid-filter.component';

@NgModule({
    declarations: [
        CdkRemessaGridFilterComponent,
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
        CdkRemessaGridFilterComponent
    ]
})
export class CdkRemessaGridFilterModule {
}
