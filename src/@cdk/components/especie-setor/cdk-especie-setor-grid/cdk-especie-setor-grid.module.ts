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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {CdkEspecieSetorGridComponent} from './cdk-especie-setor-grid.component';
import {CdkEspecieSetorAutocompleteModule} from '@cdk/components/especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkEspecieSetorGridFilterModule} from './cdk-especie-setor-grid-filter/cdk-especie-setor-grid-filter.module';
import {CdkEspecieSetorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkEspecieSetorGridComponent,
        CdkEspecieSetorMainSidebarComponent,
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

        CdkEspecieSetorAutocompleteModule,
        CdkEspecieSetorGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        EspecieSetorService,
    ],
    exports: [
        CdkEspecieSetorGridComponent
    ]
})
export class CdkEspecieSetorGridModule {
}
