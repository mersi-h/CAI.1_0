import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserService} from "../../service/user.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  ref?: DynamicDialogRef;

  constructor(
      private userService: UserService,
      private dialogService: DialogService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  openNewUserDialog() {
    this.ref = this.dialogService.open(UserDialogComponent, {
      showHeader: false,
      closable: false,
      contentStyle: {'overflow': 'auto', 'padding': '5'},
      width: '50%',
      data: {isEdit: false}
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.loadUsers();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User added successfully!'});
      }
    });
  }

  openEditUserDialog(user: User) {
    this.ref = this.dialogService.open(UserDialogComponent, {
      showHeader: false,
      closable: false,
      contentStyle: {'overflow': 'auto', 'padding': '5'},
      width: '50%',
      data: {user: user, isEdit: true}
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.loadUsers();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User updated successfully!'});
      }
    });
  }

  deleteUser(userId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(() => {
          this.loadUsers();
          this.messageService.add({severity: 'success', summary: 'Deleted', detail: 'User deleted successfully!'});
        });
      }
    });
  }

  getRole(user: User) {
    return user.role.toString();

  }
}


