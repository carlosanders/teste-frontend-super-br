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
import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {CdkOrigemDadosGridComponent} from './cdk-origem-dados-grid.component';
import {CdkOrigemDadosAutocompleteModule} from '@cdk/components/origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkOrigemDadosFilterModule} from '../sidebars/cdk-origem-dados-filter/cdk-origem-dados-filter.module';

@NgModule({
    declarations: [
        CdkOrigemDadosGridComponent,
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

        CdkOrigemDadosAutocompleteModule,
        CdkOrigemDadosFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        OrigemDadosService,
    ],
    exports: [
        CdkOrigemDadosGridComponent
    ]
})
export class CdkOrigemDadosGridModule {
}
