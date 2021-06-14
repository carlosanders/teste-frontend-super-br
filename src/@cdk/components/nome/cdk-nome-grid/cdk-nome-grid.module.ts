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
import {NomeService} from '@cdk/services/nome.service';
import {CdkNomeGridComponent} from './cdk-nome-grid.component';
import {CdkNomeAutocompleteModule} from '@cdk/components/nome/cdk-nome-autocomplete/cdk-nome-autocomplete.module';
import {CdkNomeFilterModule} from '../sidebars/cdk-nome-filter/cdk-nome-filter.module';

@NgModule({
    declarations: [
        CdkNomeGridComponent,
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

        CdkNomeAutocompleteModule,
        CdkNomeFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        NomeService,
    ],
    exports: [
        CdkNomeGridComponent
    ]
})
export class CdkNomeGridModule {
}
