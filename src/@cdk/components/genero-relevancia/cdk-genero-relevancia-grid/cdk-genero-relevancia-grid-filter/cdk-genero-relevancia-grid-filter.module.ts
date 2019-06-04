import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {CdkGeneroRelevanciaGridFilterComponent} from './cdk-genero-relevancia-grid-filter.component';

@NgModule({
    declarations: [
        CdkGeneroRelevanciaGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        GeneroRelevanciaService,
    ],
    exports: [
        CdkGeneroRelevanciaGridFilterComponent
    ]
})
export class CdkGeneroRelevanciaGridFilterModule {
}
