import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkColaboradorAutocompleteComponent} from './cdk-colaborador-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkColaboradorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ColaboradorService,
    ],
    exports: [
        CdkColaboradorAutocompleteComponent
    ]
})
export class CdkColaboradorAutocompleteModule {
}
