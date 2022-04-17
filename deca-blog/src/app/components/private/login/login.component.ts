import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../../../_services/modal.service';
import { AuthService } from '../../../_services/_auth_service/auth.service';
import { ApiResponse } from '../../../_models/apiResponseModels/apiResponse';
import { LoginResponseModel } from '../../../_models/loginResponseModel';
declare let alertify: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() id: string;
  loginForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  notLoading: boolean = true;
  private element: any;
  sub!: Subscription;
  hide: boolean = true;
  cursor: boolean = true;
  isFormSubmitted: boolean;

  constructor(
    fb: FormBuilder,
    private modalService: ModalService,
    private el: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      return;
    }
    document.body.appendChild(this.element);
    this.modalService.add(this);
  }

  onLogin() {
    let currentUrl = this.router.url;
    this.isFormSubmitted = true;
    this.cursor = false;
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.notLoading = false;
    setTimeout(() => {
      this.sub = this.authService.login(this.loginForm.value).subscribe(
        (data: ApiResponse<LoginResponseModel>) => {
          this.authService.setToken(data.Data.Token);
          alertify.success('Login Successful');
          this.loading = false;
          this.notLoading = true;
          this.closeModal();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate([currentUrl]));
        },
        (error) => {
          this.errorMessage = error.error.Message;
          this.loading = false;
          this.notLoading = true;
          this.cursor = true;
          alertify.error('Login failed');
        }
      );
    }, 2000);
  }

  @HostListener('click', ['$event.target']) onClick(tar) {
    if (tar.className === 'deca-login-modal') {
      this.closeModal();
    }
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
    this.sub.unsubscribe;
  }
  openModal(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }
  closeModal(): void {
    this.loginForm.reset();
    this.isFormSubmitted = false;
    this.errorMessage = '';
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}
