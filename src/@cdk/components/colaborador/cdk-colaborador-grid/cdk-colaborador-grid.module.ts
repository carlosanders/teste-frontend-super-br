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
import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {CdkModalidadeColaboradorAutocompleteModule} from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-autocomplete/cdk-modalidade-colaborador-autocomplete.module';
import {CdkColaboradorGridComponent} from './cdk-colaborador-grid.component';
import {CdkColaboradorGridFilterModule} from '../sidebars/cdk-colaborador-grid-filter/cdk-colaborador-grid-filter.module';
import {CdkColaboradorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkColaboradorGridComponent,
        CdkColaboradorMainSidebarComponent,
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
        CdkColaboradorGridFilterModule,

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
