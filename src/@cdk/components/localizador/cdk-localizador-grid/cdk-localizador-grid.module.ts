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
import {LocalizadorService} from '@cdk/services/localizador.service';
import {CdkLocalizadorGridComponent} from './cdk-localizador-grid.component';
import {CdkLocalizadorAutocompleteModule} from '@cdk/components/localizador/cdk-localizador-autocomplete/cdk-localizador-autocomplete.module';
import {CdkLocalizadorGridFilterModule} from './cdk-localizador-grid-filter/cdk-localizador-grid-filter.module';

@NgModule({
    declarations: [
        CdkLocalizadorGridComponent
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

        CdkLocalizadorAutocompleteModule,
        CdkLocalizadorGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        LocalizadorService,
    ],
    exports: [
        CdkLocalizadorGridComponent
    ]
})
export class CdkLocalizadorGridModule {
}
