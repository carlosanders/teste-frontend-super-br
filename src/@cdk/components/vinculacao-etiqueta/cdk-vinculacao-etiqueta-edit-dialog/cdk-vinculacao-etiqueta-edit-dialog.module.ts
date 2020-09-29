import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoEtiquetaEditDialogComponent} from './cdk-vinculacao-etiqueta-edit-dialog.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule, MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';

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

        CdkSharedModule,
        MatCheckboxModule,
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
