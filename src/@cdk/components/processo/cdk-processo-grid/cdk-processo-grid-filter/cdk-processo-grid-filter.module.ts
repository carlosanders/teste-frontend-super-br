import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ProcessoService } from '@cdk/services/processo.service';
import { CdkProcessoGridFilterComponent } from './cdk-processo-grid-filter.component';

@NgModule({
    declarations: [
        CdkProcessoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ProcessoService,
    ],
    exports: [
        CdkProcessoGridFilterComponent
    ]
})
export class CdkProcessoGridFilterModule {
}
