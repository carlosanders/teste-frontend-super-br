import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
} from '@cdk/angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CdkSharedModule } from '@cdk/shared.module';
import { ActivateComponent } from './activate.component';
import { ActivateStoreModule } from './store/store.module';
import { UsuarioService } from '@cdk/services/usuario.service';
const routes: Routes = [
    {
        path: 'cpfHandle/tokenHandle',
        component: ActivateComponent
    }
];

@NgModule({
    declarations: [
        ActivateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        /*MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,*/
        MatIconModule,
        MatProgressBarModule,
        CdkSharedModule,
        ActivateStoreModule
    ],
    providers: [
        UsuarioService
    ]
})

export class ActivateModule
{
}
