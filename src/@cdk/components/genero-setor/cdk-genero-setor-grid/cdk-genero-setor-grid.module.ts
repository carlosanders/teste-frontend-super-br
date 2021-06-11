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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroSetorService} from '@cdk/services/genero-setor.service';
import {CdkGeneroSetorGridComponent} from './cdk-genero-setor-grid.component';
import {CdkGeneroSetorAutocompleteModule} from '@cdk/components/genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkGeneroSetorFilterModule} from '../sidebars/cdk-genero-setor-filter/cdk-genero-setor-filter.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkGeneroSetorGridComponent,
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

        CdkGeneroSetorAutocompleteModule,
        CdkGeneroSetorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        GeneroSetorService,
    ],
    exports: [
        CdkGeneroSetorGridComponent
    ]
})
export class CdkGeneroSetorGridModule {
}
