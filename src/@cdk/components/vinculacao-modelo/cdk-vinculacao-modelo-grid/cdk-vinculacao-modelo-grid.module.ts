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
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloGridComponent} from './cdk-vinculacao-modelo-grid.component';
import {CdkVinculacaoModeloAutocompleteModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-autocomplete/cdk-vinculacao-modelo-autocomplete.module';
import {CdkVinculacaoModeloFilterModule} from '../sidebars/cdk-vinculacao-modelo-filter/cdk-vinculacao-modelo-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoModeloGridComponent,
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
        CdkVinculacaoModeloFilterModule,

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
