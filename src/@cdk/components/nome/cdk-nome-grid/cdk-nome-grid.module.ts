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
import {NomeService} from '@cdk/services/nome.service';
import {CdkNomeGridComponent} from './cdk-nome-grid.component';
import {CdkNomeAutocompleteModule} from '@cdk/components/nome/cdk-nome-autocomplete/cdk-nome-autocomplete.module';
import {CdkNomeGridFilterModule} from './cdk-nome-grid-filter/cdk-nome-grid-filter.module';

@NgModule({
    declarations: [
        CdkNomeGridComponent
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
        CdkNomeAutocompleteModule,
        FuseSharedModule,
        CdkNomeGridFilterModule
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
