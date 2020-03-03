import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaComponent} from "./arquivista.component";
import {RouterModule, Routes} from "@angular/router";
import {RealizarTransicaoComponent} from "./realizar-transicao/realizar-transicao.component";

const routes: Routes = [
    {
        path: '',
        component: ArquivistaComponent
    },
    {
        path: ':processoHandler/realizar-transicao',
        component: RealizarTransicaoComponent
    }
]


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
