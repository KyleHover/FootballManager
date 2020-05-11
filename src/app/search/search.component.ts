import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService, GameQueryOptions, PlayerQueryOptions, PlayerNameQueryOptions } from '../firestore-service/firestore.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
	games: Observable<GameQueryOptions[]>;
	database: FirestoreService;
	teams: Team[];

	gameQueryOptions: GameQueryOptions;
	playerQueryOptions: PlayerQueryOptions;
	playerNameQueryOptions: PlayerNameQueryOptions;
	dateGame: string;
	datePlayer: string;
	constructor(firestoreService: FirestoreService) {
		this.teams = teams;
		this.database = firestoreService;
		this.gameQueryOptions = {
			Gameid: null,
			Opponent: null,
			PassingYards: null,
			Penalties: null,
			PenaltyYards: null,
			PuntAverage: null,
			PuntYards: null,
			RunningYards: null,
			Team: null,
			TotalYards: null,
			Turnovers: null,
			punts: null,
			totfd: null,
		};
		this.playerQueryOptions = {
			gameId: null,
			playerId: null,
			playerName: null,
			team: null,
			playerStats: null,
		};
		this.playerNameQueryOptions = {
			playerId: null,
			playerName: null,
		};
	}

	generateSeasons() {
		let seasons: Season[] = [];
		for (let year = 2009; year <= new Date().getFullYear(); year++) {
			let season: Season = {
				Name: `${year}-${(year + 1).toString().slice(2)}`,
				FirstGameId: +(year.toString() + '080000'),
				LastGameId: +((year + 1).toString() + '040000'),
			};
			seasons.push(season);
		}
		return seasons;
	}

	updateGameDate(date) {
		if (date) {
			this.gameQueryOptions.Gameid = +date.replace('-', '').replace('-', '') * 100;
		} else {
			this.gameQueryOptions.Gameid = null;
		}
	}

	updatePlayerDate(date) {
		if (date) {
			this.playerQueryOptions.gameId = +date.replace('-', '').replace('-', '') * 100;
		} else {
			this.playerQueryOptions.gameId = null;
		}
	}

	resetGameFields() {
		this.gameQueryOptions = {
			Gameid: null,
			Opponent: null,
			PassingYards: null,
			Penalties: null,
			PenaltyYards: null,
			PuntAverage: null,
			PuntYards: null,
			RunningYards: null,
			Team: null,
			TotalYards: null,
			Turnovers: null,
			punts: null,
			totfd: null,
		};
		this.dateGame = '';
	}

	resetPlayerFields() {
		this.playerQueryOptions = {
			gameId: null,
			playerId: null,
			playerName: null,
			team: null,
			playerStats: null,
		};
		this.datePlayer = '';
	}

	clearGameSearchResults() {
		try {
			let resultsTable: HTMLDivElement = document.querySelector('div.game-search-results');
			resultsTable.style.display = 'none';
		} catch (err) {}
	}

	submitGameQuery() {
		let performQuery: boolean = false;
		Object.values(this.gameQueryOptions).forEach((queryOption) => {
			if (queryOption != null) {
				performQuery = true;
			}
		});
		if (performQuery) {
			this.games = this.database.GetGameStats(this.gameQueryOptions);
		}
		try {
			let resultsTable: HTMLDivElement = document.querySelector('div.game-search-results');
			resultsTable.style.display = 'block';
		} catch (err) {}
	}

	ngOnInit() {}
}

export interface Team {
	Name: string;
	Abbreviation: string;
}

let teams: Team[] = [
	{ Name: 'Arizona Cardinals', Abbreviation: 'ARI' },
	{ Name: 'Atlanta Falcons', Abbreviation: 'ATL' },
	{ Name: 'Baltimore Ravens', Abbreviation: 'BAL' },
	{ Name: 'Buffalo Bills', Abbreviation: 'BUF' },
	{ Name: 'Carolina Panthers', Abbreviation: 'CAR' },
	{ Name: 'Chicago Bears', Abbreviation: 'CHI' },
	{ Name: 'Cincinnati Bengals', Abbreviation: 'CIN' },
	{ Name: 'Cleveland Browns', Abbreviation: 'CLE' },
	{ Name: 'Dallas Cowboys', Abbreviation: 'DAL' },
	{ Name: 'Denver Broncos', Abbreviation: 'DEN' },
	{ Name: 'Detroit Lions', Abbreviation: 'DET' },
	{ Name: 'Green Bay Packers', Abbreviation: 'GB' },
	{ Name: 'Houston Texans', Abbreviation: 'HOU' },
	{ Name: 'Indianapolis Colts', Abbreviation: 'IND' },
	{ Name: 'Jacksonville Jaguars', Abbreviation: 'JAX' },
	{ Name: 'Kansas City Chiefs', Abbreviation: 'KC' },
	{ Name: 'Los Angeles Chargers', Abbreviation: 'LAC' },
	{ Name: 'Miami Dolphins', Abbreviation: 'MIA' },
	{ Name: 'Minnesota Vikings', Abbreviation: 'MIN' },
	{ Name: 'New England Patriots', Abbreviation: 'NE' },
	{ Name: 'New Orleans Saints', Abbreviation: 'NO' },
	{ Name: 'New York Giants', Abbreviation: 'NYG' },
	{ Name: 'New York Jets', Abbreviation: 'NYJ' },
	{ Name: 'Oakland Raiders', Abbreviation: 'OAK' },
	{ Name: 'Philadelphia Eagles', Abbreviation: 'PHI' },
	{ Name: 'Pittsburgh Steelers', Abbreviation: 'PIT' },
	{ Name: 'San Francisco 49ers', Abbreviation: 'SF' },
	{ Name: 'Seattle Seahawks', Abbreviation: 'SEA' },
	{ Name: 'St. Louis Rams', Abbreviation: 'STL' },
	{ Name: 'Tampa Bay Buccaneers', Abbreviation: 'TB' },
	{ Name: 'Tennessee Titans', Abbreviation: 'TEN' },
	{ Name: 'Washington Redskins', Abbreviation: 'WAS' },
];

export interface Season {
	Name: string;
	FirstGameId: number;
	LastGameId: number;
}
