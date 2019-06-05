import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {CdkLotacaoGridFilterComponent} from './cdk-lotacao-grid-filter.component';

@NgModule({
    declarations: [
        CdkLotacaoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        LotacaoService,
    ],
    exports: [
        CdkLotacaoGridFilterComponent
    ]
})
export class CdkLotacaoGridFilterModule {
}
