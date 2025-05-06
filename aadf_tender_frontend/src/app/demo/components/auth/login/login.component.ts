import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {LogInService} from "../../../service/log-in.service";
import {LoginRequest} from "../../../../model/LoginRequest";
import {TokenStorageService} from "../../../../layout/service/token-storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      .login-container {
        position: relative;
        background: linear-gradient(135deg, #1e1e2f 0%, #2b2b44 100%);
        width: 100vw;
        overflow: auto; /* Enable scrolling on the main container if content overflows */
      }

      .animated-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-size: 400% 400%;
        background-image:
                radial-gradient(circle at 10% 20%, rgba(91, 37, 255, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(255, 65, 108, 0.15) 0%, transparent 40%);
        animation: backgroundShift 15s ease infinite;
        z-index: 1; /* Ensure it's behind the content */
      }

      .logo-wrapper {
        position: relative;
        z-index: 3; /* Higher z-index to be on top */
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem; /* Adjust spacing */
      }

      .logo-image {
        position: relative;
        width: 6rem;
        height: auto;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }

      .login-card-wrapper {
        position: relative;
        z-index: 2;
        width: auto;
        min-width: 400px;
        max-width: 90%; /* Adjust for better responsiveness */
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.1); /* Make the background more transparent */
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow for better definition */
        backdrop-filter: blur(15px); /* Increase blur for better integration */
        border: 1px solid rgba(255, 255, 255, 0.3); /* Slightly stronger border */
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        margin: 2rem; /* Add some margin around the card */
      }

      .login-card-wrapper::-webkit-scrollbar {
        width: 8px;
      }

      .login-card-wrapper::-webkit-scrollbar-track {
        background: transparent;
      }

      .login-card-wrapper::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.4); /* Lighter scrollbar for the transparent background */
        border-radius: 20px;
      }

      .w-full.surface-card.py-5.px-5 {
        background: transparent !important; /* Make the inner surface card transparent */
      }

      .text-center.mb-5 {
        /* Keep existing styles */
      }

      .title-text {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
        background: linear-gradient(45deg, var(--primary-color), #2196F3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .subtitle-text {
        color: var(--text-color-secondary);
        font-size: 1.1rem;
      }

      .input-wrapper {
        margin-bottom: 1.5rem;
      }

      .input-group {
        position: relative;
      }

      .input-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-color-secondary);
        z-index: 2;
      }

      input,
      .p-password input {
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.5); /* Lighter border for the transparent background */
        background: rgba(255, 255, 255, 0.2) !important; /* More transparent input background */
        color: white !important; /* Make input text white */
        transition: all 0.3s ease;
      }

      input::placeholder,
      .p-password input::placeholder {
        color: rgba(255, 255, 255, 0.7); /* Lighter placeholder text */
      }

      input:focus,
      .p-password input:focus {
        border-color: var(--primary-color);
        background: rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
      }

      .password-input-group .input-icon {
        z-index: 5;
      }

      ::ng-deep .p-password {
        width: 100%;
      }

      ::ng-deep .p-password input {
        z-index: 1;
      }

      .login-button {
        border-radius: 12px;
        background: linear-gradient(45deg, var(--primary-color), #2196F3);
        border: none;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
      }

      .login-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(33, 150, 243, 0.5); /* Stronger hover shadow */
      }

      .login-button:active {
        transform: translateY(0);
      }

      .forgot-link,
      .register-link {
        color: var(--primary-color);
        font-weight: 500;
        transition: all 0.3s ease;
        text-decoration: none;
        position: relative;
        cursor: pointer;
      }

      .forgot-link::after,
      .register-link::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -2px;
        left: 0;
        background: linear-gradient(90deg, var(--primary-color), #2196F3);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      .forgot-link:hover::after,
      .register-link:hover::after {
        transform: scaleX(1);
      }

      .remember-text {
        color: rgba(255, 255, 255, 0.8); /* Lighter remember text */
        font-size: 0.95rem;
      }

      @keyframes backgroundShift {
        0% {
          background-position: 0% 0%;
        }

        50% {
          background-position: 100% 100%;
        }

        100% {
          background-position: 0% 0%;
        }
      }

      /* Add responsive styles */
      @media screen and (max-width: 576px) {
        .login-card-wrapper {
          min-width: auto;
          width: 95%; /* Take up more width on smaller screens */
          max-width: 95%;
          margin: 1rem;
        }

        .title-text {
          font-size: 1.75rem;
        }

        .input-wrapper input {
          font-size: 1rem;
        }
      }
      .color-white {
        color: white;
      }
      .color-white,
      input.p-inputtext,
      input[type="text"],
      input[type="email"],
      input[type="password"],
      input[type="number"] {
        color: white !important;
      }

      /* Force white text on inputs on focus state too */
      input:focus {
        color: white !important;
      }

    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    logIn: LoginRequest = new LoginRequest();
    password!: string;
    response: any;
    private isLoggedIn: boolean = false;
    private isLoginFailed: boolean = false;
    private role: string;

    constructor(public layoutService: LayoutService,
                private readonly loginService: LogInService,
                private readonly tokenStorage: TokenStorageService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        TokenStorageService.loggedIn.subscribe(loggedIn => {
            this.isLoggedIn = loggedIn;
        });
        if (this.isLoggedIn) {
            this.role = this.tokenStorage.getUser().role;
            this.router.navigate(['home']);
        }
    }

    onSignIn() {
        this.loginService.authenticateUser(this.logIn).subscribe({
            next: (data) => {
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveUser(data);
                console.log(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.role = this.tokenStorage.getUser().role;
                console.log(this.role);
                TokenStorageService.loggedIn.next(this.isLoggedIn);
                this.router.navigate(['/home']);
            },
            // this.response = data;

            error: (err) => console.log(err),
            complete: () => {
                this.router.navigateByUrl('/home');
            }
        })
    }

    redirectToRegister() {
        this.router.navigate(['register']);
    }


}
