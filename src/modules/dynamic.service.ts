import {
    Injectable,
    Injector,
    Compiler,
    NgModuleFactory
} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DynamicService {
    constructor(
        private compiler: Compiler, private injector: Injector,
    ) {
    }

    loadComponent(i: any): Promise<any> {
        return i()
            .then((lazyModule) => {
                if (lazyModule instanceof NgModuleFactory) {
                    const moduleRef = lazyModule.create(this.injector);
                    // @ts-ignore
                    return moduleRef.instance.resolveComponentFactory();
                } else {
                    return this.compiler.compileModuleAsync(lazyModule).then((compiledModule) => {
                        const moduleRef = compiledModule.create(this.injector);
                        // @ts-ignore
                        return moduleRef.instance.resolveComponentFactory();
                    });
                }
            });
    }
}
