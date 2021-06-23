import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AssuntoService} from '@cdk/services/assunto.service';
import {CdkAssuntoAutocompleteComponent} from './cdk-assunto-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAssuntoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AssuntoService,
    ],
    exports: [
        CdkAssuntoAutocompleteComponent
    ]
})
export class CdkAssuntoAutocompleteModule {
}
