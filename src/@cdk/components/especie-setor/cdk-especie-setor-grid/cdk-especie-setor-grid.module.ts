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
import {CdkEspecieSetorFilterModule} from '../sidebars/cdk-especie-setor-filter/cdk-especie-setor-filter.module';
import {CdkEspecieSetorMainSidebarComponent} from './sidebars/main/main.component';
import {MatTooltipModule} from '@angular/material/tooltip';

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
        CdkEspecieSetorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
