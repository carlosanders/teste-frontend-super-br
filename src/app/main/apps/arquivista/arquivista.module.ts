import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaComponent} from './arquivista.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaComponent,
        children: [
            {
                path: ':processoHandle/realizar-transicao',
                loadChildren: () => import('./realizar-transicao/realizar-transicao.module').then(m => m.RealizarTransicaoModule)
            }
        ]
    }
];


@NgModule({
    declarations: [
        ArquivistaComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        ArquivistaComponent
    ]
})
export class ArquivistaModule {
}
