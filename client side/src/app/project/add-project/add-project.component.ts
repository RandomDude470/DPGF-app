import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  constructor(private project: ProjectsService, private router: Router) {}

  error = ''
  OnNotify(data: Record<string, string>) {
    this.project.saveNewProject(data).subscribe((res) => {
      if (res == 'ok') {
        this.router.navigate(['/home/projects/list']);
    
      }else{
        this.error = res
      }
    });
  }
}
