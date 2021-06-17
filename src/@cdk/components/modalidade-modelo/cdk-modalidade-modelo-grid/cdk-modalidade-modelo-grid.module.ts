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
import {ModalidadeModeloService} from '@cdk/services/modalidade-modelo.service';
import {CdkModalidadeModeloGridComponent} from './cdk-modalidade-modelo-grid.component';
import {CdkModalidadeModeloAutocompleteModule} from '@cdk/components/modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-autocomplete.module';
import {CdkModalidadeModeloFilterModule} from '../sidebars/cdk-modalidade-modelo-filter/cdk-modalidade-modelo-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeModeloGridComponent,
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

        CdkModalidadeModeloAutocompleteModule,
        CdkModalidadeModeloFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeModeloService,
    ],
    exports: [
        CdkModalidadeModeloGridComponent
    ]
})
export class CdkModalidadeModeloGridModule {
}
