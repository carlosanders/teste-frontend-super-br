import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalGridFilterComponent} from './cdk-relacionamento-pessoal-grid-filter.component';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        RelacionamentoPessoalService,
    ],
    exports: [
        CdkRelacionamentoPessoalGridFilterComponent
    ]
})
export class CdkRelacionamentoPessoalGridFilterModule {
}
