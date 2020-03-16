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
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloGridComponent} from './cdk-vinculacao-modelo-grid.component';
import {CdkVinculacaoModeloAutocompleteModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-autocomplete/cdk-vinculacao-modelo-autocomplete.module';
import {CdkVinculacaoModeloGridFilterModule} from './cdk-vinculacao-modelo-grid-filter/cdk-vinculacao-modelo-grid-filter.module';
import {CdkVinculacaoModeloMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoModeloGridComponent,
        CdkVinculacaoModeloMainSidebarComponent,
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

        CdkVinculacaoModeloAutocompleteModule,
        CdkVinculacaoModeloGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoModeloService,
    ],
    exports: [
        CdkVinculacaoModeloGridComponent
    ]
})
export class CdkVinculacaoModeloGridModule {
}
