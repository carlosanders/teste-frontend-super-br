import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatProgressSpinnerModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import { ArquivistaComponent } from './arquivista.component';
import { CommonModule } from '@angular/common';
import {ArquivistaMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import * as fromGuards from './arquivista-list/store/guards';
import {ProcessoService} from '@cdk/services/processo.service';
import { ArquivistaDetailComponent } from './arquivista-detail/arquivista-detail.component';
const routes: Routes = [
    {
        path       : '',
        component: ArquivistaComponent,
        children: [
            {
                path       : ':unidadeHandle/:typeHandle',
                loadChildren: () => import('./arquivista-list/arquivista-list.module').then(m => m.ArquivistaListModule)
            }
        ]
    }
];

@NgModule({
    declarations   : [
        ArquivistaComponent,
        ArquivistaMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),
        CdkEtiquetaChipsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule
    ],
    providers      : [
        fromGuards.ResolveGuard,
        ProcessoService
    ]
})
export class ArquivistaModule
{
}
