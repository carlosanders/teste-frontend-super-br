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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {CdkTipoSigiloGridComponent} from './cdk-tipo-sigilo-grid.component';
import {CdkTipoSigiloAutocompleteModule} from '@cdk/components/tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module';
import {CdkTipoSigiloGridFilterModule} from './cdk-tipo-sigilo-grid-filter/cdk-tipo-sigilo-grid-filter.module';

@NgModule({
    declarations: [
        CdkTipoSigiloGridComponent
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
        CdkTipoSigiloAutocompleteModule,
        FuseSharedModule,
        CdkTipoSigiloGridFilterModule
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
