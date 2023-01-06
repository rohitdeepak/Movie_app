import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMovie: any;
  popularMovie !: Movie;
  nowPlayingMovies !: Movie;
  topRatedMovies !: Movie;
  upComingMovies! : Movie;
  trendingMovies!: Movie;
  originals! : Movie;
  constructor(private dataservice : DataService) { }

  ngOnInit(): void {
    this.getLatestMovie();
    this.getNowPlayingMovie();
    this.getOriginals();
    this.getPopularMovie();
    this.getTopRatedMovie();
    this.getTrendingMovie();
    this.getUpComingMovie();
  }

  getLatestMovie() {
    this.dataservice.getLatestMovie().subscribe(res =>{
      this.latestMovie =this.changeData(res);
      console.log(res.backdrop_path);
      
    },err =>{
      console.log('latest movies not found',err);
    })
  }

  getPopularMovie(){
    this.dataservice.getPopularMovie().subscribe(res =>{
      this.popularMovie= this.modifyData(res);
    },err =>{
      console.log('error not found',err);
      
    })
  }

  getNowPlayingMovie(){
    this.dataservice.getNowPlayingMovie().subscribe(res =>{
      this.nowPlayingMovies= this.modifyData(res);
    },err =>{
      console.log('error not found',err);
      
    })
  }

  getTrendingMovie(){
    this.dataservice.getTrendingMovie().subscribe(res =>{
      this.trendingMovies= this.modifyData(res);
    },err =>{
      console.log('error not found',err);
      
    })
  }

  getUpComingMovie(){
    this.dataservice.getUpComingMovie().subscribe(res =>{
      this.upComingMovies= this.modifyData(res);
    },err =>{
      console.log('error not found',err);
      
    })
  }

  getOriginals(){
    this.dataservice.getOriginals().subscribe(res =>{
      this.originals= this.modifyData(res);
    },err =>{
      console.log('error not found',err);
      
    })
  }

  getTopRatedMovie(){
    this.dataservice.getTopRatedMovie().subscribe(res =>{
      this.topRatedMovies= this.modifyData(res);
    },err =>{
      console.log('error not found',err);
      
    })
  }

  changeData(res: any):any{
    if(!res.backdrop_path){
      res.backdrop_path = 'https://image.tmdb.org/t/p/original'+res.poster_path+'?api_key='+environment.api_key;
    }else{
      res.backdrop_path ='https://image.tmdb.org/t/p/original'+res.backdrop_path+'?api_key='+environment.api_key;
    }
    return res;
  }

  modifyData(movies : Movie) : Movie{
    if(movies.results){
      movies.results.forEach(element =>{
        element.backdrop_path = 'https://image.tmdb.org/t/p/original'+element.backdrop_path+'?api_key='+environment.api_key;
        if(!element.title){
          element.title = element?.name
        }
      })
    }
    return movies;
  }
}
