import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieRelevanciaService } from '@cdk/services/especie-relevancia.service';
import { CdkEspecieRelevanciaGridFilterComponent } from './cdk-especie-relevancia-grid-filter.component';

@NgModule({
    declarations: [
        CdkEspecieRelevanciaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieRelevanciaService,
    ],
    exports: [
        CdkEspecieRelevanciaGridFilterComponent
    ]
})
export class CdkEspecieRelevanciaGridFilterModule {
}
