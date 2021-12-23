import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.css']
})
export class BoxDetailsComponent implements OnInit , OnDestroy {

  id: number = 0;
  sub: any;
  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
