import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeCategoriaSigiloService } from '@cdk/services/modalidade-categoria-sigilo.service';
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

        FuseSharedModule,
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
