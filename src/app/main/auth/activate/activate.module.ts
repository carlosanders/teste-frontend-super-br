import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressBarModule} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CdkSharedModule} from '@cdk/shared.module';
import {ActivateComponent} from './activate.component';
import {ActivateStoreModule} from './store/store.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import * as fromGuards from '../../auth/activate/store/guards';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
    {
        path: ':cpfHandle/:tokenHandle',
        component: ActivateComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ActivateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        MatIconModule,
        MatProgressBarModule,
        CdkSharedModule,
        ActivateStoreModule,
        MatProgressSpinnerModule
    ],
    providers: [
        UsuarioService,
        fromGuards.ResolveGuard
    ]
})

export class ActivateModule
{
}
