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
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {CdkTipoSigiloGridComponent} from './cdk-tipo-sigilo-grid.component';
import {CdkTipoSigiloAutocompleteModule} from '@cdk/components/tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module';
import {CdkTipoSigiloFilterModule} from '../sidebars/cdk-tipo-sigilo-filter/cdk-tipo-sigilo-filter.module';

@NgModule({
    declarations: [
        CdkTipoSigiloGridComponent,
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

        CdkTipoSigiloAutocompleteModule,
        CdkTipoSigiloFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        TipoSigiloService,
    ],
    exports: [
        CdkTipoSigiloGridComponent
    ]
})
export class CdkTipoSigiloGridModule {
}
