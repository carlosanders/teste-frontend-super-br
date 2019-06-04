import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieSetorService } from '@cdk/services/especie-setor.service';
import { CdkEspecieSetorGridFilterComponent } from './cdk-especie-setor-grid-filter.component';

@NgModule({
    declarations: [
        CdkEspecieSetorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieSetorService,
    ],
    exports: [
        CdkEspecieSetorGridFilterComponent
    ]
})
export class CdkEspecieSetorGridFilterModule {
}
