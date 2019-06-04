import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoGridFilterComponent} from './cdk-transicao-grid-filter.component';

@NgModule({
    declarations: [
        CdkTransicaoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        TransicaoService,
    ],
    exports: [
        CdkTransicaoGridFilterComponent
    ]
})
export class CdkTransicaoGridFilterModule {
}
