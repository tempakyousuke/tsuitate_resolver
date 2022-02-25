import {
	UP,
	UP_RI,
	RI,
	DO_RI,
	DO,
	DO_LE,
	LE,
	UP_LE,
	INF_UP,
	INF_UP_RI,
	INF_RI,
	INF_DO_RI,
	INF_DO,
	INF_DO_LE,
	INF_LE,
	INF_UP_LE,
	UP2_RI,
	UP2_LE,
	DO2_RI,
	DO2_LE
} from '../constant';

export default function (ability: number, sq: number, board: GAME.Board): number[] {
	const owner = board[sq].owner;
	const result = [];
	switch (ability) {
		case UP: {
			const a = sq - 1;
			if (sq % 9 === 0) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case UP_RI: {
			const a = sq - 10;
			if (a < 0 || sq % 9 === 0) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case RI: {
			const a = sq - 9;
			if (a < 0) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case DO_RI: {
			const a = sq - 8;
			if (a < 0 || sq % 9 === 8) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case DO: {
			const a = sq + 1;
			if (sq % 9 === 8) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case DO_LE: {
			const a = sq + 10;
			if (a > 80 || sq % 9 === 8) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case LE: {
			const a = sq + 9;
			if (a > 80) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case UP_LE: {
			const a = sq + 8;
			if (a > 80 || sq % 9 === 0) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case UP2_RI: {
			const a = sq - 11;
			if (a < 0 || sq % 9 === 0 || sq % 9 === 1) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case DO2_RI: {
			const a = sq - 7;
			if (a < 0 || sq % 9 === 8 || sq % 9 === 7) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case DO2_LE: {
			const a = sq + 11;
			if (a > 80 || sq % 9 === 8 || sq % 9 === 7) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case UP2_LE: {
			const a = sq + 7;
			if (a > 80 || sq % 9 === 0 || sq % 9 === 1) {
				break;
			}
			if (board[a].owner !== owner) {
				result.push(a);
			}
			break;
		}
		case INF_UP: {
			let a = sq - 1;
			while (a >= 0 && a % 9 !== 8) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a - 1;
			}
			break;
		}
		case INF_UP_RI: {
			let a = sq - 10;
			while (a >= 0 && a % 9 !== 8) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a - 10;
			}
			break;
		}
		case INF_RI: {
			let a = sq - 9;
			while (a >= 0) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a - 9;
			}
			break;
		}
		case INF_DO_RI: {
			let a = sq - 8;
			while (a >= 0 && a % 9 !== 0) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a - 8;
			}
			break;
		}
		case INF_DO: {
			let a = sq + 1;
			while (a <= 80 && a % 9 !== 0) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a + 1;
			}
			break;
		}
		case INF_DO_LE: {
			let a = sq + 10;
			while (a <= 80 && a % 9 !== 0) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a + 10;
			}
			break;
		}
		case INF_LE: {
			let a = sq + 9;
			while (a <= 80) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a + 9;
			}
			break;
		}
		case INF_UP_LE: {
			let a = sq + 8;
			while (a <= 80 && a % 9 !== 8) {
				if (board[a].owner !== owner) {
					result.push(a);
				} else {
					break;
				}
				a = a + 8;
			}
			break;
		}
	}
	return result;
}
