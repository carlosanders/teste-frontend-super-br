import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import { PipesModule } from '@cdk/pipes/pipes.module';

import { TarefaEditComponent } from './tarefa-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { TarefasStoreModule } from '../../store/store.module';
import { CdkTarefaFormModule } from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';

const routes: Routes = [
    {
        path       : '',
        component  : TarefaEditComponent
    }
];

@NgModule({
    declarations   : [
        TarefaEditComponent
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

        TarefasStoreModule,
    ],
    providers      : [
    ]
})
export class TarefaEditModule
{
}
