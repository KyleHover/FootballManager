import { Component, OnInit } from '@angular/core';
import { AngularFirestore, CollectionReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Game {
  Gameid: number;
  Opponent: string;
  PassingYards: number;
  Penalties: number;
  PenaltyYards: number;
  PuntAverage: number;
  PuntYards: number;
  RunningYards: number;
  Team: string;
  TotalYards: number;
  Turnovers: number;
  punts: number;
  totfd: number;
}

export interface Team {
  Name: string,
  Abbreviation: string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  games: Observable<any[]>;
  dateFilter: BehaviorSubject<number | null>;
  team1Filter: BehaviorSubject<string | null>;
  team2Filter: BehaviorSubject<string | null>;

  teams: Team[];

  db: AngularFirestore;
  constructor(db: AngularFirestore) {
    this.teams = teams;
    this.db = db;
    this.dateFilter = new BehaviorSubject(null);
    this.team1Filter = new BehaviorSubject(null);
    this.team2Filter = new BehaviorSubject(null);
    
  }

  submitQuery(value: any) {
    
    let gameId: number = 0;
    if (value.date != '') gameId = +value.date.replace('-','').replace('-','')*100;
    
    let abbrev1: string = '';
    if (value.Team1 != '') abbrev1 = value.Team1.Abbreviation;
    
    let abbrev2: string = '';
    if (value.Team2 != '') abbrev2 = value.Team2.Abbreviation;

    if (gameId > 0 || abbrev1 != '' || abbrev2 != '') {
      this.games = this.db.collection('Games', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (gameId > 0) { query = query.where('Gameid', '>=', gameId).where('Gameid', '<', gameId + 99) };
        if (abbrev1 != '') { query = query.where('Team', '==', abbrev1) };
        if (abbrev2 != '') { query = query.where('Opponent', '==', abbrev2) };
        return query;
      }).valueChanges();
    }
  }

  ngOnInit() {
  }

}

var teams: Team[] = [
  { Name:'Arizona Cardinals', Abbreviation:'ARI' },
  { Name:'Atlanta Falcons', Abbreviation:'ATL' },
  { Name:'Baltimore Ravens', Abbreviation:'BAL' },
  { Name:'Buffalo Bills', Abbreviation:'BUF' },
  { Name:'Carolina Panthers', Abbreviation:'CAR' },
  { Name:'Chicago Bears', Abbreviation:'CHI' },
  { Name:'Cincinnati Bengals', Abbreviation:'CIN' },
  { Name:'Cleveland Browns', Abbreviation:'CLE' },
  { Name:'Dallas Cowboys', Abbreviation:'DAL' },
  { Name:'Denver Broncos', Abbreviation:'DEN' },
  { Name:'Detroit Lions', Abbreviation:'DET' },
  { Name:'Green Bay Packers', Abbreviation:'GB' },
  { Name:'Houston Texans', Abbreviation:'HOU' },
  { Name:'Indianapolis Colts', Abbreviation:'IND' },
  { Name:'Jacksonville Jaguars', Abbreviation:'JAX' },
  { Name:'Kansas City Chiefs', Abbreviation:'KC' },
  { Name:'Los Angeles Chargers', Abbreviation:'LAC' },
  { Name:'Los Angeles Rams', Abbreviation:'LA' },
  { Name:'Miami Dolphins', Abbreviation:'MIA' },
  { Name:'Minnesota Vikings', Abbreviation:'MIN' },
  { Name:'New England Patriots', Abbreviation:'NE' },
  { Name:'New Orleans Saints', Abbreviation:'NO' },
  { Name:'New York Giants', Abbreviation:'NYG' },
  { Name:'New York Jets', Abbreviation:'NYJ' },
  { Name:'Oakland Raiders', Abbreviation:'OAK' },
  { Name:'Philadelphia Eagles', Abbreviation:'PHI' },
  { Name:'Pittsburgh Steelers', Abbreviation:'PIT' },
  { Name:'San Francisco 49ers', Abbreviation:'SF' },
  { Name:'Seattle Seahawks', Abbreviation:'SEA' },
  { Name:'Tampa Bay Buccaneers', Abbreviation:'TB' },
  { Name:'Tennessee Titans', Abbreviation:'TEN' },
  { Name:'Washington Redskins', Abbreviation:'WAS' }
];