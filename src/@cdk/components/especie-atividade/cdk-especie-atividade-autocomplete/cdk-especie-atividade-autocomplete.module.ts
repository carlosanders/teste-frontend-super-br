import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieAtividadeService } from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeAutocompleteComponent} from './cdk-especie-atividade-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieAtividadeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieAtividadeService,
    ],
    exports: [
        CdkEspecieAtividadeAutocompleteComponent
    ]
})
export class CdkEspecieAtividadeAutocompleteModule {
}
