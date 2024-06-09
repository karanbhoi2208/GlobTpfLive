import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Participant } from '../../participant';
import { ParticipantService } from '../../participant.service';

@Component({
  selector: 'app-participant-basic-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './participant-basic-details.component.html',
  styleUrl: './participant-basic-details.component.css'
})
export class ParticipantBasicDetailsComponent implements OnInit {
  participant: Participant = {
    email: '',
    name: '',
    password: '',
    contact: '',
    roles: [],
    enabled: false,
  };
  file: File | null = null;
  fileBytes: string | undefined; // Changed type to 'string | undefined'

  email: any;
  password: any;

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    this.participantService.getParticipantByEmailAndPassword(this.email, this.password).subscribe(
      (participant: Participant) => { this.participant = participant });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileBytes = btoa(String.fromCharCode(...new Uint8Array(e.target?.result as ArrayBuffer)));
      };
      reader.readAsArrayBuffer(this.file);
    }
  }

  getImageUrl(base64Data: string | undefined): string {
    return base64Data ? `data:image/jpeg;base64,${base64Data}` : '';
  }
}
