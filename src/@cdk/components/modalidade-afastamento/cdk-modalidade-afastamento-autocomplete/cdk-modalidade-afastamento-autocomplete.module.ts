import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeAfastamentoService } from '@cdk/services/modalidade-afastamento.service';
import {CdkModalidadeAfastamentoAutocompleteComponent} from './cdk-modalidade-afastamento-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeAfastamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkModalidadeAfastamentoAutocompleteComponent
    ]
})
export class CdkModalidadeAfastamentoAutocompleteModule {
}
