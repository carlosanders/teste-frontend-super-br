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
import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {CdkModalidadeInteressadoAutocompleteModule} from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-autocomplete.module';
import {CdkInteressadoGridComponent} from './cdk-interessado-grid.component';
import {CdkInteressadoGridFilterModule} from '../sidebars/cdk-interessado-grid-filter/cdk-interessado-grid-filter.module';
import {CdkInteressadoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkInteressadoGridComponent,
        CdkInteressadoMainSidebarComponent,
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

        CdkModalidadeInteressadoAutocompleteModule,
        CdkInteressadoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        ModalidadeInteressadoService,
    ],
    exports: [
        CdkInteressadoGridComponent
    ]
})
export class CdkInteressadoGridModule {
}
