import { Component, OnInit } from '@angular/core';

@Component({
	// tslint:disable-next-line: indent
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
	about: string =
		'Fantasy Manager provides users access to advanced metrics and analysis to help improve their fantasy team.';

	aboutLink: string = '#';
	helpLink: string = '#';
	siteMap: string = '#';

	contactEmail: string = 'dan.mackey12@gmail.com';
	constructor() {}

	ngOnInit() {}
}
