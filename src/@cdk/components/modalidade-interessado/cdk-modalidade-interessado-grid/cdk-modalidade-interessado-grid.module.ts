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
import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {CdkModalidadeInteressadoGridComponent} from './cdk-modalidade-interessado-grid.component';
import {CdkModalidadeInteressadoAutocompleteModule} from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-autocomplete.module';
import {CdkModalidadeInteressadoFilterModule} from '../sidebars/cdk-modalidade-interessado-filter/cdk-modalidade-interessado-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeInteressadoGridComponent,
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

        CdkModalidadeInteressadoAutocompleteModule,
        CdkModalidadeInteressadoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeInteressadoService,
    ],
    exports: [
        CdkModalidadeInteressadoGridComponent
    ]
})
export class CdkModalidadeInteressadoGridModule {
}
