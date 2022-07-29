import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {CdkVinculacaoEtiquetaAcoesDialogComponent} from './cdk-vinculacao-etiqueta-acoes-dialog.component';
import {CdkAcaoListModule} from '../../acao/cdk-acao-list/cdk-acao-list.module';
import {CdkAcaoGridModule} from '../../acao/cdk-acao-grid/cdk-acao-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaAcoesDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        CdkSharedModule,
        CdkAcaoListModule,
        CdkAcaoGridModule,
    ],
    entryComponents: [
        CdkVinculacaoEtiquetaAcoesDialogComponent
    ],
    exports: [
        CdkVinculacaoEtiquetaAcoesDialogComponent
    ]
})
export class CdkVinculacaoEtiquetaAcoesDialogModule {
}
