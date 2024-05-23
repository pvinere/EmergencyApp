'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">emergency-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminNotificationPageModule.html" data-type="entity-link" >AdminNotificationPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminNotificationPageModule-136a095c1507f3926414b7caed2d11091447924d915570630dc273e68f531175a18585bc52b0d5b46eaacddc7f19a7d857c418814e1f0adcb04ebb3620492254"' : 'data-bs-target="#xs-components-links-module-AdminNotificationPageModule-136a095c1507f3926414b7caed2d11091447924d915570630dc273e68f531175a18585bc52b0d5b46eaacddc7f19a7d857c418814e1f0adcb04ebb3620492254"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminNotificationPageModule-136a095c1507f3926414b7caed2d11091447924d915570630dc273e68f531175a18585bc52b0d5b46eaacddc7f19a7d857c418814e1f0adcb04ebb3620492254"' :
                                            'id="xs-components-links-module-AdminNotificationPageModule-136a095c1507f3926414b7caed2d11091447924d915570630dc273e68f531175a18585bc52b0d5b46eaacddc7f19a7d857c418814e1f0adcb04ebb3620492254"' }>
                                            <li class="link">
                                                <a href="components/AdminNotificationPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminNotificationPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminNotificationPageRoutingModule.html" data-type="entity-link" >AdminNotificationPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageModule.html" data-type="entity-link" >AdminPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminPageModule-5c7383f96163868c543be664ea34935a86f5415ab0844a5fe75a1bad32024b8d2ef526de3f7b21ebb581c38f2fc485aefbe58c20ba40bcc799e9d92225901bd2"' : 'data-bs-target="#xs-components-links-module-AdminPageModule-5c7383f96163868c543be664ea34935a86f5415ab0844a5fe75a1bad32024b8d2ef526de3f7b21ebb581c38f2fc485aefbe58c20ba40bcc799e9d92225901bd2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPageModule-5c7383f96163868c543be664ea34935a86f5415ab0844a5fe75a1bad32024b8d2ef526de3f7b21ebb581c38f2fc485aefbe58c20ba40bcc799e9d92225901bd2"' :
                                            'id="xs-components-links-module-AdminPageModule-5c7383f96163868c543be664ea34935a86f5415ab0844a5fe75a1bad32024b8d2ef526de3f7b21ebb581c38f2fc485aefbe58c20ba40bcc799e9d92225901bd2"' }>
                                            <li class="link">
                                                <a href="components/AdminPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageRoutingModule.html" data-type="entity-link" >AdminPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' : 'data-bs-target="#xs-components-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' :
                                            'id="xs-components-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' :
                                        'id="xs-injectables-links-module-AppModule-a8b8b93b40e2c2ce819e92943ea3f793d2848d3b7ba96f68d53b2e7398afd48525b3367615c07a6bdf13683d7fa349e216c84fa5c31c1207bf08d8549fab490a"' }>
                                        <li class="link">
                                            <a href="injectables/SharedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExploreContainerComponentModule.html" data-type="entity-link" >ExploreContainerComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' : 'data-bs-target="#xs-components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' :
                                            'id="xs-components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' }>
                                            <li class="link">
                                                <a href="components/ExploreContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExploreContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FirstPagePageModule.html" data-type="entity-link" >FirstPagePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FirstPagePageModule-8400e4d2e86fa3efdf3c6ce486c20e6e74e573cffdabd68ed3426794ce086271f55f3baa61a7082787730964604aaab6a7d383f14cb81ba43d9e366057c19200"' : 'data-bs-target="#xs-components-links-module-FirstPagePageModule-8400e4d2e86fa3efdf3c6ce486c20e6e74e573cffdabd68ed3426794ce086271f55f3baa61a7082787730964604aaab6a7d383f14cb81ba43d9e366057c19200"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FirstPagePageModule-8400e4d2e86fa3efdf3c6ce486c20e6e74e573cffdabd68ed3426794ce086271f55f3baa61a7082787730964604aaab6a7d383f14cb81ba43d9e366057c19200"' :
                                            'id="xs-components-links-module-FirstPagePageModule-8400e4d2e86fa3efdf3c6ce486c20e6e74e573cffdabd68ed3426794ce086271f55f3baa61a7082787730964604aaab6a7d383f14cb81ba43d9e366057c19200"' }>
                                            <li class="link">
                                                <a href="components/FirstPagePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirstPagePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FirstPagePageRoutingModule.html" data-type="entity-link" >FirstPagePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' :
                                            'id="xs-components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPagePageModule.html" data-type="entity-link" >RegisterPagePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterPagePageModule-f734e69ab500a88f341eb09395a67a422c5bf1db4967f985704ed5b48f4f11770a31695916000e9e8f609539474c60e1f81996b3721f83c8f33aa13943d878d4"' : 'data-bs-target="#xs-components-links-module-RegisterPagePageModule-f734e69ab500a88f341eb09395a67a422c5bf1db4967f985704ed5b48f4f11770a31695916000e9e8f609539474c60e1f81996b3721f83c8f33aa13943d878d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPagePageModule-f734e69ab500a88f341eb09395a67a422c5bf1db4967f985704ed5b48f4f11770a31695916000e9e8f609539474c60e1f81996b3721f83c8f33aa13943d878d4"' :
                                            'id="xs-components-links-module-RegisterPagePageModule-f734e69ab500a88f341eb09395a67a422c5bf1db4967f985704ed5b48f4f11770a31695916000e9e8f609539474c60e1f81996b3721f83c8f33aa13943d878d4"' }>
                                            <li class="link">
                                                <a href="components/RegisterPagePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPagePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPagePageRoutingModule.html" data-type="entity-link" >RegisterPagePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageModule.html" data-type="entity-link" >Tab1PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab1PageModule-7132ebe58c639d6a3345c7cf3faca52e2d961cb5a17e0c545f816548cfeb2c71a87128952d651047d2d8f78e01fdc4a260627e7e9b9491748849f1b6459da0dc"' : 'data-bs-target="#xs-components-links-module-Tab1PageModule-7132ebe58c639d6a3345c7cf3faca52e2d961cb5a17e0c545f816548cfeb2c71a87128952d651047d2d8f78e01fdc4a260627e7e9b9491748849f1b6459da0dc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab1PageModule-7132ebe58c639d6a3345c7cf3faca52e2d961cb5a17e0c545f816548cfeb2c71a87128952d651047d2d8f78e01fdc4a260627e7e9b9491748849f1b6459da0dc"' :
                                            'id="xs-components-links-module-Tab1PageModule-7132ebe58c639d6a3345c7cf3faca52e2d961cb5a17e0c545f816548cfeb2c71a87128952d651047d2d8f78e01fdc4a260627e7e9b9491748849f1b6459da0dc"' }>
                                            <li class="link">
                                                <a href="components/Tab1Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab1Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageRoutingModule.html" data-type="entity-link" >Tab1PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageModule.html" data-type="entity-link" >Tab2PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab2PageModule-46b5b55641d9fda06f401bdef61d06826f8ecc8e842c9d3a6f0411ef96e1b41f9f425850d5961cef61a68787855054c27e74b47881c5f702c96b4ef17d384a37"' : 'data-bs-target="#xs-components-links-module-Tab2PageModule-46b5b55641d9fda06f401bdef61d06826f8ecc8e842c9d3a6f0411ef96e1b41f9f425850d5961cef61a68787855054c27e74b47881c5f702c96b4ef17d384a37"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab2PageModule-46b5b55641d9fda06f401bdef61d06826f8ecc8e842c9d3a6f0411ef96e1b41f9f425850d5961cef61a68787855054c27e74b47881c5f702c96b4ef17d384a37"' :
                                            'id="xs-components-links-module-Tab2PageModule-46b5b55641d9fda06f401bdef61d06826f8ecc8e842c9d3a6f0411ef96e1b41f9f425850d5961cef61a68787855054c27e74b47881c5f702c96b4ef17d384a37"' }>
                                            <li class="link">
                                                <a href="components/Tab2Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab2Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageRoutingModule.html" data-type="entity-link" >Tab2PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link" >Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab3PageModule-54b1c0f84b6ea6a4bb7263f9d3b22675a24901432281e5720b96f29c06ffa60a59a6391f8b0bc46776d3997c0570d8cca849458209228b40aee3615000344a28"' : 'data-bs-target="#xs-components-links-module-Tab3PageModule-54b1c0f84b6ea6a4bb7263f9d3b22675a24901432281e5720b96f29c06ffa60a59a6391f8b0bc46776d3997c0570d8cca849458209228b40aee3615000344a28"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-54b1c0f84b6ea6a4bb7263f9d3b22675a24901432281e5720b96f29c06ffa60a59a6391f8b0bc46776d3997c0570d8cca849458209228b40aee3615000344a28"' :
                                            'id="xs-components-links-module-Tab3PageModule-54b1c0f84b6ea6a4bb7263f9d3b22675a24901432281e5720b96f29c06ffa60a59a6391f8b0bc46776d3997c0570d8cca849458209228b40aee3615000344a28"' }>
                                            <li class="link">
                                                <a href="components/Tab3Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageRoutingModule.html" data-type="entity-link" >Tab3PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab4PageModule.html" data-type="entity-link" >Tab4PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab4PageModule-9ab26afef19fe48d410f3f85d3c5ba96c1435ec46bf4013e30ea35ec9e8caf4cfb1ed20302c3ac2d8e699040e56fe6f80a8c6a66c22466f4be3608e8fd5c5e87"' : 'data-bs-target="#xs-components-links-module-Tab4PageModule-9ab26afef19fe48d410f3f85d3c5ba96c1435ec46bf4013e30ea35ec9e8caf4cfb1ed20302c3ac2d8e699040e56fe6f80a8c6a66c22466f4be3608e8fd5c5e87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab4PageModule-9ab26afef19fe48d410f3f85d3c5ba96c1435ec46bf4013e30ea35ec9e8caf4cfb1ed20302c3ac2d8e699040e56fe6f80a8c6a66c22466f4be3608e8fd5c5e87"' :
                                            'id="xs-components-links-module-Tab4PageModule-9ab26afef19fe48d410f3f85d3c5ba96c1435ec46bf4013e30ea35ec9e8caf4cfb1ed20302c3ac2d8e699040e56fe6f80a8c6a66c22466f4be3608e8fd5c5e87"' }>
                                            <li class="link">
                                                <a href="components/Tab4Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab4Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab4PageRoutingModule.html" data-type="entity-link" >Tab4PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab5PageModule.html" data-type="entity-link" >Tab5PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab5PageModule-7ba6cfc47b1c65af2ed904f8b0b128e1d6fda0464b633b5ae67aa0dadd570bd0cbdc68a24d4ba5fcbcfcf64fbdc659343d8e6f25ffc07afea98ec6f5927e25d5"' : 'data-bs-target="#xs-components-links-module-Tab5PageModule-7ba6cfc47b1c65af2ed904f8b0b128e1d6fda0464b633b5ae67aa0dadd570bd0cbdc68a24d4ba5fcbcfcf64fbdc659343d8e6f25ffc07afea98ec6f5927e25d5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab5PageModule-7ba6cfc47b1c65af2ed904f8b0b128e1d6fda0464b633b5ae67aa0dadd570bd0cbdc68a24d4ba5fcbcfcf64fbdc659343d8e6f25ffc07afea98ec6f5927e25d5"' :
                                            'id="xs-components-links-module-Tab5PageModule-7ba6cfc47b1c65af2ed904f8b0b128e1d6fda0464b633b5ae67aa0dadd570bd0cbdc68a24d4ba5fcbcfcf64fbdc659343d8e6f25ffc07afea98ec6f5927e25d5"' }>
                                            <li class="link">
                                                <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab5Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab5Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab5PageRoutingModule.html" data-type="entity-link" >Tab5PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link" >TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' : 'data-bs-target="#xs-components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' :
                                            'id="xs-components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link" >TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link" >SharedService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});