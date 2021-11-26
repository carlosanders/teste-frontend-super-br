import {ModuleWithProviders} from "@angular/core";

/**
 * Interface para extensão de módulos na aplicação Supp, onde a mesma precisa ser configurada na chave 'extension',
 * dentro do modulesConfig do módulo em questão.
 * ### Exemplo
 * ```typescript
 * export const modulesConfigMeuModulo {
 *     name: 'Meu módulo',
 *     routes: {},
 *     ...
 *     extension: MeuModuloExtensionModule
 * }
 * ```
 */
export interface ModuleExtension<T> {

    /**
     * Carrega o módulo da extensão no root da aplicação permitindo sobrescrever ou adicionar módulos e providers na
     * raiz do Supp.
     * ### Exemplo
     *
     * ```typescript
     * import {ModuleWithProviders, NgModule} from '@angular/core';
     * import {AuthGuard} from 'app/main/guard';
     * @NgModule()
     * export class MeuModuloExtensionModule implements ModuleExtension<MeuModuloExtensionModule> {
     *      forRoot(): ModuleWithProviders<MeuModuloExtensionModule> {
     *          return {
     *              ngModule : MeuModuloExtensionModule,
     *              providers: [
     *                  {provide: AuthGuard, useClass: CustomAuthGuard},
     *              ]
     *          };
     *      }
     *  }
     * ```
     */
    forRoot(): ModuleWithProviders<T>;

    /**
     * Carrega o módulos e providers nos filhos da aplicação a depender do path recebido.
     * ### Exemplo
     *
     * ```typescript
     * import {ModuleWithProviders, NgModule} from '@angular/core';
     * import {LoginEffects} from 'app/main/auth/login/store/effects/login.effects';
     * @NgModule()
     * export class MeuModuloExtensionModule implements ModuleExtension<MeuModuloExtensionModule> {
     *      forChild(path?: string): ModuleWithProviders<AmeiExtensionModule> {
     *          let providers = [];
     *          switch (path) {
     *              case 'app/main/auth/login':
     *              providers = [
     *                  {provide: LoginEffects, useClass: CustomLoginEffects, multi: false}
     *              ];
     *              break;
     *          }
     *          return {
     *              ngModule : AmeiExtensionModule,
     *              providers: providers
     *          };
     *      }
     * }
     * ```
     * @param path
     */
    forChild(path?: string): ModuleWithProviders<T>;

    /**
     * Retorna o nome do módulo.
     * ### Exemplo
     *
     * ```typescript
     * import {ModuleWithProviders, NgModule} from '@angular/core';
     * @NgModule()
     * export class MeuModuloExtensionModule implements ModuleExtension<MeuModuloExtensionModule> {
     *      getName(): string {
     *          const packageJson = require('./package.json');
     *          return packageJson.name;
     *      }
     * }
     * ```
     */
    getName(): string;

    /**
     * Retorna a versão do módulo.
     * ### Exemplo
     *
     * ```typescript
     * import {ModuleWithProviders, NgModule} from '@angular/core';
     * import * as packageJson from './package.json';
     * @NgModule()
     * export class MeuModuloExtensionModule implements ModuleExtension<MeuModuloExtensionModule> {
     *      getVersion(): string {
     *          const packageJson = require('./package.json');
     *          return packageJson.version;
     *      }
     * }
     * ```
     */
    getVersion(): string;

    /**
     * Adiciona, substitui ou modifica rotas dos módulos do sistema a partir do path repassado.
     * ### Exemplo
     *
     * ```typescript
     * import {ModuleWithProviders, NgModule} from '@angular/core';
     * @NgModule()
     * export class MeuModuloExtensionModule implements ModuleExtension<MeuModuloExtensionModule> {
     *      manageRoutes(path: string, routes?: any[]): any[] {
     *          switch (path) {
     *              case 'app/main/auth/login':
     *                  routes = [
     *                      ...routes,
     *                      {
     *                          path: 'formulario-externo',
     *                          loadChildren: () => import('./main/app/auth/login/formulario-externo.module')
     *                              .then(m => m.FormularioExternoModule)
     *                      }
     *                  ];
     *                  break;
     *          }
     *
     *          return routes;
     *      }
     * }
     * ```
     *
     * @param path
     * @param routes
     */
    manageRoutes(path: string, routes?: any[]): any[];

    /**
     * Adiciona, substitui ou modifica os interceptors dos módulos do sistema a partir do path repassado.
     * ### Exemplo
     *
     * ```typescript
     * import {ModuleWithProviders, NgModule} from '@angular/core';
     * @NgModule()
     * export class MeuModuloExtensionModule implements ModuleExtension<MeuModuloExtensionModule> {
     *      manageInterceptors(path: string, interceptors?: any[]): any[] {
     *          switch (path) {
     *              case 'app':
     *                  interceptors = [
     *                      ...interceptors,
     *                      {provide: HTTP_INTERCEPTORS, useClass: MeuInterceptor, multi: true}
     *                  ];
     *                  break;
     *          }
     *
     *          return routes;
     *      }
     * }
     * ```
     *
     * @param path
     * @param interceptors
     */
    manageInterceptors(path: string, interceptors?: any[]): any[];

    /**
     * Implementação a definir
     * @param mainMenu
     */
    manageMainMenu(mainMenu: any[]): any[];

    /**
     * Implementação a definir
     * @param path
     * @param routerLinks
     */
    manageRouterLinks(path: string, routerLinks?: any[]): string;

    /**
     * Implementação a definir
     * @param path
     * @param components
     */
    manageComponents(path: string, components?: any[]): any[];

    /**
     * Implementação a definir
     * @param path
     * @param ajudas
     */
    manageAjudas(path: string, ajudas?: any[]): any[];

    /**
     * Implementação a definir
     * @param path
     * @param widgets
     */
    manageWidgets(path: string, widgets?: any[]): any[];

    /**
     * Implementação a definir
     * @param path
     * @param notifications
     */
    manageNotifications(path: string, notifications?: any[]): any[];

    /**
     * Implementação a definir
     * @param path
     * @param model
     */
    manageGeneroAfinity(path: string, model?:any): string;

    /**
     * Implementação a definir
     * @param menu
     */
    navigationConverter(menu: string): any;

}