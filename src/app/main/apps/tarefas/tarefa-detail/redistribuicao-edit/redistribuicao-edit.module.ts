import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {PipesModule} from '@cdk/pipes/pipes.module';

import {RedistribuicaoEditComponent} from './redistribuicao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {TarefasStoreModule} from '../../store/store.module';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {CdkVisibilidadePluginModule} from '@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.module';

const routes: Routes = [
    {
        path       : '',
        component  : RedistribuicaoEditComponent
    }
];

@NgModule({
    declarations   : [
        RedistribuicaoEditComponent
    ],
    imports        : [

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

        CdkTarefaFormModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,

        PipesModule,
        MatDialogModule,
        CdkVisibilidadePluginModule,

        TarefasStoreModule,
    ],
    providers      : [
    ]
})
export class RedistribuicaoEditModule
{
}
