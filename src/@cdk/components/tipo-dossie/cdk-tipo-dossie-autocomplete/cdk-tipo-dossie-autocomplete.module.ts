import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {SetorService} from '@cdk/services/setor.service';
import {CdkTipoDossieAutocompleteComponent} from './cdk-tipo-dossie-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTipoDossieAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkTipoDossieAutocompleteComponent
    ]
})
export class CdkTipoDossieAutocompleteModule {
}
