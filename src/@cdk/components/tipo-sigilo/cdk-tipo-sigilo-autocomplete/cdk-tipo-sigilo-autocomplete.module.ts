import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {CdkTipoSigiloAutocompleteComponent} from './cdk-tipo-sigilo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTipoSigiloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TipoSigiloService,
    ],
    exports: [
        CdkTipoSigiloAutocompleteComponent
    ]
})
export class CdkTipoSigiloAutocompleteModule {
}
