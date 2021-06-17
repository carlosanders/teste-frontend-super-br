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
import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {CdkModalidadeColaboradorAutocompleteModule} from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-autocomplete/cdk-modalidade-colaborador-autocomplete.module';
import {CdkColaboradorGridComponent} from './cdk-colaborador-grid.component';
import {CdkColaboradorFilterModule} from '../sidebars/cdk-colaborador-filter/cdk-colaborador-filter.module';

@NgModule({
    declarations: [
        CdkColaboradorGridComponent,
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

        CdkModalidadeColaboradorAutocompleteModule,
        CdkColaboradorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeColaboradorService,
    ],
    exports: [
        CdkColaboradorGridComponent
    ]
})
export class CdkColaboradorGridModule {
}
