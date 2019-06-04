import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeRepositorioService } from '@cdk/services/modalidade-repositorio.service';
import {CdkModalidadeRepositorioAutocompleteComponent} from './cdk-modalidade-repositorio-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeRepositorioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeRepositorioService,
    ],
    exports: [
        CdkModalidadeRepositorioAutocompleteComponent
    ]
})
export class CdkModalidadeRepositorioAutocompleteModule {
}
