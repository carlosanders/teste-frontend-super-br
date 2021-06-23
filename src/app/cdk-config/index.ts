import {CdkConfig} from '@cdk/types';

/**
 * Default Cdk Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/pages/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */

export const cdkConfig: CdkConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme      : localStorage.getItem('colorTheme') ?? 'theme-default',
    customScrollbars: true,
    layout          : {
        style    : 'vertical-layout-1',
        width    : 'fullwidth',
        navbar   : {
            primaryBackground  : 'cdk-white-500',
            secondaryBackground: 'cdk-white-500',
            folded             : true,
            hidden             : false,
            position           : 'left',
            variant            : 'vertical-style-1'
        },
        toolbar  : {
            customBackgroundColor: false,
            background           : 'cdk-white-500',
            hidden               : false,
            position             : 'below-static'
        },
        footer   : {
            customBackgroundColor: true,
            background           : 'cdk-white-500',
            hidden               : true,
            position             : 'below-fixed'
        },
        sidepanel: {
            hidden  : true,
            position: 'right'
        }
    }
};
