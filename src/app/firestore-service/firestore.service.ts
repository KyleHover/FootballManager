import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {
	database: AngularFirestore;
	teams: Team[];

	constructor(angularFirestore: AngularFirestore) {
		this.database = angularFirestore;
		this.teams = teams;
	}

	GetPlayerSeasonStats(options: PlayerSeasonStatsQueryOptions): Observable<PlayerQueryOptions[]> {
		let seasonStats: Observable<PlayerSeasonStatsQueryOptions[]> = this.database
			.collection(`Players/${options.playerId}/Games`, (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
				if (options.season.FirstGameId && options.season.LastGameId) {
					query = query.where('gameId', '>=', options.season.FirstGameId).where('gameId', '<=', options.season.LastGameId);
				}
				return query;
			})
			.valueChanges();
		return seasonStats;
	}

	GetPlayerFromId(options: PlayerQueryOptions): Observable<PlayerQueryOptions[]> {
		let playerData: Observable<PlayerQueryOptions[]> = this.database
			.collection(`Players/${options.playerId}/Games`, (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
				if (options.playerName) {
					query = query.where('playerName', '==', options.playerName);
				}
				if (options.gameId && options.gameId > 0) {
					query = query.where('Gameid', '>=', options.gameId).where('Gameid', '<', options.gameId + 99);
				}
				if (options.team) {
					query = query.where('team', '==', options.team);
				}
				if (options.playerStats) {
					if (options.playerStats.fumbles) {
						let fumbles: FumbleQueryOptions = options.playerStats.fumbles;
						let queryString: string = 'playerStats.fumbles';
						query = this.QueryByFumbleStats(fumbles, queryString, query);
					}
					if (options.playerStats.passing) {
						let passing: PassingQueryOptions = options.playerStats.passing;
						let queryString: string = 'playerStats.passing';
						query = this.QueryByPassingStats(passing, queryString, query);
					}
					if (options.playerStats.rushing) {
						let rushing: RushingQueryOptions = options.playerStats.rushing;
						let queryString: string = 'playerStats.rushing';
						query = this.QueryByRushingStats(rushing, queryString, query);
					}
					if (options.playerStats.receiving) {
						let receiving: ReceivingQueryOptions = options.playerStats.receiving;
						let queryString: string = 'playerStats.receiving';
						query = this.QueryByReceivingStats(receiving, queryString, query);
					}
				}

				return query;
			})
			.valueChanges();
		return playerData;
	}

	GetPlayersLastGameInfo(options: PlayerNameQueryOptions): Observable<PlayerQueryOptions[]> {
		let lastGameObservable: Observable<PlayerQueryOptions[]> = this.database
			.collection(`Players/${options.playerId}/Games`, (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
				query = query.orderBy('gameId', 'desc').limit(1);
				return query;
			})
			.valueChanges();
		return lastGameObservable;
	}

	GetPlayer(options: PlayerQueryOptions): Observable<PlayerQueryOptions[]> {
		let playerData: Observable<PlayerQueryOptions[]> = this.database
			.collection('Players', (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

				return query;
			})
			.valueChanges();
		return playerData;
	}

	GetPlayerFromName(options: PlayerNameQueryOptions): Observable<PlayerNameQueryOptions[]> {
		let playerDataObservable: Observable<PlayerNameQueryOptions[]> = this.database
			.collection('Players', (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
				if (options.playerName) {
					query = query.where('playerName', '==', options.playerName);
				}
				if (options.playerId) {
					query = query.where('playerId', '==', options.playerId);
				}
				return query;
			})
			.valueChanges();
		return playerDataObservable;
	}

	QueryByFumbleStats(
		options: FumbleQueryOptions,
		queryString: string,
		query: firebase.firestore.CollectionReference | firebase.firestore.Query
	): firebase.firestore.CollectionReference | firebase.firestore.Query {
		if (options.fumbles_lost != null) {
			query = query.where(`${queryString}.fumbles_lost`, '==', options.fumbles_lost);
		}
		if (options.recovered != null) {
			query = query.where(`${queryString}.recovered`, '==', options.recovered);
		}
		if (options.team_recovered != null) {
			query = query.where(`${queryString}.recovered`, '==', options.team_recovered);
		}
		if (options.total_fumbles != null) {
			query = query.where(`${queryString}.total_fumbles`, '==', options.total_fumbles);
		}
		if (options.yards != null) {
			query = query.where(`${queryString}.yards`, '==', options.yards);
		}
		return query;
	}

	QueryByPassingStats(
		options: PassingQueryOptions,
		queryString: string,
		query: firebase.firestore.CollectionReference | firebase.firestore.Query
	): firebase.firestore.CollectionReference | firebase.firestore.Query {
		if (options.attempts != null) {
			query = query.where(`${queryString}.attempts`, '==', options.attempts);
		}
		if (options.completions != null) {
			query = query.where(`${queryString}.completions`, '==', options.completions);
		}
		if (options.interceptions != null) {
			query = query.where(`${queryString}.interception`, '==', options.interceptions);
		}
		if (options.touchdowns != null) {
			query = query.where(`${queryString}.touchdowns`, '==', options.touchdowns);
		}
		if (options.two_point_attempts != null) {
			query = query.where(`${queryString}.two_point_attempts`, '==', options.two_point_attempts);
		}
		if (options.two_point_makes != null) {
			query = query.where(`${queryString}.two_point_makes`, '==', options.two_point_makes);
		}
		if (options.yards != null) {
			query = query.where(`${queryString}.yards`, '==', options.yards);
		}
		return query;
	}

	QueryByRushingStats(
		options: RushingQueryOptions,
		queryString: string,
		query: firebase.firestore.CollectionReference | firebase.firestore.Query
	): firebase.firestore.CollectionReference | firebase.firestore.Query {
		if (options.attempts != null) {
			query = query.where(`${queryString}.attempts`, '==', options.attempts);
		}
		if (options.long != null) {
			query = query.where(`${queryString}.long`, '==', options.long);
		}
		if (options.long_touchdown != null) {
			query = query.where(`${queryString}.long_touchdown`, '==', options.long_touchdown);
		}
		if (options.touchdowns != null) {
			query = query.where(`${queryString}.touchdowns`, '==', options.touchdowns);
		}
		if (options.two_point_attempts != null) {
			query = query.where(`${queryString}.two_point_attempts`, '==', options.two_point_attempts);
		}
		if (options.two_point_makes != null) {
			query = query.where(`${queryString}.two_point_makes`, '==', options.two_point_makes);
		}
		if (options.yards != null) {
			query = query.where(`${queryString}.yards`, '==', options.yards);
		}
		return query;
	}

	QueryByReceivingStats(
		options: ReceivingQueryOptions,
		queryString: string,
		query: firebase.firestore.CollectionReference | firebase.firestore.Query
	): firebase.firestore.CollectionReference | firebase.firestore.Query {
		if (options.long != null) {
			query = query.where(`${queryString}.long`, '==', options.long);
		}
		if (options.long_touchdown != null) {
			query = query.where(`${queryString}.long_touchdown`, '==', options.long_touchdown);
		}
		if (options.receptions != null) {
			query = query.where(`${queryString}.receptions`, '==', options.receptions);
		}
		if (options.touchdowns != null) {
			query = query.where(`${queryString}.touchdowns`, '==', options.touchdowns);
		}
		if (options.two_point_attempts != null) {
			query = query.where(`${queryString}.two_point_attempts`, '==', options.two_point_attempts);
		}
		if (options.two_point_makes != null) {
			query = query.where(`${queryString}.two_point_makes`, '==', options.two_point_makes);
		}
		if (options.yards != null) {
			query = query.where(`${queryString}.yards`, '==', options.yards);
		}
		return query;
	}

	GetGameStats(options: GameQueryOptions): Observable<GameQueryOptions[]> {
		let games: Observable<GameQueryOptions[]> = this.database
			.collection('Games', (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

				if (options.Gameid && options.Gameid > 0) {
					query = query.where('Gameid', '>=', options.Gameid).where('Gameid', '<', options.Gameid + 99);
				}
				if (options.Opponent) {
					query = query.where('Opponent', '==', options.Opponent);
				}
				if (options.PassingYards != null) {
					query = query.where('PassingYards', '==', options.PassingYards);
				}
				if (options.Penalties != null) {
					query = query.where('Penalties', '==', options.Penalties);
				}
				if (options.PenaltyYards != null) {
					query = query.where('PenaltyYards', '==', options.PenaltyYards);
				}
				if (options.PuntAverage != null) {
					query = query.where('PuntAverage', '==', options.PuntAverage);
				}
				if (options.PuntYards != null) {
					query = query.where('PuntYards', '==', options.PuntYards);
				}
				if (options.RunningYards != null) {
					query = query.where('RunningYards', '==', options.RunningYards);
				}
				if (options.Team) {
					query = query.where('Team', '==', options.Team);
				}
				if (options.TotalYards != null) {
					query = query.where('TotalYards', '==', options.TotalYards);
				}
				if (options.Turnovers != null) {
					query = query.where('Turnovers', '==', options.Turnovers);
				}
				if (options.punts != null) {
					query = query.where('punts', '==', options.punts);
				}
				if (options.totfd != null) {
					query = query.where('totfd', '==', options.totfd);
				}

				// query = query.orderBy('Gameid', 'desc');

				return query;
			})
			.valueChanges();
		return games;
	}

	GetMyTeam(): Observable<MyPlayerQueryOptions[]> {
		let myPlayers: Observable<MyPlayerQueryOptions[]> = this.database
			.collection('MyTeam/TeamOne', (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
				return query;
			})
			.valueChanges();
		return myPlayers;
	}

	AddTeamPlayer(options: MyPlayerQueryOptions) {
		let myTeam = this.database.collection('MyTeam/TeamOne');
		myTeam.add(options);
	}

	DeleteTeamPlayer(options: MyPlayerQueryOptions) {
		
	}

	GetTeamPlayer(options: MyPlayerQueryOptions): Observable<MyPlayerQueryOptions[]> {
		let myPlayer: Observable<MyPlayerQueryOptions[]> = this.database
			.collection('MyTeam/TeamOne', (ref) => {
				let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
				if (options.playerId != null) {
					query = query.where('playerId', '==', options.playerId);
				}
				if (options.playerName != null) {
					query = query.where('playerName', '==', options.playerName);
				}
				if (options.playerPicture != null) {
					query = query.where('playerPicture', '==', options.playerPicture);
				}
				return query;
			})
			.valueChanges();
		return myPlayer;
	}
}

