import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent {
  id!: string | null;
  dpgf: boolean = true;
  projectInfo: { name: string; surface: number; adresse: string } = {
    name : '',
    surface : 0,
    adresse : ''
  };

  constructor(
    private route: ActivatedRoute,
    private project: ProjectsService,
    private router : Router
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((id) => {
      this.id = id.get('id');
    });


    this.project.GetProjectByIdAndCheckDpgf(this.id).pipe(
      catchError((error)=>{
        console.log(error);
        return of(400)
        
      })
    ).subscribe((json) => {
      console.log(JSON.stringify(json));
      if (json == 400) {
        this.router.navigate(['/home/projects/list'])
      }
      let serverResponse = json as {
        resp: Record<string, string>;
        dpgf: boolean;
      };
      console.log('nm  :'+ serverResponse.resp["name"]);
      this.projectInfo.name = serverResponse.resp['name'];
      this.projectInfo.adresse = serverResponse.resp['adresse'];
      this.projectInfo.surface = Number(serverResponse.resp['surface']);
      if (serverResponse.dpgf) this.dpgf = true;
      else this.dpgf = false;
      
    });
  }
}
