import {NgModule} from '@angular/core';
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
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {TarefaEditComponent} from './tarefa-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {TarefaEditStoreModule} from './store/store.module';
import {TarefaService} from '@cdk/services/tarefa.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':tarefaHandle',
        component: TarefaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TarefaEditComponent
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

        CdkTarefaFormModule,

        TarefaEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TarefaService,
        fromGuards.ResolveGuard
    ]
})
export class ProcessoTarefaEditModule {
}
