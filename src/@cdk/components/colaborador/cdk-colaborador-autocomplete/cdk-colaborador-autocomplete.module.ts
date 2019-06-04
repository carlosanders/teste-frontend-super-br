import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ColaboradorService } from '@cdk/services/colaborador.service';
import {CdkColaboradorAutocompleteComponent} from './cdk-colaborador-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkColaboradorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ColaboradorService,
    ],
    exports: [
        CdkColaboradorAutocompleteComponent
    ]
})
export class CdkColaboradorAutocompleteModule {
}
