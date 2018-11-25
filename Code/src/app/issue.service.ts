import { Injectable } from '@angular/core';
import { Issue } from './issue-list/issue.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class IssueService {
  private issues: Issue[] = [];
   id = 0;
  private updatedIssues = new Subject<(Issue[])>();
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};

  constructor(private http: HttpClient, private router: Router) {}

  putIssue(description: string, status: string, serverity: string, createdDate: string, resolvedDate: string) {
    this.id++;
    const issue: Issue = {
      id: this.id,
      description: description,
      status: status,
      serverity: serverity,
      createdDate: createdDate,
      resovledDate: resolvedDate
    };
    console.log(issue.id);
     this.http.post<Issue>('http://localhost:5555/issues', issue, this.httpOptions)
     .subscribe(data => {
           this.issues.push(issue);
            this.updatedIssues.next([...this.issues]);
            this.router.navigate(['/']);
     });


  }
  getUpdatedIssue() {
    return this.updatedIssues.asObservable();
  }

  getIssue() {
    this.http.get<Issue[]>('http://localhost:5555/issues')
    .subscribe(issues => {
      if (this.id === 0) {
        this.id = Math.max(...issues.map( i => i.id));
      }
      console.log(this.id);
      this.issues = issues;
      console.log(this.issues);
      this.updatedIssues.next([...this.issues]);
    });

  }
  deleteIssue(id: number) {

    this.http.delete('http://localhost:5555/issues/' + id).subscribe(data => {
      console.log(data);

      this.getIssue();
    });
  }

  updatedIssue(issue: Issue) {
    this.http.put('http://localhost:5555/issues/' + issue.id, issue, this.httpOptions)
    .subscribe( data => { console.log('issue Updated');
    this.getIssue();
    this.router.navigate(['/']);

  } );
  }
  getOneIssue(id: number) {
    const issue = this.issues.find(i => i.id === id);
    return issue;
  }
}