export interface GameQueryOptions {
	Gameid?: number | null;
	Opponent?: string | null; // abbreviation
	PassingYards?: number | null;
	Penalties?: number | null;
	PenaltyYards?: number | null;
	PuntAverage?: number | null;
	PuntYards?: number | null;
	RunningYards?: number | null;
	Team?: string | null; // abbreviation
	TotalYards?: number | null;
	Turnovers?: number | null;
	punts?: number | null;
	totfd?: number | null; // total first downs
}

export interface PlayerNameQueryOptions {
	playerId?: string | null; // 00-xxxxxxx
	playerName?: string | null;
	lastGameId?: number | null;
	lastTeamAbbreviation?: string | null;
}

export interface MyPlayerQueryOptions {
	playerId?: string | null; // 00-xxxxxxx
	playerName?: string | null;
	playerPicture?: string | null;
}

export interface Season {
	Name: string;
	FirstGameId: number;
	LastGameId: number;
}

export interface PlayerSeasonStatsQueryOptions {
	playerId?: string | null; // 00-xxxxxxx
	season?: Season | null;
}

export interface PlayerQueryOptions {
	gameId?: number | null;
	playerId?: string | null; // 00-xxxxxxx
	playerName?: string | null;
	team?: string | null;
	playerStats?: PlayerStatsQueryOptions | null;
}

