import { GamesService } from '../../services/games.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Chart from 'chart.js/auto';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  slides: any[] = [];
  gameId: any;
  gameDetails: any;
  chart: any = null;
  pieChartLabels: any = [];
  gameName: string = '';
  GameTrailerId: string = '';

  private youtubeSearchGameTrailerURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${environment.YOUTUBE_API_KEY}&type=video&q=${this.gameName}&maxResults=1`;

  constructor(
    private route: ActivatedRoute,
    private GamesService: GamesService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.gameId = params.get('id');
          return this.GamesService.getGameDetails(this.gameId);
        })
      )
      .subscribe((details) => {
        this.gameDetails = details;

        var labels = this.gameDetails.ratings.map((rating: any) => {
          return rating.title;
        });

        var data = this.gameDetails.ratings.map((rating: any) => {
          return rating.count;
        });

        if (this.gameDetails) {
          if (this.chart) {
            this.chart.destroy();
          }
          this.chart = new Chart('chart', {
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Game Ratings',
                  data: data,
                  backgroundColor: [
                    'blue',
                    'green',
                    'rgb(255, 205, 86)',
                    'red',
                  ],
                  hoverOffset: 4,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                },
              },
              elements: {
                arc: {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                },
              },
            },
          });
        }
        this.fetchAdditionalDetailsByName(this.gameDetails.name_original);
        const gameNameWithTrailer =
          this.gameDetails.name_original + ' game trailer';
        this.youtubeSearchGameTrailerURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${environment.YOUTUBE_API_KEY}&type=video&q=${gameNameWithTrailer}&maxResults=1`;
        this.http
          .get(this.youtubeSearchGameTrailerURL)
          .subscribe((youtubeData: any) => {
            var GameTrailerId = youtubeData.items[0].id.videoId;
            this.GameTrailerId = GameTrailerId;
          });
      });

  }

  

  fetchAdditionalDetailsByName(gameName: string): void {
    this.GamesService.searchGames(gameName).subscribe((searchResults) => {
      var screenshotsArray = searchResults.results[0].short_screenshots;
      var filteredScreenshots = screenshotsArray.filter(
        (screenshot: any) => screenshot.id >= 0
      );
      this.slides = filteredScreenshots;

      console.log(this.slides);
    });
  }

  redirectToStore(domain: string): void {
    window.open('http://' + domain, '_blank');
  }
  getYouTubeEmbedUrl(
    GameTrailerId: string | undefined
  ): SafeResourceUrl | string {
    if (GameTrailerId) {
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${GameTrailerId}?autoplay=0`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
    } else {
      return '';
    }
  }
}
