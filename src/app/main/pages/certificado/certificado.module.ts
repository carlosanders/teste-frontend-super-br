import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CdkSharedModule} from '@cdk/shared.module';

import {CertificadoComponent} from 'app/main/pages/certificado/certificado.component';

const routes = [
    {
        path     : 'certificado',
        component: CertificadoComponent
    }
];

@NgModule({
    declarations: [
        CertificadoComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        CdkSharedModule
    ]
})
export class CertificadoModule
{
}
