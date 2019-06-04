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
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloGridComponent} from './cdk-sigilo-grid.component';
import {CdkSigiloAutocompleteModule} from '@cdk/components/sigilo/cdk-sigilo-autocomplete/cdk-sigilo-autocomplete.module';
import {CdkSigiloGridFilterModule} from './cdk-sigilo-grid-filter/cdk-sigilo-grid-filter.module';

@NgModule({
    declarations: [
        CdkSigiloGridComponent
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
        CdkSigiloAutocompleteModule,
        FuseSharedModule,
        CdkSigiloGridFilterModule
    ],
    providers: [
        SigiloService,
    ],
    exports: [
        CdkSigiloGridComponent
    ]
})
export class CdkSigiloGridModule {
}
