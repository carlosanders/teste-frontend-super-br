import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeGarantiaService} from '@cdk/services/modalidade-garantia.service';
import {CdkGarantiaFormComponent} from './cdk-garantia-form.component';
import {CdkModalidadeGarantiaAutocompleteModule} from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-autocomplete/cdk-modalidade-garantia-autocomplete.module';
import {CdkModalidadeGarantiaGridsearchModule} from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-autocomplete/cdk-modalidade-garantia-gridsearch/cdk-modalidade-garantia-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {NgxCurrencyModule} from 'ngx-currency';
import {customCurrencyMaskConfig} from '@cdk/types/cdk-config-currency';

@NgModule({
    declarations: [
        CdkGarantiaFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkModalidadeGarantiaAutocompleteModule,
        CdkModalidadeGarantiaGridsearchModule,

        NgxUpperCaseDirectiveModule,
        CdkSharedModule,
        NgxCurrencyModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
    ],
    providers: [
        ModalidadeGarantiaService,
    ],
    exports: [
        CdkGarantiaFormComponent
    ]
})
export class CdkGarantiaFormModule {
}
