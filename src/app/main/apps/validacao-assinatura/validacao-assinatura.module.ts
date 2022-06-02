import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ValidacaoAssinaturaComponent} from './validacao-assinatura.component';
import {CdkComponenteDigitalViewModule} from '@cdk/components/componente-digital/cdk-componente-digital-view/cdk-componente-digital-view.module';
import {ValidacaoAssinaturaStoreModule} from './store/store.module';
import {MatProgressSpinnerModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';
import * as fromGuard from './store/guards'
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [
    {
        path: ':componenteDigitalHandle/:chaveAcessoHandle',
        component: ValidacaoAssinaturaComponent,
        canActivate: [fromGuard.ResolveGuard]
    }
];

const path = 'app/main/apps/validacao-assinatura';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ValidacaoAssinaturaComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CdkComponenteDigitalViewModule,
        ValidacaoAssinaturaStoreModule,
        MatProgressSpinnerModule,
        TranslateModule,
        CdkSharedModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    providers: [
        fromGuard.ResolveGuard
    ]
})
export class ValidacaoAssinaturaModule {
}
