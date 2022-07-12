import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Location} from '@angular/common';


@Injectable({providedIn: 'root'})
export class NavigationHistory {
  private history: string[] = [];
    constructor(
        private router: Router,
        private location: Location,
    ) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(({urlAfterRedirects}: NavigationEnd) => {
                this.history = [...this.history, urlAfterRedirects];
        });
    }

    public register(): number {
        return this.history.length;
    }

    public go(register: number, component?: string): void {
        if(register > 0) {
            this.router.navigate([this.history[register-1]]).then();
        } else if(component) {

            let url = this.router.url; // /a/b/c/componente/e
            let rest = url.substring(0, url.lastIndexOf(component)); // /a/b/c/
            // let last = url.substring(url.lastIndexOf(component) + component.length); // /e
            this.router.navigateByUrl(`${rest}${component}/listar` ).then();
        }
        else {
            this.location.back();
        }
    }
}
