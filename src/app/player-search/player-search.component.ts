import { Component, OnInit } from '@angular/core';
import {
	FirestoreService,
	PlayerQueryOptions,
	PlayerNameQueryOptions,
	GameQueryOptions,
	PlayerSeasonStatsQueryOptions,
} from '../firestore-service/firestore.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-player-search',
	templateUrl: './player-search.component.html',
	styleUrls: ['./player-search.component.css'],
})
export class PlayerSearchComponent implements OnInit {
	database: FirestoreService;
	players: Observable<PlayerQueryOptions[]>;
	playerSeasonStats: PlayerQueryOptions[] = [];
	playersFromName: PlayerNameQueryOptions[] = [];
	teams: Team[];
	seasons: Season[];
	gameQueryOptions: GameQueryOptions;
	playerQueryOptions: PlayerQueryOptions;
	playerNameQueryOptions: PlayerNameQueryOptions;
	playerSeasonStatsQueryOptions: PlayerSeasonStatsQueryOptions;
	canDisplayPlayerSearchTable: boolean;
	canDisplayPlayerSeasonStatsTable: boolean;

	datePlayer: string;
	constructor(firestoreService: FirestoreService) {
		this.canDisplayPlayerSearchTable = false;
		this.canDisplayPlayerSeasonStatsTable = false;
		this.teams = teams;
		this.database = firestoreService;
		this.seasons = this.generateSeasons();
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
			lastGameId: null,
			lastTeamAbbreviation: null,
		};
		this.playerSeasonStatsQueryOptions = {
			playerId: null,
			season: null,
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

	resetPlayerFields() {
		this.playerNameQueryOptions = {
			playerId: null,
			playerName: null,
			lastGameId: null,
			lastTeamAbbreviation: null,
		};
		this.playersFromName = [];
		this.playerSeasonStats = [];
		this.canDisplayPlayerSearchTable = false;
		this.canDisplayPlayerSeasonStatsTable = false;
	}

	submitPlayerNameQuery() {
		this.playersFromName = [];
		this.playerSeasonStats = [];
		this.canDisplayPlayerSeasonStatsTable = false;
		let performQuery: boolean = false;
		Object.values(this.playerNameQueryOptions).forEach((queryOption) => {
			if (queryOption != null) {
				performQuery = true;
			}
		});
		if (performQuery) {
			this.database.GetPlayerFromName(this.playerNameQueryOptions).forEach((players) => {
				players.forEach((player) => {
					let playerData: PlayerQueryOptions = {};
					this.database.GetPlayersLastGameInfo(player).forEach((x) => {
						playerData = x[0];
						player.lastGameId = playerData.gameId;
						player.lastTeamAbbreviation = playerData.team;
						this.playersFromName.push(player);
						this.canDisplayPlayerSearchTable = true;
					});
				});
			});
		}
	}

	clearPlayerSearchResults() {
		this.playersFromName = [];
		this.playerSeasonStats = [];
		this.canDisplayPlayerSearchTable = false;
		this.canDisplayPlayerSeasonStatsTable = false;
	}

	clearPlayerSeasonResults() {
		this.playerSeasonStats = [];
		this.canDisplayPlayerSeasonStatsTable = false;
	}

	submitPlayerSeasonQuery(playerId: string, season: HTMLSelectElement) {
		if (season.selectedIndex - 1 === -1) {
			return;
		}
		this.playerSeasonStats = [];
		let selectedSeason: Season = this.seasons[season.selectedIndex - 1];
		this.playerSeasonStatsQueryOptions = {
			playerId: playerId,
			season: selectedSeason,
		};
		this.database.GetPlayerSeasonStats(this.playerSeasonStatsQueryOptions).forEach((season) => {
			season.forEach((game) => {
				this.playerSeasonStats.push(game);
			});
			console.log(this.playerSeasonStats);
			this.canDisplayPlayerSeasonStatsTable = true;
		});
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
