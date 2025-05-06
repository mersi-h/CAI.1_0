import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {UserInformation} from "../classes/user-information";
import {Skills} from "../classes/skills";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

    private API_FIND_USERNAME = '/user/getUserByUsername/';
    private API_FIND_ID = '/user/getUser/';
    private API_FIND_USER_INFO_ID = '/user/getUserInfo/';
    private API_FIND_USER_SKILLS_ID = '/user/getSkills/';
    private API_JOIN_TEAM = '/user/joinTeam/';
    private API_LEAVE_TEAM = '/user/leaveTeam/username/';
    private API_SAVE_USER_INFO = '/user/saveUserInfo/';
    private API_SAVE_SKILLS = '/user/saveSkills/';
    private API_FIND_TEAMS_BY_USERNAME = '/user/allTeams/username/';
    private API_USER = '/api/users';

    constructor(http: HttpClient) {
    super(http);
    }

    public addUser(user: User):Observable<User>{
        return this.http.post<User>(this.BASE_URL + this.API_USER , user)
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(this.BASE_URL + this.API_USER+ id, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(this.BASE_URL + this.API_USER + id);
    }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.BASE_URL + this.API_USER);
    }

    public getUserByUsername(username: string): Observable<any> {
        return this.http.get<any>(this.BASE_URL + this.API_FIND_USERNAME + username);
    }

    public getUserById(userId: number): Observable<any> {
        return this.http.get<any>(this.BASE_URL + this.API_FIND_ID + userId);
    }

    public getUserInfoById(userId: number): Observable<any> {
        return this.http.get<any>(this.BASE_URL + this.API_FIND_USER_INFO_ID + userId);
    }

    public getSkillsById(userId: number): Observable<any> {
        return this.http.get<any>(this.BASE_URL + this.API_FIND_USER_SKILLS_ID + userId);
    }

    public joinTeam(username: string, teamId: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params.append('username', username);
        params.append('teamId', teamId);
        return this.http.post<any>(this.BASE_URL + this.API_JOIN_TEAM, {params});
    }

    public leaveTeam(username: string, teamId: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params.append('username', username);
        params.append('teamId', teamId);
        return this.http.post<any>(this.BASE_URL + this.API_LEAVE_TEAM, {params});
    }

    public saveUserInfo(user: UserInformation): Observable<any> {
        return this.http.post<any>(this.BASE_URL + this.API_SAVE_USER_INFO, user);
    }

    public saveSkills(skills: Skills): Observable<any> {
        return this.http.post<any>(this.BASE_URL + this.API_SAVE_SKILLS, skills);
    }

    public getTeamsByUsername(username: string): Observable<any> {
        return this.http.get<any>(this.BASE_URL + this.API_FIND_TEAMS_BY_USERNAME + username);
    }


}
