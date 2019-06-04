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
import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoGridComponent} from './cdk-feriado-grid.component';
import {CdkFeriadoAutocompleteModule} from '@cdk/components/feriado/cdk-feriado-autocomplete/cdk-feriado-autocomplete.module';
import {CdkFeriadoGridFilterModule} from './cdk-feriado-grid-filter/cdk-feriado-grid-filter.module';

@NgModule({
    declarations: [
        CdkFeriadoGridComponent
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
        CdkFeriadoAutocompleteModule,
        FuseSharedModule,
        CdkFeriadoGridFilterModule
    ],
    providers: [
        FeriadoService,
    ],
    exports: [
        CdkFeriadoGridComponent
    ]
})
export class CdkFeriadoGridModule {
}
