import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeAlvoInibidorService } from '@cdk/services/modalidade-alvo-inibidor.service';
import {CdkModalidadeAlvoInibidorAutocompleteComponent} from './cdk-modalidade-alvo-inibidor-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
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
