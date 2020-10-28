import {NgModule} from '@angular/core';

import {CertificadoModule} from 'app/main/pages/certificado/certificado.module';
import {MaintenanceModule} from 'app/main/pages/maintenance/maintenence.module';

@NgModule({
    imports: [
        CertificadoModule,
        MaintenanceModule,
    ]
})
export class PagesModule {

}
