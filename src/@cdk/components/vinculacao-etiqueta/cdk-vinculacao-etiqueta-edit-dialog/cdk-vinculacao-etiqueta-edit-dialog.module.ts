import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkVinculacaoEtiquetaEditDialogComponent} from './cdk-vinculacao-etiqueta-edit-dialog.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule, MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaEditDialogComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatInputModule,
        MatProgressSpinnerModule,

        FuseSharedModule,
    ],
    entryComponents: [
        CdkVinculacaoEtiquetaEditDialogComponent
    ],
    exports: [
        CdkVinculacaoEtiquetaEditDialogComponent
    ]
})
export class CdkVinculacaoEtiquetaEditDialogModule {
}
