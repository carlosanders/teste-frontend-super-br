import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesComponent} from './templates.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

const routes: Routes = [
    {
        path: '',
        component: TemplatesComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./templates-list/templates-list.module').then(m => m.TemplatesListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./templates-edit/templates-edit.module').then(m => m.TemplatesEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];

@NgModule({
    declarations: [TemplatesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CdkSharedModule,
    ]
})
export class TemplatesModule {
}
