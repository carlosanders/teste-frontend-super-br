import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AcaoService } from '@cdk/services/acao.service';
import { CdkAcaoGridFilterComponent } from './cdk-acao-grid-filter.component';

@NgModule({
    declarations: [
        CdkAcaoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        AcaoService,
    ],
    exports: [
        CdkAcaoGridFilterComponent
    ]
})
export class CdkAcaoGridFilterModule {
}
