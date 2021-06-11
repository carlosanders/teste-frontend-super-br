import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {CdkAfastamentoAutocompleteComponent} from './cdk-afastamento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAfastamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AfastamentoService,
    ],
    exports: [
        CdkAfastamentoAutocompleteComponent
    ]
})
export class CdkAfastamentoAutocompleteModule {
}
