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
import {FuseSharedModule} from '@fuse/shared.module';
import {PessoaComponent} from './pessoa.component';
import {RouterModule, Routes} from '@angular/router';
import {PessoaService} from '@cdk/services/pessoa.service';
import { FuseSidebarModule } from '@fuse/components';
import { PessoaMainSidebarComponent } from './sidebars/main/main-sidebar.component';

const routes: Routes = [
    {
        path: '',
        component: PessoaComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './pessoa-list/pessoa-list.module#PessoaListModule',
            },
            {
                path       : 'editar',
                loadChildren: './pessoa-edit/pessoa-edit.module#PessoaEditModule',
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        PessoaComponent,
        PessoaMainSidebarComponent
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
        FuseSidebarModule
    ],
    providers: [
        PessoaService,
    ],
    exports: [
        PessoaComponent
    ]
})
export class PessoaModule {
}
