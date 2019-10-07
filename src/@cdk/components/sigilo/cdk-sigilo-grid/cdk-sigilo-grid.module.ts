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

        CdkSigiloAutocompleteModule,
        CdkSigiloGridFilterModule,

        FuseSharedModule,
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
