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
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {CdkModeloGridComponent} from './cdk-modelo-grid.component';
import {CdkModeloAutocompleteModule} from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridFilterModule} from './cdk-modelo-grid-filter/cdk-modelo-grid-filter.module';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkModeloMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModeloGridComponent,
        CdkModeloMainSidebarComponent,
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
        MatTooltipModule,

        CdkModeloAutocompleteModule,
        CdkModeloGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,

        PipesModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        CdkModeloGridComponent
    ]
})
export class CdkModeloGridModule {
}
