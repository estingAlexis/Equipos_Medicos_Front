(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-chat-chat-module"],{

/***/ "./src/app/pages/chat/chat.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/chat/chat.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row wrap\">\n    <div fxFlex=\"100\" class=\"flex-p\"> \n        <mat-card class=\"p-0 chat\">\n            <mat-sidenav-container>\n              <mat-sidenav #sidenav [opened]=\"sidenavOpen\" [mode]=\"sidenavOpen ? 'side' : 'over'\" class=\"chat-sidenav mat-elevation-z1\">\n                  <mat-toolbar color=\"primary\" class=\"p-0\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                      <mat-list class=\"p-0\">\n                          <mat-list-item>\n                              <img matListAvatar [src]=\"userImage\">\n                          </mat-list-item>\n                      </mat-list>\n                      <button mat-icon-button [matMenuTriggerFor]=\"userMenu\" #userMenuTrigger=\"matMenuTrigger\">\n                          <mat-icon>more_vert</mat-icon>\n                      </button>                                     \n                  </mat-toolbar>\n                  <mat-menu #userMenu=\"matMenu\" xPosition=\"before\" overlapTrigger=\"true\">\n                      <span (mouseleave)=\"userMenuTrigger.closeMenu()\">\n                          <button mat-menu-item>\n                              <mat-icon>account_circle</mat-icon>\n                              <span>Profile</span>\n                          </button>\n                          <button mat-menu-item>\n                              <mat-icon>settings</mat-icon>\n                              <span>Settings</span>\n                          </button>\n                          <a mat-menu-item routerLink=\"/\"> \n                              <mat-icon>power_settings_new</mat-icon>\n                              <span>Exit chat</span>\n                          </a>\n                      </span>\n                  </mat-menu> \n                  <mat-nav-list class=\"p-0 chat-sidenav-list\" perfectScrollbar>\n                      <mat-list-item *ngFor=\"let chat of chats\" (click)=\"getChat(chat)\">\n                          <img matListAvatar [src]=\"chat.image\">\n                          <h6 matLine> {{chat.author}} </h6>\n                          <p matLine fxLayout=\"row\" fxLayoutAlign=\"none center\" class=\"muted-text\">\n                              <span [ngSwitch]=\"chat.authorStatus\">\n                                  <mat-icon *ngSwitchCase=\"'Online'\" class=\"chat-status-icon\">check_circle</mat-icon>\n                                  <mat-icon *ngSwitchCase=\"'Offline'\" class=\"chat-status-icon\">highlight_off</mat-icon>\n                                  <mat-icon *ngSwitchCase=\"'Away'\" class=\"chat-status-icon\">schedule</mat-icon>\n                                  <mat-icon *ngSwitchCase=\"'Do not disturb'\" class=\"chat-status-icon\">not_interested</mat-icon>\n                              </span>\n                              <span class=\"author-status\">{{chat.authorStatus}}</span>\n                          </p>\n                      </mat-list-item>\n                  </mat-nav-list>\n              </mat-sidenav>\n            \n              <div>\n                  <mat-toolbar color=\"primary\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                      <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                          <button mat-icon-button (click)=\"sidenav.toggle()\">\n                              <mat-icon>list</mat-icon>\n                          </button>\n                          <mat-list *ngIf=\"currentChat\" class=\"p-0\">\n                              <mat-list-item>\n                                  <img matListAvatar [src]=\"currentChat.image\">\n                              </mat-list-item>\n                          </mat-list>\n                          <span *ngIf=\"currentChat\" class=\"author-name\">{{currentChat.author}}</span>\n                      </div>\n                      <button mat-icon-button [matMenuTriggerFor]=\"personMenu\" #personMenuTrigger=\"matMenuTrigger\">\n                          <mat-icon>more_vert</mat-icon>\n                      </button> \n                  </mat-toolbar>\n                  <mat-menu #personMenu=\"matMenu\" xPosition=\"before\" overlapTrigger=\"true\">\n                      <span (mouseleave)=\"personMenuTrigger.closeMenu()\">\n                          <button mat-menu-item>\n                              <mat-icon>account_circle</mat-icon>\n                              <span>Contact info</span>\n                          </button>\n                          <button mat-menu-item>\n                              <mat-icon>volume_mute</mat-icon>\n                              <span>Mute</span>\n                          </button>\n                          <button mat-menu-item> \n                              <mat-icon>delete_forever</mat-icon>\n                              <span>Clear chat</span>\n                          </button>\n                      </span>\n                  </mat-menu> \n                  <div class=\"chat-content\" perfectScrollbar>\n                      <mat-list *ngIf=\"talks\" class=\"p-0\" >\n                          <mat-list-item *ngFor=\"let talk of talks\" class=\"talk-item\">\n                              <img matListAvatar [src]=\"talk.image\">\n                              <p matLine class=\"message\">\n                                  <span [ngClass]=\"(talk.my) ? 'bg-primary' : 'bg-accent'\">{{talk.text}}</span>\n                              </p>                             \n                              <p matLine class=\"message-date\">\n                                  <small>{{talk.date | date:\"dd MMMM, yyyy 'at' HH:mm\"}}</small>\n                              </p> \n                          </mat-list-item>\n                      </mat-list>\n                      <div *ngIf=\"!talks\" fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"h-100 empty\">\n                          <mat-icon>chat</mat-icon>            \n                          <p>Select a interlocutor for talk</p>\n                      </div> \n                  </div>\n                  <mat-divider></mat-divider>\n                  <mat-card class=\"chat-actions\"> \n                      <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                          <mat-form-field class=\"w-100\">\n                            <input matInput placeholder=\"Enter your text...\" (keyup)=\"sendMessage($event)\" [(ngModel)]=\"newMessage\">\n                          </mat-form-field>\n                          <div fxLayout=\"row\" fxLayoutAlign=\"scenter center\">\n                              <button mat-icon-button type=\"button\">\n                                  <mat-icon>attach_file</mat-icon>\n                              </button>\n                              <button mat-mini-fab color=\"primary\" type=\"button\" (click)=\"sendMessage($event)\">\n                                  <mat-icon>send</mat-icon>\n                              </button>\n                          </div>\n                        </div>\n                  </mat-card>\n              </div>\n            \n            </mat-sidenav-container>\n        </mat-card>\n      </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/chat/chat.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/chat/chat.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".chat .chat-actions {\n  padding: 12px; }\n\n.chat .author-name {\n  font-size: 16px;\n  font-weight: 400; }\n\n.chat .talk-item {\n  padding: 6px 0;\n  height: 100%; }\n\n.chat .message {\n  white-space: unset;\n  text-overflow: unset; }\n\n.chat .message span {\n    padding: 6px 10px;\n    border-radius: 4px;\n    display: inline-block;\n    font-size: 14px; }\n\n.chat .message-date {\n  opacity: 0.8; }\n\n.chat .empty mat-icon {\n  font-size: 220px;\n  height: 220px;\n  width: 220px;\n  opacity: 0.4; }\n\n.chat .empty p {\n  font-size: 18px;\n  opacity: 0.8; }\n\n.chat-status-icon {\n  font-size: 14px;\n  height: 14px;\n  width: 14px;\n  line-height: 22px;\n  margin-right: 6px; }\n\n.author-status {\n  font-size: 13px; }\n\n.chat-sidenav {\n  border-right: 1px solid transparent;\n  overflow: hidden;\n  width: 200px; }\n\n.chat-content {\n  padding: 12px;\n  height: calc(100vh - (56px + 8px*2 + 238px)); }\n\n.chat-sidenav-list {\n  height: calc(100vh - (56px + 8px*2 + 134px)); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2xhc3psby9Eb2N1bWVudG9zL0dpdEh1Yi9FcXVpcG9zX01lZGljb3NfRnJvbnQvc3JjL2FwcC9wYWdlcy9jaGF0L2NoYXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFFUSxhQUFhLEVBQUE7O0FBRnJCO0VBS1EsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQU54QjtFQVNRLGNBQWM7RUFDZCxZQUFZLEVBQUE7O0FBVnBCO0VBYVEsa0JBQWtCO0VBQ2xCLG9CQUFvQixFQUFBOztBQWQ1QjtJQWdCWSxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixlQUFlLEVBQUE7O0FBbkIzQjtFQXVCUSxZQUFZLEVBQUE7O0FBdkJwQjtFQTJCWSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLFlBQVk7RUFDWixZQUFZLEVBQUE7O0FBOUJ4QjtFQWlDWSxlQUFlO0VBQ2YsWUFBWSxFQUFBOztBQUl4QjtFQUNJLGVBQWU7RUFDZixZQUFZO0VBQ1osV0FBVztFQUNYLGlCQUFpQjtFQUNqQixpQkFBaUIsRUFBQTs7QUFFckI7RUFDSSxlQUFlLEVBQUE7O0FBRW5CO0VBQ0ksbUNBQW1DO0VBQ25DLGdCQUFnQjtFQUNoQixZQUFZLEVBQUE7O0FBRWhCO0VBQ0ksYUFBYTtFQUNiLDRDQUF3RixFQUFBOztBQUU1RjtFQUNJLDRDQUF3RixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY2hhdC9jaGF0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uL3RoZW1lL3N0eWxlcy92YXJpYWJsZXNcIjtcblxuLmNoYXR7XG4gICAgLmNoYXQtYWN0aW9uc3tcbiAgICAgICAgcGFkZGluZzogMTJweDtcbiAgICB9XG4gICAgLmF1dGhvci1uYW1le1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgfVxuICAgIC50YWxrLWl0ZW17XG4gICAgICAgIHBhZGRpbmc6IDZweCAwO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICAgIC5tZXNzYWdle1xuICAgICAgICB3aGl0ZS1zcGFjZTogdW5zZXQ7XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IHVuc2V0OyAgICAgICBcbiAgICAgICAgc3BhbntcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5tZXNzYWdlLWRhdGV7XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICB9XG4gICAgLmVtcHR5e1xuICAgICAgICBtYXQtaWNvbntcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjIwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDIyMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDIyMHB4O1xuICAgICAgICAgICAgb3BhY2l0eTogMC40O1xuICAgICAgICB9XG4gICAgICAgIHB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICAgIH1cbiAgICB9XG59XG4uY2hhdC1zdGF0dXMtaWNvbntcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgaGVpZ2h0OiAxNHB4O1xuICAgIHdpZHRoOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyMnB4O1xuICAgIG1hcmdpbi1yaWdodDogNnB4O1xufVxuLmF1dGhvci1zdGF0dXN7XG4gICAgZm9udC1zaXplOiAxM3B4O1xufVxuLmNoYXQtc2lkZW5hdntcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHdpZHRoOiAyMDBweDsgICBcbn1cbi5jaGF0LWNvbnRlbnR7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAoI3skdG9vbGJhci1oZWlnaHR9ICsgI3skaW5uZXItc2lkZW5hdi1jb250ZW50LXBhZGRpbmd9KjIgKyAyMzhweCkpO1xufVxuLmNoYXQtc2lkZW5hdi1saXN0IHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAoI3skdG9vbGJhci1oZWlnaHR9ICsgI3skaW5uZXItc2lkZW5hdi1jb250ZW50LXBhZGRpbmd9KjIgKyAxMzRweCkpO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/pages/chat/chat.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/chat/chat.component.ts ***!
  \**********************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var _chat_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.model */ "./src/app/pages/chat/chat.model.ts");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat.service */ "./src/app/pages/chat/chat.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatComponent = /** @class */ (function () {
    function ChatComponent(appSettings, chatService) {
        this.appSettings = appSettings;
        this.chatService = chatService;
        this.userImage = 'assets/img/users/user.jpg';
        this.sidenavOpen = true;
        this.settings = this.appSettings.settings;
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.chats = this.chatService.getChats();
        if (window.innerWidth <= 768) {
            this.sidenavOpen = false;
        }
    };
    ChatComponent.prototype.onWindowResize = function () {
        (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
    };
    ChatComponent.prototype.getChat = function (obj) {
        if (this.talks) {
            this.talks.length = 2;
        }
        this.talks = this.chatService.getTalk();
        this.talks.push(obj);
        this.currentChat = obj;
        this.talks.forEach(function (talk) {
            if (!talk.my) {
                talk.image = obj.image;
            }
        });
        if (window.innerWidth <= 768) {
            this.sidenav.close();
        }
    };
    ChatComponent.prototype.sendMessage = function ($event) {
        if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
            if (this.talks) {
                this.talks.push(new _chat_model__WEBPACK_IMPORTED_MODULE_2__["Chat"]('assets/img/users/user.jpg', 'Emilio Verdines', 'online', this.newMessage, new Date(), true));
                this.newMessage = '';
                var chatContainer_1 = document.querySelector('.chat-content');
                if (chatContainer_1) {
                    setTimeout(function () {
                        var nodes = chatContainer_1.querySelectorAll('.mat-list-item');
                        var newChatTextHeight = nodes[nodes.length - 1];
                        chatContainer_1.scrollTop = chatContainer_1.scrollHeight + newChatTextHeight.clientHeight;
                    });
                }
            }
        }
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        if (this.talks)
            this.talks.length = 2;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav'),
        __metadata("design:type", Object)
    ], ChatComponent.prototype, "sidenav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ChatComponent.prototype, "onWindowResize", null);
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! ./chat.component.html */ "./src/app/pages/chat/chat.component.html"),
            providers: [_chat_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"]],
            styles: [__webpack_require__(/*! ./chat.component.scss */ "./src/app/pages/chat/chat.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_1__["AppSettings"], _chat_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/pages/chat/chat.model.ts":
/*!******************************************!*\
  !*** ./src/app/pages/chat/chat.model.ts ***!
  \******************************************/
/*! exports provided: Chat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chat", function() { return Chat; });
var Chat = /** @class */ (function () {
    function Chat(image, author, authorStatus, text, date, my) {
        this.image = image;
        this.author = author;
        this.authorStatus = authorStatus;
        this.text = text;
        this.date = date;
        this.my = my;
    }
    return Chat;
}());



/***/ }),

/***/ "./src/app/pages/chat/chat.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/chat/chat.module.ts ***!
  \*******************************************/
/*! exports provided: routes, ChatModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatModule", function() { return ChatModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "./node_modules/ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _chat_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat.component */ "./src/app/pages/chat/chat.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: _chat_component__WEBPACK_IMPORTED_MODULE_6__["ChatComponent"], pathMatch: 'full' }
];
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__["PerfectScrollbarModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
            ],
            declarations: [
                _chat_component__WEBPACK_IMPORTED_MODULE_6__["ChatComponent"]
            ]
        })
    ], ChatModule);
    return ChatModule;
}());



