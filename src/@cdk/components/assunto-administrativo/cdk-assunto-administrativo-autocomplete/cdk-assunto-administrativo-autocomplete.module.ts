import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {CdkAssuntoAdministrativoAutocompleteComponent} from './cdk-assunto-administrativo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAssuntoAdministrativoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoAdministrativoAutocompleteComponent
    ]
})
export class CdkAssuntoAdministrativoAutocompleteModule {
}
