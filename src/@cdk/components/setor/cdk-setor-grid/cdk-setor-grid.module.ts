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
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorGridComponent} from './cdk-setor-grid.component';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridFilterModule} from '../sidebars/cdk-setor-grid-filter/cdk-setor-grid-filter.module';
import {CdkSetorMainSidebarComponent} from '../sidebars/sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkSetorGridComponent,
        CdkSetorMainSidebarComponent,
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,

        CdkSetorAutocompleteModule,
        CdkSetorGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkSetorGridComponent
    ]
})
export class CdkSetorGridModule {
}
