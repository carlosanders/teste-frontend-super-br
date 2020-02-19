import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkRepositorioPluginComponent} from './cdk-repositorio-plugin.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';
import {CdkRepositorioAutocompleteModule} from '../../../../repositorio/cdk-repositorio-autocomplete/cdk-repositorio-autocomplete.module';

@NgModule({
    declarations: [
        CdkRepositorioPluginComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,
        CdkRepositorioAutocompleteModule,

        FuseSharedModule,
    ],
    entryComponents: [
        CdkRepositorioPluginComponent
    ],
    exports: [
        CdkRepositorioPluginComponent
    ]
})
export class CdkRepositorioPluginModule {
}
