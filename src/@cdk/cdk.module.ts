import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {CDK_CONFIG} from '@cdk/services/config.service';

@NgModule()
export class CdkModule
{
    constructor(@Optional() @SkipSelf() parentModule: CdkModule)
    {
        if ( parentModule )
        {
            throw new Error('CdkModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders<CdkModule>
    {
        return {
            ngModule : CdkModule,
            providers: [
                {
                    provide : CDK_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
