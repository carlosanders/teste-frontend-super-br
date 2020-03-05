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
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {CdkLocalizadorGridComponent} from './cdk-localizador-grid.component';
import {CdkLocalizadorAutocompleteModule} from '@cdk/components/localizador/cdk-localizador-autocomplete/cdk-localizador-autocomplete.module';
import {CdkLocalizadorGridFilterModule} from './cdk-localizador-grid-filter/cdk-localizador-grid-filter.module';
import {CdkLocalizadorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkLocalizadorGridComponent,
        CdkLocalizadorMainSidebarComponent,
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

        CdkSharedModule,
        CdkSidebarModule,
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
