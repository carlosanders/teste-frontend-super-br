import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components/widget/widget.module';
import {PainelComponent} from './painel.component';
import {LoginService} from '../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {WidgetsModule} from 'widgets/widgets.module';
import {DirectivesModule} from '@cdk/directives/directives';

const routes: Routes = [
    {
        path: '**',
        component: PainelComponent
    }
];

const path = 'app/main/apps/painel';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        PainelComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        DirectivesModule,
        CdkSharedModule,
        CdkWidgetModule,
        WidgetsModule,
    ],
    providers: [
        LoginService
    ]
})
export class PainelModule {
}

