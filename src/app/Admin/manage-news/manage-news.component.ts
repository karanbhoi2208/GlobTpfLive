import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { News } from '../../news';
import { NewsService } from '../../news.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import * as bootstrap from 'bootstrap'; // Ensure Bootstrap is correctly imported

@Component({
  selector: 'app-manage-news',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.css']
})
export class ManageNewsComponent implements OnInit {
  news: News[] = [];
  selectedNews: News = {
    title: '',
    description: ''
  };
  isLoading = false; // Variable to manage loading state

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchLatestNews();
  }

  fetchLatestNews(): void {
    this.isLoading = true; // Show loader
    this.newsService.getLatestNews().pipe(
      map((resp: any) => {
        return resp.content;
      })
    ).subscribe((newsData: News[]) => {
      this.news = this.news.concat(newsData); // Concatenate fetched news to existing array
      this.isLoading = false; // Hide loader
    }, () => {
      this.isLoading = false; // Hide loader in case of error
    });
  }

  getImageUrl(base64Data: string | undefined): string {
    return `data:image/jpeg;base64,${base64Data}`;
  }

  trimDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
  /*
    openEditModal(news: News): void {
      this.selectedNews = { ...news }; // Make a copy to prevent changing the original data directly
      // Open the Bootstrap modal for editing
      const editModal = new bootstrap.Modal(document.getElementById('editNewsModal')!);
      editModal.show();
    }
  
    saveEditedNews(): void {
      // Save the edited news, you can implement this logic according to your service
      // For now, let's just close the modal
      this.closeEditModal();
    }
  
    closeEditModal(): void {
      // Close the Bootstrap modal for editing
      const editModalElement = document.getElementById('editNewsModal')!;
      const editModal = bootstrap.Modal.getInstance(editModalElement);
      if (editModal) {
        editModal.hide();
      }
    }
  */
  deleteNews(news: News): void {
    if (news.id) {
      this.isLoading = true; // Show loader
      this.newsService.deleteById(news.id).subscribe(() => {
        this.isLoading = false; // Hide loader
        this.news = this.news.filter(item => item.id !== news.id); // Remove deleted news item from the list
      });
    }
  }
}
