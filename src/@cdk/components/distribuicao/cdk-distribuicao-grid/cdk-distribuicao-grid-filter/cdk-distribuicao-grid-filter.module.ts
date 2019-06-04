import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {CdkDistribuicaoGridFilterComponent} from './cdk-distribuicao-grid-filter.component';

@NgModule({
    declarations: [
        CdkDistribuicaoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        DistribuicaoService,
    ],
    exports: [
        CdkDistribuicaoGridFilterComponent
    ]
})
export class CdkDistribuicaoGridFilterModule {
}
