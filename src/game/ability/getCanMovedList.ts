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

export default function (kSq: number, owner: number): number[] {
	const result = [];
	const rOwner = this.getReverseOwner(owner);
	// 一つ上の駒
	let cSq = kSq - 1;
	if (cSq > 0 && cSq % 9 !== 8) {
		if (
			this.checkHaving(DO, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 右上の駒
	cSq = kSq - 10;
	if (cSq > 0 && cSq % 9 !== 8) {
		if (
			this.checkHaving(DO_LE, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 右の駒
	cSq = kSq - 9;
	if (cSq > 0) {
		if (
			this.checkHaving(LE, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 右下の駒
	cSq = kSq - 8;
	if (cSq > 0 && cSq % 9 !== 0) {
		if (
			this.checkHaving(UP_LE, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 下の駒
	cSq = kSq + 1;
	if (cSq < 81 && cSq % 9 !== 0) {
		if (
			this.checkHaving(UP, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 下左の駒
	cSq = kSq + 10;
	if (cSq < 81 && cSq % 9 !== 0) {
		if (
			this.checkHaving(UP_RI, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 左の駒
	cSq = kSq + 9;
	if (cSq < 81) {
		if (
			this.checkHaving(RI, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 左上の駒
	cSq = kSq + 8;
	if (cSq < 81 && cSq % 9 !== 8) {
		if (
			this.checkHaving(DO_RI, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 桂馬チェック右上
	cSq = kSq - 11;
	if (cSq > 0 && cSq % 9 !== 8 && cSq % 9 !== 7) {
		if (
			this.checkHaving(DO2_LE, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 桂馬チェッ右下
	cSq = kSq - 7;
	if (cSq > 0 && cSq % 9 !== 0 && cSq % 9 !== 1) {
		if (
			this.checkHaving(UP2_LE, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 桂馬チェック左下
	cSq = kSq + 11;
	if (cSq < 81 && cSq % 9 !== 0 && cSq % 9 !== 1) {
		if (
			this.checkHaving(UP2_RI, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 桂馬チェック左上
	cSq = kSq + 7;
	if (cSq < 81 && cSq % 9 !== 8 && cSq % 9 !== 7) {
		if (
			this.checkHaving(DO2_RI, this.board[cSq].koma, this.board[cSq].owner) &&
			this.board[cSq].owner === owner
		) {
			result.push(cSq);
		}
	}

	// 上方向チェック
	cSq = kSq;
	while (cSq % 9 !== 0) {
		cSq = cSq - 1;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_DO, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}

	// 右上方向チェック
	cSq = kSq;
	while (cSq % 9 !== 0 && cSq - 10 > 0) {
		cSq = cSq - 10;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_DO_LE, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}

	// 右方向チェック
	cSq = kSq;
	while (cSq - 9 > 0) {
		cSq = cSq - 9;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_LE, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}

	// 右下方向チェック
	cSq = kSq;
	while (cSq % 9 !== 8 && cSq - 8 > 0) {
		cSq = cSq - 8;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_UP_LE, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}

	// 下方向チェック
	cSq = kSq;
	while (cSq % 9 !== 8) {
		cSq = cSq + 1;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_UP, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}

	// 左下方向チェック
	cSq = kSq;
	while (cSq % 9 !== 8 && cSq + 10 < 81) {
		cSq = cSq + 10;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_UP_RI, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}

	// 左方向チェック
	cSq = kSq;
	while (cSq + 9 < 81) {
		cSq = cSq + 9;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_RI, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}

	// 左上方向チェック
	cSq = kSq;
	while (cSq % 9 !== 0 && cSq + 8 < 81) {
		cSq = cSq + 8;
		if (this.board[cSq].owner === rOwner) {
			break;
		}
		if (this.board[cSq].owner === owner) {
			if (this.checkHaving(INF_DO_RI, this.board[cSq].koma, this.board[cSq].owner)) {
				result.push(cSq);
				break;
			}
			break;
		}
	}
	return result;
}
