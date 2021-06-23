import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {CdkLocalizadorAutocompleteComponent} from './cdk-localizador-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkLocalizadorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        LocalizadorService,
    ],
    exports: [
        CdkLocalizadorAutocompleteComponent
    ]
})
export class CdkLocalizadorAutocompleteModule {
}
