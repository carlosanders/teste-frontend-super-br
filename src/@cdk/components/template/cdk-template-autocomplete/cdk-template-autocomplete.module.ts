import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateAutocompleteComponent} from './cdk-template-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTemplateAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        TemplateService,
    ],
    exports: [
        CdkTemplateAutocompleteComponent
    ]
})
export class CdkTemplateAutocompleteModule {
}
