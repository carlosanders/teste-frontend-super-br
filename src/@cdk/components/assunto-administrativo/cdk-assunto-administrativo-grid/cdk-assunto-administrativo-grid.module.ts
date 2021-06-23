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

import {CdkSidebarModule} from '../..';
import {CdkSharedModule} from '@cdk/shared.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {CdkAssuntoAdministrativoGridComponent} from './cdk-assunto-administrativo-grid.component';
import {CdkAssuntoAdministrativoAutocompleteModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import {CdkAssuntoAdministrativoFilterModule} from '../sidebars/cdk-assunto-administrativo-filter/cdk-assunto-administrativo-filter.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkAssuntoAdministrativoGridComponent,
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

        CdkAssuntoAdministrativoAutocompleteModule,
        CdkAssuntoAdministrativoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoAdministrativoGridComponent
    ]
})
export class CdkAssuntoAdministrativoGridModule {
}
