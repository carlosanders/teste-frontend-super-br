import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'assinatura-digital',
        //loadChildren: () => import('./assinatura-digital/assinatura-digital.module').then(m => m.AssinaturaDigitalModule)
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class UsuarioExternoModule
{
}
