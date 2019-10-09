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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorGridComponent} from './cdk-setor-grid.component';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridFilterModule} from './cdk-setor-grid-filter/cdk-setor-grid-filter.module';

@NgModule({
    declarations: [
        CdkSetorGridComponent
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

        FuseSharedModule,
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
