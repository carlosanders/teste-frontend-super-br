import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkProcessoModalClassificacaoRestritaComponent} from './cdk-processo-modal-classificacao-restrita.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';

@NgModule({
    declarations: [
        CdkProcessoModalClassificacaoRestritaComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,

        CdkSharedModule,
    ],
    entryComponents: [
        CdkProcessoModalClassificacaoRestritaComponent
    ],
    exports: [
        CdkProcessoModalClassificacaoRestritaComponent
    ]
})
export class CdkProcessoModalClassificacaoRestritaModule {
}
