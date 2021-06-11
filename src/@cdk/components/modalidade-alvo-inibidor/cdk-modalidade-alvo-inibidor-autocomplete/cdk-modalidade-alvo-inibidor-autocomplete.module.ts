import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeAlvoInibidorService} from '@cdk/services/modalidade-alvo-inibidor.service';
import {CdkModalidadeAlvoInibidorAutocompleteComponent} from './cdk-modalidade-alvo-inibidor-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeAlvoInibidorService,
    ],
    exports: [
        CdkModalidadeAlvoInibidorAutocompleteComponent
    ]
})
export class CdkModalidadeAlvoInibidorAutocompleteModule {
}
