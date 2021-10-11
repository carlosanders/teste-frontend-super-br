import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {AtividadeCreateComponent} from './atividade-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {AtividadeCreateStoreModule} from './store/store.module';
import {AtividadeService} from '@cdk/services/atividade.service';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {DocumentoService} from '@cdk/services/documento.service';
import * as fromGuards from './store/guards';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {modulesConfig} from 'modules/modules-config';
import {CdkModeloAutocompleteModule} from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkMinutasAtividadeCardListModule} from '@cdk/components/documento/cdk-minutas-atividade-card-list/cdk-minutas-atividade-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: AtividadeCreateComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]

    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AtividadeCreateComponent
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
        MatTabsModule,
        MatBadgeModule,
        CdkComponenteDigitalCardListModule,
        CdkDocumentoCardListModule,
        CdkUploadModule,
        CdkAtividadeFormModule,
        AtividadeCreateStoreModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        CdkModeloAutocompleteModule,
        CdkMinutasAtividadeCardListModule,
    ],
    providers: [
        AtividadeService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class AtividadeCreateModule {
}
