import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioGridComponent} from './cdk-vinculacao-repositorio-grid.component';
import {CdkVinculacaoRepositorioAutocompleteModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-autocomplete/cdk-vinculacao-repositorio-autocomplete.module';
import {CdkVinculacaoRepositorioGridFilterModule} from './cdk-vinculacao-repositorio-grid-filter/cdk-vinculacao-repositorio-grid-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioGridComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkVinculacaoRepositorioAutocompleteModule,
        FuseSharedModule,
        CdkVinculacaoRepositorioGridFilterModule
    ],
    providers: [
        VinculacaoRepositorioService,
    ],
    exports: [
        CdkVinculacaoRepositorioGridComponent
    ]
})
export class CdkVinculacaoRepositorioGridModule {
}
