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
import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {CdkOrigemDadosGridComponent} from './cdk-origem-dados-grid.component';
import {CdkOrigemDadosAutocompleteModule} from '@cdk/components/origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkOrigemDadosGridFilterModule} from './cdk-origem-dados-grid-filter/cdk-origem-dados-grid-filter.module';

@NgModule({
    declarations: [
        CdkOrigemDadosGridComponent
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

        FuseSharedModule,
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
