import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieProcessoService } from '@cdk/services/especie-processo.service';
import { CdkEspecieProcessoGridFilterComponent } from './cdk-especie-processo-grid-filter.component';

@NgModule({
    declarations: [
        CdkEspecieProcessoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieProcessoService,
    ],
    exports: [
        CdkEspecieProcessoGridFilterComponent
    ]
})
export class CdkEspecieProcessoGridFilterModule {
}
