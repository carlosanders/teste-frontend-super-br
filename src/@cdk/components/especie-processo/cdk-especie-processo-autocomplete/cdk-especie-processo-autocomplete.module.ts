import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieProcessoService } from '@cdk/services/especie-processo.service';
import {CdkEspecieProcessoAutocompleteComponent} from './cdk-especie-processo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieProcessoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieProcessoService,
    ],
    exports: [
        CdkEspecieProcessoAutocompleteComponent
    ]
})
export class CdkEspecieProcessoAutocompleteModule {
}
