import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieDocumentoAvulsoComponent} from './especie-documento-avulso.component';
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
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: EspecieDocumentoAvulsoComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./especie-documento-avulso-list/especie-documento-avulso-list.module').then(m => m.EspecieDocumentoAvulsoListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./especie-documento-avulso-edit/especie-documento-avulso-edit.module').then(m => m.EspecieDocumentoAvulsoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/admin/especie-documento-avulso';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [EspecieDocumentoAvulsoComponent],
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
    providers: []
})
export class EspecieDocumentoAvulsoModule {
}
