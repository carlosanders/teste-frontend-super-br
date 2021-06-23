import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {RedistribuicaoEditBlocoComponent} from './redistribuicao-edit-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {RedistribuicaoEditBlocoStoreModule} from './store/store.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkProcessoGridModule} from '@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.module';
import {ModalAvisoRestricaoNupModule} from '../modal-aviso-restricao-nup/modal-aviso-restricao-nup.module';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
    {
        path: '',
        component: RedistribuicaoEditBlocoComponent
    }
];

@NgModule({
    declarations: [
        RedistribuicaoEditBlocoComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatListModule,

        CdkTarefaFormModule,
        CdkProcessoGridModule,

        RedistribuicaoEditBlocoStoreModule,

        TranslateModule,
        ModalAvisoRestricaoNupModule,
        MatDialogModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        TarefaService
    ]
})
export class RedistribuicaoEditBlocoModule {
}
