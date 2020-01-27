import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkVinculacaoEtiquetaEditPluginComponent} from './cdk-vinculacao-etiqueta-edit-plugin.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaEditPluginComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,

        FuseSharedModule,
    ],
    entryComponents: [
        CdkVinculacaoEtiquetaEditPluginComponent
    ],
    exports: [
        CdkVinculacaoEtiquetaEditPluginComponent
    ]
})
export class CdkVinculacaoEtiquetaEditPluginModule {
}
