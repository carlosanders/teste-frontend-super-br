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
            .then(lazyModule => {
                console.log(lazyModule);
                if (lazyModule instanceof NgModuleFactory) {
                    console.log('Instancia');
                    const moduleRef = lazyModule.create(this.injector);
                    // @ts-ignore
                    return moduleRef.instance.resolveComponentFactory();
                } else {
                    console.log('else');
                    return this.compiler.compileModuleAsync(lazyModule).then(compiledModule => {
                        console.log(compiledModule);
                        console.log(this.injector);
                        const moduleRef = compiledModule.create(this.injector);
                        console.log(moduleRef);
                        // @ts-ignore
                        return moduleRef.instance.resolveComponentFactory();
                    });
                }
            });
    }
}
