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
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {AcaoTrigger001Component} from './acao-trigger-001.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {CommonModule} from "@angular/common";
import {CdkAcaoTrigger001Module} from "@cdk/components/acao/cdk-acao-form/cdk-acao-trigger/cdk-acao-trigger-001/cdk-acao-trigger-001.module";

const routes: Routes = [
    {
        path: 'trigger',
        component: AcaoTrigger001Component
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/acoes/acao-edit/acao-trigger/acao-trigger-001';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcaoTrigger001Component
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
        CdkAcaoTrigger001Module,
    ],
    providers: [
    ]
})
export class AcaoTrigger001Module {
}
