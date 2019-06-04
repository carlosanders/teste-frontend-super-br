import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioGridFilterComponent} from './cdk-vinculacao-repositorio-grid-filter.component';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        VinculacaoRepositorioService,
    ],
    exports: [
        CdkVinculacaoRepositorioGridFilterComponent
    ]
})
export class CdkVinculacaoRepositorioGridFilterModule {
}
