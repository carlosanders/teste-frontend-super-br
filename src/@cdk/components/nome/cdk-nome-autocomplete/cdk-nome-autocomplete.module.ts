import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {NomeService} from '@cdk/services/nome.service';
import {CdkNomeAutocompleteComponent} from './cdk-nome-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkNomeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        NomeService,
    ],
    exports: [
        CdkNomeAutocompleteComponent
    ]
})
export class CdkNomeAutocompleteModule {
}
