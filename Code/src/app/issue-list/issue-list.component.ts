import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { Issue } from './issue.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  filterId: number;
  filterServerity = '';
  filterStatus = '';
  filterCreatedDate = '';
  filterResolvedDate = '';
  issues: Issue[] = [];
  idArray: number[] = [];

  constructor(public issueService: IssueService, private router: Router, private http: HttpClient) { }

  ngOnInit() {

    this.issueService.getIssue();
    console.log(this.issues);
    this.issueService.getUpdatedIssue().subscribe( issues => {
      this.issues = issues;
    });
  }
  delete(id) {
    this.issueService.deleteIssue(id);
  }
  update(id) {
    this.router.navigate(['/edit', id]);
  }

  saveIdToBeDeleted(id: number) {
    if (this.idArray.includes(id)) {
      this.idArray = this.idArray.filter(i => i !== id);
      console.log('if', this.idArray);
    } else {
      this.idArray.push(id);
    }
    console.log(this.idArray);

  }
  onDeleteMany() {
    this.idArray.forEach(i => {
      console.log(i);
      this.issueService.deleteIssue(i);
    });
    this.idArray = [];

    }

  }



