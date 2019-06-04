import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoGridFilterComponent} from './cdk-historico-grid-filter.component';

@NgModule({
    declarations: [
        CdkHistoricoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        HistoricoService,
    ],
    exports: [
        CdkHistoricoGridFilterComponent
    ]
})
export class CdkHistoricoGridFilterModule {
}
