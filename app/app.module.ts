import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { TextPane } from './reader/textpane.component';
import { HtmlPane } from './reader/htmlpane.component';

// import { ApiService } from './services/api.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule, HttpModule
    ],
    declarations: [
        AppComponent, TextPane, HtmlPane
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
