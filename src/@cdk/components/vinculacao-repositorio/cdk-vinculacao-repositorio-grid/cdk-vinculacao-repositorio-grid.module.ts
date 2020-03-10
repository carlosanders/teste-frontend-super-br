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
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioGridComponent} from './cdk-vinculacao-repositorio-grid.component';
import {CdkVinculacaoRepositorioAutocompleteModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-autocomplete/cdk-vinculacao-repositorio-autocomplete.module';
import {CdkVinculacaoRepositorioGridFilterModule} from './cdk-vinculacao-repositorio-grid-filter/cdk-vinculacao-repositorio-grid-filter.module';
import {CdkVinculacaoRepositorioMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioGridComponent,
        CdkVinculacaoRepositorioMainSidebarComponent,
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
        CdkVinculacaoRepositorioGridFilterModule,

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
