import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoEtiquetaEditDialogComponent} from './cdk-vinculacao-etiqueta-edit-dialog.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {
    CdkEtiquetaChipsItemModule
} from '../../etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips-item/cdk-etiqueta-chips-item.module';

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
        CdkEtiquetaChipsItemModule,
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
