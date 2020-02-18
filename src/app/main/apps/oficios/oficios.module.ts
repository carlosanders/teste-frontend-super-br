import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import * as fromGuards from 'app/main/apps/oficios/store/guards/index';
import { ProcessosStoreModule } from 'app/main/apps/oficios/store/store.module';
/*import { TarefasComponent} from 'app/main/apps/tarefas/tarefas.component';*/
/*import { TarefasMainSidebarComponent} from 'app/main/apps/tarefas/sidebars/main/main-sidebar.component';*/
import { FolderService } from '@cdk/services/folder.service';
import { ProcessoService } from '@cdk/services/processo.service';
/*import { EspecieTarefaService} from '@cdk/services/especie-tarefa.service';*/
import { SetorService } from '@cdk/services/setor.service';
import { UsuarioService } from '@cdk/services/usuario.service';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { ResizableModule } from 'angular-resizable-element';
import { CdkProcessoGridComponent} from '@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.component';
/*import { CdkTarefaListModule } from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.module';
import { CdkTarefaFormModule } from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';*/
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CdkEtiquetaChipsModule } from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import { DndModule } from 'ngx-drag-drop';
import { LoginService } from '../../auth/login/login.service';
import { OficiosComponent } from './oficios.component';
import { CdkProcessoGridModule } from '@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.module';

const routes: Routes = [
    {
        path: '',
        component: OficiosComponent,
        children: [
            // {
            //     path: '',
            //     // loadChildren: () => import('./tarefa-empty/tarefa-empty.module').then(m => m.TarefaEmptyModule)
            // }
        ]
        /*canActivate: [fromGuards.ResolveGuard]*/
    }/*,
    {
        path: '**',
        redirectTo: 'entrada'
    }*/
];

@NgModule({
    declarations: [
        OficiosComponent
        /*OficiosMainSidebarComponent*/
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

        DndModule,

        CdkProcessoGridModule,

        CdkEtiquetaChipsModule,

        TranslateModule,

        ResizableModule,

        PipesModule,

        InfiniteScrollModule,

        FuseSharedModule,
        FuseSidebarModule,

        ProcessosStoreModule
    ],
    providers: [
        FolderService,
        ProcessoService,

        SetorService,
        UsuarioService,
        LoginService,

    ]
})
export class OficiosModule {
}
