import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { TesteComponent } from './teste.component';
import { TesteEditComponent } from './teste-edit/teste-edit.component';

import { TarefaService } from '@cdk/services/tarefa.service';
import { RouterModule, Routes } from '@angular/router';
import { TesteStoreModule } from 'app/main/apps/teste/store/store.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkTarefaFormModule } from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import * as fromGuards from 'app/main/apps/teste/store/guards';
import { CdkTarefaListModule } from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.module';

const routes: Routes = [
    {
        path       : '',
        component  : TesteComponent
    },
    {
        path       : 'criar',
        component  : TesteEditComponent
    },
    {
        path       : 'editar/:tarefaId',
        component  : TesteEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TesteComponent,
        TesteEditComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        FuseSharedModule,

        CdkTarefaFormModule,
        CdkTarefaListModule,

        TesteStoreModule,
    ],
    providers: [
        TarefaService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TesteEditComponent
    ]
})
export class TesteModule
{
}

