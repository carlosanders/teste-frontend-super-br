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
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {CdkAssuntoAdministrativoAutocompleteModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import {CdkAssuntoGridComponent} from './cdk-assunto-grid.component';
import {CdkAssuntoFilterModule} from '../sidebars/cdk-assunto-filter/cdk-assunto-filter.module';
import {CdkAssuntoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkAssuntoGridComponent,
        CdkAssuntoMainSidebarComponent,
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
        MatTooltipModule,

        CdkAssuntoAdministrativoAutocompleteModule,
        CdkAssuntoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoGridComponent
    ]
})
export class CdkAssuntoGridModule {
}
