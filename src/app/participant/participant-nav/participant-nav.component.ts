import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParticipantService } from '../../participant.service';
import { Participant } from '../../participant';

@Component({
  selector: 'app-participant-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './participant-nav.component.html',
  styleUrl: './participant-nav.component.css'
})
export class ParticipantNavComponent implements OnInit {

  partName: string = "John Doe";
  partImage: string | null = "https://www.gravatar.com/avatar/?d=mp";
  email: any;
  password: any;

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    if (!(sessionStorage.getItem('role') === "ROLE_PARTICIPANT")) {
      window.location.href = "/";
    }
    this.participantService.getParticipantByEmailAndPassword(this.email, this.password).subscribe(
      (participant: Participant) => { this.partName = participant.name });
  }

  deleteStorage() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role')
  }
}
