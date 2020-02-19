import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTipoInibidorService } from '@cdk/services/modalidade-tipo-inibidor.service';
import {CdkModalidadeTipoInibidorAutocompleteComponent} from './cdk-modalidade-tipo-inibidor-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeTipoInibidorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTipoInibidorService,
    ],
    exports: [
        CdkModalidadeTipoInibidorAutocompleteComponent
    ]
})
export class CdkModalidadeTipoInibidorAutocompleteModule {
}
