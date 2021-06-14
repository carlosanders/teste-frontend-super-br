import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '../..';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioGridComponent} from './cdk-vinculacao-repositorio-grid.component';
import {CdkVinculacaoRepositorioAutocompleteModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-autocomplete/cdk-vinculacao-repositorio-autocomplete.module';
import {CdkVinculacaoRepositorioFilterModule} from '../sidebars/cdk-vinculacao-repositorio-filter/cdk-vinculacao-repositorio-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkVinculacaoRepositorioAutocompleteModule,
        CdkVinculacaoRepositorioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
