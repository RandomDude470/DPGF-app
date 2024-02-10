import { Component,OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  title = 'Projects'
  loader = true
  error = ''
  projectList : [Record<string, string>] = [{}]
  constructor(private  projects : ProjectsService){}

  ngOnInit(){
    this.projects.getData().subscribe((res)=>{
      this.loader = false
        if ([400,401,500,404].includes(res as number)) {
          this.error= 'error : '+res
        } else {
          this.projectList = res as [Record<string,string>]
        }
      console.log(JSON.stringify(this.projectList[0]));
      
    })
  }

  DeleteProject(id : string){
    this.projects.DeletePeroject(id).subscribe((res)=>{
      if (res == 404) {
        alert('Project Id : '+ id+' Dosent exist')
      }
      this.ngOnInit()
    })
  }
}
