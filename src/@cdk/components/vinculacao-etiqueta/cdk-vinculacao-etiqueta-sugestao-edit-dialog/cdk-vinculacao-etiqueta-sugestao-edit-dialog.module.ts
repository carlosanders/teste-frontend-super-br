import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoEtiquetaSugestaoEditDialogComponent} from './cdk-vinculacao-etiqueta-sugestao-edit-dialog.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaSugestaoEditDialogComponent
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
        CdkVinculacaoEtiquetaSugestaoEditDialogComponent
    ],
    exports: [
        CdkVinculacaoEtiquetaSugestaoEditDialogComponent
    ]
})
export class CdkVinculacaoEtiquetaSugestaoEditDialogModule {
}
