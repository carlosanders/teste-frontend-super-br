import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTemplateService } from '@cdk/services/modalidade-template.service';
import {CdkModalidadeTemplateAutocompleteComponent} from './cdk-modalidade-template-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeTemplateAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTemplateService,
    ],
    exports: [
        CdkModalidadeTemplateAutocompleteComponent
    ]
})
export class CdkModalidadeTemplateAutocompleteModule {
}