export interface PlayerStatsQueryOptions {
	fumbles?: FumbleQueryOptions | null;
	passing?: PassingQueryOptions | null;
	rushing?: RushingQueryOptions | null;
	receiving?: ReceivingQueryOptions | null;
}

export interface FumbleQueryOptions {
	fumbles_lost?: number | null;
	name?: string | null;
	recovered?: number | null;
	team_recovered?: number | null;
	total_fumbles?: number | null;
	yards?: number | null;
}

export interface PassingQueryOptions {
	attempts?: number | null;
	completions?: number | null;
	interceptions?: number | null;
	name?: string | null;
	touchdowns?: number | null;
	two_point_attempts?: number | null;
	two_point_makes?: number | null;
	yards?: number | null;
}

export interface RushingQueryOptions {
	attempts?: number | null;
	long?: number | null;
	long_touchdown?: number | null;
	name?: string | null;
	touchdowns?: number | null;
	two_point_attempts?: number | null;
	two_point_makes?: number | null;
	yards?: number | null;
}

export interface ReceivingQueryOptions {
	long?: number | null;
	long_touchdown?: number | null;
	name?: string | null;
	receptions?: number | null;
	touchdowns?: number | null;
	two_point_attempts?: number | null;
	two_point_makes?: number | null;
	yards?: number | null;
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