/***/ }),

/***/ "./src/app/pages/chat/chat.service.ts":
/*!********************************************!*\
  !*** ./src/app/pages/chat/chat.service.ts ***!
  \********************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _chat_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.model */ "./src/app/pages/chat/chat.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var date = new Date(), day = date.getDate(), month = date.getMonth(), year = date.getFullYear(), hour = date.getHours(), minute = date.getMinutes();
// let chats = [
//     new Chat(
//         'assets/img/profile/ashley.jpg',
//         'Ashley Ahlberg', 
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/bruno.jpg',
//         'Bruno Vespa',
//         'Do not disturb',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/julia.jpg',
//         'Julia Aniston',
//         'Away',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/adam.jpg',
//         'Adam Sandler',
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/tereza.jpg',
//         'Tereza Stiles',
//         'Offline',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),  
//     new Chat(
//         'assets/img/profile/michael.jpg',
//         'Michael Blair',
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
//         new Date(year, month, day-2, hour, minute),
//         false
//     )
// ]
var chats = [
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/profile/ashley.jpg', 'Ashley Ahlberg', 'Online', 'Great, then I\'ll definitely buy this theme. Thanks!', new Date(year, month, day - 2, hour, minute), false),
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/profile/bruno.jpg', 'Bruno Vespa', 'Do not disturb', 'Great, then I\'ll definitely buy this theme. Thanks!', new Date(year, month, day - 2, hour, minute), false),
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/profile/julia.jpg', 'Julia Aniston', 'Away', 'Great, then I\'ll definitely buy this theme. Thanks!', new Date(year, month, day - 2, hour, minute), false),
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/profile/adam.jpg', 'Adam Sandler', 'Online', 'Great, then I\'ll definitely buy this theme. Thanks!', new Date(year, month, day - 2, hour, minute), false),
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/profile/tereza.jpg', 'Tereza Stiles', 'Offline', 'Great, then I\'ll definitely buy this theme. Thanks!', new Date(year, month, day - 2, hour, minute), false),
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/profile/michael.jpg', 'Michael Blair', 'Online', 'Great, then I\'ll definitely buy this theme. Thanks!', new Date(year, month, day - 2, hour, minute), false)
];
var talks = [
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/profile/ashley.jpg', 'Ashley Ahlberg', 'Online', 'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?', new Date(year, month, day - 2, hour, minute + 3), false),
    new _chat_model__WEBPACK_IMPORTED_MODULE_1__["Chat"]('assets/img/users/user.jpg', 'Emilio Verdines', 'Online', 'Hi, Gradus is a fully compatible with angular material 2, responsive, organized folder structure, clean & customizable code, easy to use and much more...', new Date(year, month, day - 2, hour, minute + 2), true)
];
var ChatService = /** @class */ (function () {
    function ChatService() {
    }
    ChatService.prototype.getChats = function () {
        return chats;
    };
    ChatService.prototype.getTalk = function () {
        return talks;
    };
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ChatService);
    return ChatService;
}());



/***/ })

}]);
//# sourceMappingURL=pages-chat-chat-module.js.map