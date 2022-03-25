import {Injectable, Optional} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Location} from '@angular/common';


@Injectable()
export class NavigationService {
    private history: string[] = [];
    constructor(
        private router: Router,
        private location: Location,
        @Optional() private componente: string,
    ) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(({urlAfterRedirects}: NavigationEnd) => {
                this.history = [...this.history, urlAfterRedirects];
        });
    }

    public register(): number {
        return Math.max(this.history.length - 1, 0);
    }

    public goBackFrom(register: number): void {
        if (register === 0) {
            if (this.componente != null) {
                const urlPadrao: string = this.history[register].split(`/${this.componente}/`)[0] +
                    `/${this.componente}/listar`;
                this.router.navigateByUrl(urlPadrao).then();
            }
            this.location.back();
        }
        if (this.history[register]) {
            this.router.navigate([this.history[register]]).then();
        }
    }
}
