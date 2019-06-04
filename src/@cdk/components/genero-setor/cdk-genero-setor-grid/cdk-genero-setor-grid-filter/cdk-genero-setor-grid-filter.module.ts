import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroSetorService} from '@cdk/services/genero-setor.service';
import {CdkGeneroSetorGridFilterComponent} from './cdk-genero-setor-grid-filter.component';

@NgModule({
    declarations: [
        CdkGeneroSetorGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        GeneroSetorService,
    ],
    exports: [
        CdkGeneroSetorGridFilterComponent
    ]
})
export class CdkGeneroSetorGridFilterModule {
}
