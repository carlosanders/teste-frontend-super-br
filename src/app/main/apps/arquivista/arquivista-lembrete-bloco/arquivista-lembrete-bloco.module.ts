import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaLembreteBlocoComponent} from './arquivista-lembrete-bloco.component';
import {LembreteBlocoStoreModule} from './store/store.module';
import {RouterModule, Routes} from '@angular/router';
import {CdkLembreteFormModule} from '../../../../../@cdk/components/lembrete/cdk-lembrete-form/cdk-lembrete-form.module';
import {MatListModule} from '@angular/material/list';

const routes: Routes = [
    {
        path       : 'criar',
        component: ArquivistaLembreteBlocoComponent,
    }
];


@NgModule({
    declarations: [ArquivistaLembreteBlocoComponent],
    imports: [
        CommonModule,
        LembreteBlocoStoreModule,
        RouterModule.forChild(routes),
        CdkLembreteFormModule,
        MatListModule,
    ]
})
export class ArquivistaLembreteBlocoModule {
}
