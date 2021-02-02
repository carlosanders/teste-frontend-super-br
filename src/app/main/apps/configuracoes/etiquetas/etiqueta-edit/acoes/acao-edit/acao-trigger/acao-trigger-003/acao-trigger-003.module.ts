import {NgModule} from '@angular/core';
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
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {AcaoTrigger003Component} from './acao-trigger-003.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {CommonModule} from "@angular/common";
import {CdkAcaoTrigger003Module} from "@cdk/components/acao/cdk-acao-trigger/cdk-acao-trigger-003/cdk-acao-trigger-003.module";
import * as fromGuards from "./store/guards";
import {ModalidadeAcaoEtiquetaService} from "@cdk/services/modalidade-acao-etiqueta.service";
import {AcaoTriggerStoreModule} from "../store/store.module";

const routes: Routes = [
    {
        path: 'trigger',
        component: AcaoTrigger003Component,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/acoes/acao-edit/acao-trigger/acao-trigger-003';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcaoTrigger003Component
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
        CommonModule,
        TranslateModule,
        CdkSharedModule,
        AcaoTriggerStoreModule,
        CdkAcaoTrigger003Module
    ],
    providers: [
        fromGuards.ResolveGuard,
        ModalidadeAcaoEtiquetaService
    ]
})
export class AcaoTrigger003Module {
}
