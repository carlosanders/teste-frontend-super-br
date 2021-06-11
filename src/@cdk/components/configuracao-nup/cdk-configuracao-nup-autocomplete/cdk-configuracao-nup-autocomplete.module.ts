import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfiguracaoNupAutocompleteComponent} from './cdk-configuracao-nup-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ConfiguracaoNupService} from '../../../services/configuracao-nup.service';

// @ts-ignore
@NgModule({
    declarations: [
        CdkConfiguracaoNupAutocompleteComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        PipesModule,
        CdkSharedModule,
    ],
    providers: [
        ConfiguracaoNupService,
    ],
    exports: [
        CdkConfiguracaoNupAutocompleteComponent
    ]
})
export class CdkConfiguracaoNupAutocompleteModule {
}
