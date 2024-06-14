import {Component, OnInit, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ChatWindowComponent} from "../chat-window/chat-window.component";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        ChatWindowComponent,
        NgOptimizedImage,
        FormsModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    screenHeight!: number;
    selectedUser:string | null = null;
    showChatWindow:boolean = false;

    constructor() {
        this.getScreenHeight();
    }

    dummyContact: {
        name: string, image: string, lastMessage: string, badgeCount: number, lastMsgTime: string
    }[] =
        [{
            name: "John Doe",
            image: "./assets/default_user.png",
            lastMessage: "Life is a journey, not a destination.",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Ava",
            image: "./assets/default_user.png",
            lastMessage: "Success is not final, failure is not fatal",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Ethan",
            image: "./assets/default_user.png",
            lastMessage: "The only way to do great work is to",
            badgeCount: 0,
            lastMsgTime: '18:59'
        }, {
            name: "Sophia",
            image: "./assets/default_user.png",
            lastMessage: "Believe you can and you're halfway there",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Liam",
            image: "./assets/default_user.png",
            lastMessage: "The best way to predict the future is to",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Isabella",
            image: "./assets/default_user.png",
            lastMessage: "In the middle of every difficulty lies opportunity.",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Jackson",
            image: "./assets/default_user.png",
            lastMessage: "The greatest glory in living lies not in never",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Olivia",
            image: "./assets/default_user.png",
            lastMessage: "The only limit to our realization of tomorrow will",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Noah",
            image: "./assets/default_user.png",
            lastMessage: "The secret of getting ahead is getting started.",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Emma",
            image: "./assets/default_user.png",
            lastMessage: "You miss 100% of the shots you don",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }, {
            name: "Emma",
            image: "./assets/default_user.png",
            lastMessage: "You miss 100% of the shots you don",
            badgeCount: 2,
            lastMsgTime: '18:59'
        }]


    ngOnInit() {

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.getScreenHeight();
    }

    getScreenHeight() {
        if (typeof window !== 'undefined') {
            this.screenHeight = window.innerHeight;
        }
    }
    selectContact(contact:string){
        this.selectedUser = contact;
        this.showChatWindow = true
    }
}