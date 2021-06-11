import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeCategoriaSigiloService} from '@cdk/services/modalidade-categoria-sigilo.service';
import {CdkModalidadeCategoriaSigiloAutocompleteComponent} from './cdk-modalidade-categoria-sigilo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeCategoriaSigiloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeCategoriaSigiloService,
    ],
    exports: [
        CdkModalidadeCategoriaSigiloAutocompleteComponent
    ]
})
export class CdkModalidadeCategoriaSigiloAutocompleteModule {
}
