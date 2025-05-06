import {Component} from '@angular/core';
import {User} from "../../../../model/user";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserService} from "../../../service/user.service";
import {Role} from "../../../../model/role";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  isEdit: boolean = false;
  user: User;

  constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private userService: UserService
  ) {
    this.user = new User();
    if(this.config.data.isEdit){
      this.isEdit = this.config.data.isEdit;
      console.log(this.isEdit)
    }
    if (this.config.data.user) {
      this.user = JSON.parse(JSON.stringify(this.config.data.user))as User;
    }

  }

  saveUser() {

    if (this.isEdit) {
      this.userService.updateUser(this.user.id,this.user).subscribe(() => this.ref.close(true));
    } else {
      this.user.role= Role.PROCUREMENT_OFFICER;
      this.userService.addUser(this.user).subscribe(() => this.ref.close(true));
    }
  }

  ngOnInit(): void {
  }


}
