import { klona } from 'klona';
import { NONE, PLAYER_NONE } from '../constant';

export default function (fromSq: number, sq: number): boolean {
	const { owner } = this.board[fromSq];
	const rOwner = this.getReverseOwner(owner);
	// 駒の飛越チェック
	if (fromSq - sq > 10) {
		// 右上に行く動き
		if ((fromSq - sq) % 10 === 0) {
			let tmpSq = fromSq - 10;
			while (tmpSq > sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				if (tmpSq % 9 === 0) {
					break;
				}
				tmpSq = tmpSq - 10;
			}
		} else if ((fromSq - sq) % 8 === 0) {
			// 右下に行く動き
			let tmpSq = fromSq - 8;
			while (tmpSq > sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				if (tmpSq % 9 === 8) {
					break;
				}
				tmpSq = tmpSq - 8;
			}
		}
	} else if (fromSq - sq < -10) {
		if ((sq - fromSq) % 10 === 0) {
			// 左下に行く動き
			let tmpSq = fromSq + 10;
			while (tmpSq < sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				if (tmpSq % 9 === 8) {
					break;
				}
				tmpSq = tmpSq + 10;
			}
		} else if ((sq - fromSq) % 8 === 0) {
			// 左上に行く動き
			let tmpSq = fromSq + 8;
			while (tmpSq < sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				if (tmpSq % 9 === 0) {
					break;
				}
				tmpSq = tmpSq + 8;
			}
		}
	}
	// 飛車の飛越チェック
	if (fromSq - sq > 0) {
		if (fromSq - sq < 9 && fromSq % 9 > sq % 9) {
			let tmpSq = fromSq - 1;
			while (tmpSq > sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				tmpSq = tmpSq - 1;
			}
		} else if ((fromSq - sq) % 9 === 0) {
			let tmpSq = fromSq - 9;
			while (tmpSq > sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				tmpSq = tmpSq - 9;
			}
		}
	} else if (fromSq - sq < 0) {
		if (sq - fromSq < 9 && fromSq % 9 < sq % 9) {
			let tmpSq = fromSq + 1;
			while (tmpSq < sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				tmpSq = tmpSq + 1;
			}
		} else if ((sq - fromSq) % 9 === 0) {
			let tmpSq = fromSq + 9;
			while (tmpSq < sq) {
				if (this.board[tmpSq].owner === rOwner) {
					return false;
				}
				tmpSq = tmpSq + 9;
			}
		}
	}
	// 王手を無視していないかのチェック
	const kSq = this.getKingSquare(owner);
	if (kSq === false) {
		return true;
	}

	const fromBefore = klona(this.board[fromSq]);
	const toBefore = klona(this.board[sq]);
	this.board[sq] = {
		koma: fromBefore.koma,
		owner: fromBefore.owner
	};
	this.board[fromSq] = {
		koma: NONE,
		owner: PLAYER_NONE
	};
	let result;
	if (this.getCheckingStatus(owner)) {
		result = false;
	} else {
		result = true;
	}
	this.board[fromSq] = {
		koma: fromBefore.koma,
		owner: fromBefore.owner
	};
	this.board[sq] = {
		koma: toBefore.koma,
		owner: toBefore.owner
	};
	return result;
}
