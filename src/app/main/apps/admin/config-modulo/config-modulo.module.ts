import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ConfigModuloComponent} from './config-modulo.component';
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
import {modulesConfig} from 'modules/modules-config';
import {CdkSharedModule} from '@cdk/shared.module';
import {MonacoEditorModule} from '@materia-ui/ngx-monaco-editor';
import {ConfigModuloListModule} from './config-modulo-list/config-modulo-list.module';
import {ConfigModuloEditModule} from './config-modulo-edit/config-modulo-edit.module';

const routes: Routes = [
    {
        path: '',
        component: ConfigModuloComponent,
        data: {
            breadcrumb: {
                label: 'config-modulo',
                url: 'listar',
                module: 'admin'
            }
        },
        children: [
            {
                path: 'listar',
                loadChildren: () =>
                    import('./config-modulo-list/config-modulo-list.module')
                        .then(m => m.ConfigModuloListModule),
            },
            {
                path: 'editar',
                loadChildren: () =>
                    import('./config-modulo-edit/config-modulo-edit.module')
                        .then(m => m.ConfigModuloEditModule),
            },
            {
                path: 'editar_admin',
                loadChildren: () =>
                    import('./config-modulo-edit-admin/config-modulo-edit-admin.module')
                        .then(m => m.ConfigModuloEditAdminModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];

const path = 'app/main/apps/admin/config-modulo';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ConfigModuloComponent],
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
        MonacoEditorModule
    ],
    providers: [

    ]
})
export class ConfigModuloModule {
}
