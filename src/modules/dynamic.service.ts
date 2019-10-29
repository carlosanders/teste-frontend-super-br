import {
    Injectable,
    Injector,
    ɵrenderComponent as renderComponent,
} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DynamicService {
    constructor(
        private injector: Injector,
    ) {}

    loadComponent(i: any): any {
        return i()
            .then(m => {
                const c = m.module.ngModuleDef.declarations[m.componentIndex];
                const tagName = c.ngComponentDef.selectors[0];
                const host = document.createElement(tagName);
                const component = renderComponent(c, {
                    host,
                    injector: this.injector,
                });

                return {
                    component,
                    host,
                };
            });
    }
}