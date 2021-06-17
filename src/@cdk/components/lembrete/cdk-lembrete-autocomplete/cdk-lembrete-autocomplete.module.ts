import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteAutocompleteComponent} from './cdk-lembrete-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkLembreteAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        LembreteService,
    ],
    exports: [
        CdkLembreteAutocompleteComponent
    ]
})
export class CdkLembreteAutocompleteModule {
}
