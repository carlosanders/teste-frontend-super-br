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
import {LocalizadorService} from '@cdk/services/localizador.service';
import {CdkLocalizadorGridComponent} from './cdk-localizador-grid.component';
import {CdkLocalizadorAutocompleteModule} from '@cdk/components/localizador/cdk-localizador-autocomplete/cdk-localizador-autocomplete.module';
import {CdkLocalizadorFilterModule} from '../sidebars/cdk-localizador-filter/cdk-localizador-filter.module';

@NgModule({
    declarations: [
        CdkLocalizadorGridComponent,
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
        CdkLocalizadorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
