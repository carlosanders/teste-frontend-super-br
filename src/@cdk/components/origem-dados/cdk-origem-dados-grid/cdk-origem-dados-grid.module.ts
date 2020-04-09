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
import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {CdkOrigemDadosGridComponent} from './cdk-origem-dados-grid.component';
import {CdkOrigemDadosAutocompleteModule} from '@cdk/components/origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkOrigemDadosGridFilterModule} from '../sidebars/cdk-origem-dados-grid-filter/cdk-origem-dados-grid-filter.module';
import {CdkOrigemDadosMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkOrigemDadosGridComponent,
        CdkOrigemDadosMainSidebarComponent,
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
        CdkOrigemDadosGridFilterModule,

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
