import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LembretesComponent} from './lembretes.component';
import {CdkLembreteGridModule} from '../../../../../@cdk/components/lembrete/cdk-lembrete-grid/cdk-lembrete-grid.module';
import {LembreteService} from '../../../../../@cdk/services/lembrete.service';
import {RouterModule, Routes} from '@angular/router';
import {CdkLembreteFormModule} from '../../../../../@cdk/components/lembrete/cdk-lembrete-form/cdk-lembrete-form.module';
import {LembreteStoreModule} from './store/store.module';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path       : '',
        component: LembretesComponent,
    }
];



@NgModule({
    declarations: [
        LembretesComponent
    ]
    ,
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CdkLembreteGridModule,
        CdkLembreteFormModule,
        LembreteStoreModule
    ],
    providers: [
        LembreteService,
        LoginService,
    ],
})
export class LembretesModule {
}
