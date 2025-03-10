import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDetails } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_COURSE_DETAILS } from '../../../mock-data/mock-course-details';
import { SafePipe } from '../../../pipes/safe.pipe';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,FormsModule, SafePipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: CourseDetails | null = null;
  videoUrl: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    // Mock data for now
    this.courseDetails = MOCK_COURSE_DETAILS;
    // Fetch real data from service based on courseId in production
  }

  openVideo(videoUrl: string): void {
    const videoId = this.extractVideoId(videoUrl);
    this.videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  closeVideo(): void {
    this.videoUrl = null;
  }

  private extractVideoId(url: string): string {
    const regex = /youtube\.com\/watch\?v=([^"&?/]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
}
