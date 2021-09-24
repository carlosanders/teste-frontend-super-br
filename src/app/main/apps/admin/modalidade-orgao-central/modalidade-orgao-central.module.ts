import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalidadeOrgaoCentralComponent} from './modalidade-orgao-central.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {LoginService} from '../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ModalidadeOrgaoCentralComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./modalidade-orgao-central-list/modalidade-orgao-central-list.module').then(m => m.ModalidadeOrgaoCentralListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./modalidade-orgao-central-edit/modalidade-orgao-central-edit.module').then(m => m.ModalidadeOrgaoCentralEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/admin/modalidade-orgao-central';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ModalidadeOrgaoCentralComponent],
    imports: [
        CommonModule,
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
        CdkSharedModule,
    ],
    providers: [
        LoginService
    ]
})
export class ModalidadeOrgaoCentralModule {
}
