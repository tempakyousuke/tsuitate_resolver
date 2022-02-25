import { OU, NONE, BLACK, WHITE, PLAYER_NONE } from './constant';
import { GameInit } from './gameInit';

import getAbilityList from './ability/getAbilityList';
import getMovableArea from './ability/getMovableArea';
import getCanMovedList from './ability/getCanMovedList';
import checkMove from './ability/checkMove';
import isPutable from './ability/isPutable';
import mustPromote from './ability/mustPromote';
import isPromotable from './ability/isPromotable';
import alreadyExistHu from './ability/alreadyExistHu';
import getPromotePiece from './util/getPromotePiece';

export class GameAbility extends GameInit {
	get turnReverse(): number {
		return this.getReverseOwner(this.turn);
	}

	// 反対の所持者を返す
	getReverseOwner(owner: number): number {
		if (owner === WHITE) {
			return BLACK;
		} else if (owner === BLACK) {
			return WHITE;
		}
		return PLAYER_NONE;
	}

	// 王様のいるマスを返す
	getKingSquare(owner: number): number | false {
		for (const key of Object.keys(this.board)) {
			const numKey = parseInt(key);
			if (this.board[numKey].owner === owner && this.board[numKey].koma === OU) {
				return numKey;
			}
		}
		return false;
	}

	// 王手をかけられているかのチェック
	getCheckingStatus(owner: number): boolean {
		const kSq = this.getKingSquare(owner);
		if (kSq === false) {
			// 王様がいなければfalse
			return false;
		}
		const rOwner = this.getReverseOwner(owner);
		const canMoved = this.getCanMovedList(kSq, rOwner);
		if (canMoved.length > 0) {
			return true;
		}
		return false;
	}

	// 成った後の駒を取得
	getPromotePiece(piece: number): number {
		return getPromotePiece(piece);
	}

	// 成る事が可能かどうかの判定
	isPromotable(fromSquare: number, sq: number): boolean {
		const func = isPromotable.bind(this);
		return func(fromSquare, sq);
	}

	// 必ず成らなければいけないかの判定
	mustPromote(fromSq: number, sq: number): boolean {
		const func = mustPromote.bind(this);
		return func(fromSq, sq);
	}

	// 駒の能力を取得
	getAbilityList(koma: number, owner: number): number[] {
		return getAbilityList(koma, owner);
	}

	// 駒の特定のアビリティに対し動かせる場所を返す関数
	getMovableArea(ability: number, sq: number): number[] {
		return getMovableArea(ability, sq, this.board);
	}

	isPutable(sq: number, owner: number, piece: number): boolean {
		const func = isPutable.bind(this);
		return func(sq, owner, piece);
	}

	alreadyExistHu(sq: number): boolean {
		const func = alreadyExistHu.bind(this);
		return func(sq);
	}

	// 盤上の駒の配置は無視して動かせるかどうかチェック
	isMovable(fromSq: number, toSq: number): boolean {
		const movable = this.getPieceMovableArea(fromSq);
		return movable.includes(toSq);
	}

	// 反則かチェック 反則ならfalse
	checkMove(fromSq: number, sq: number): boolean {
		const func = checkMove.bind(this);
		return func(fromSq, sq);
	}

	isCheckmate(kingOwner: number): boolean {
		// 詰んでるか判定したい王様のマスを取得
		const kSq = this.getKingSquare(kingOwner);
		const owner = this.getReverseOwner(kingOwner);

		// 王様がいなければ詰んでいない
		if (kSq === false) {
			return false;
		}

		// 王手をかけている駒のマス一覧を取得
		const checkingPieceSquares = this.getCanMovedList(kSq, owner);

		if (checkingPieceSquares.length > 1) {
			// 両王手は逃げられるかどうかだけチェック
			if (this.isCanEscape(kSq, owner)) {
				return false;
			}
			return true;
		} else if (checkingPieceSquares.length === 1) {
			if (this.isCanEscape(kSq, owner)) {
				return false;
			}
			const checking = checkingPieceSquares[0];
			if (this.isCanMoveSquare(checking, kingOwner)) {
				return false;
			}

			// 合駒の対象のマスに移動できる駒があるかチェック
			const aigomaSquares = this.getNeedAigomaSquare(kSq, checking);
			for (const square of aigomaSquares) {
				if (this.isCanMoveSquare(square, kingOwner)) {
					return false;
				}
			}

			for (const square of aigomaSquares) {
				if (this.isCanPutSquare(square, kingOwner)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}

	getNeedAigomaSquare(kSq: number, checking: number): number[] {
		const kingColumn = Math.floor(kSq / 9);
		const checkingColumn = Math.floor(checking / 9);

		// 縦の利き
		if (kingColumn === checkingColumn) {
			if (kSq > checking) {
				const squares = [];
				let i = kSq - 1;
				while (i !== checking) {
					squares.push(i);
					i--;
				}
				return squares;
			} else if (kSq < checking) {
				const squares = [];
				let i = kSq + 1;
				while (i !== checking) {
					squares.push(i);
					i++;
				}
				return squares;
			}
		}

		// 横の利き
		const kingRow = kSq % 9;
		const checkingRow = checking % 9;
		if (kingRow === checkingRow) {
			if (kSq > checking) {
				const squares = [];
				let i = kSq - 9;
				while (i !== checking) {
					squares.push(i);
					i = i - 9;
				}
				return squares;
			} else if (kSq < checking) {
				const squares = [];
				let i = kSq + 9;
				while (i !== checking) {
					squares.push(i);
					i = i + 9;
				}
				return squares;
			}
		}

		if (Math.abs(kSq - checking) % 10 === 0) {
			if (kSq > checking) {
				const squares = [];
				let i = kSq - 10;
				while (i !== checking) {
					squares.push(i);
					i = i - 10;
				}
				return squares;
			} else if (kSq < checking) {
				const squares = [];
				let i = kSq + 10;
				while (i !== checking) {
					squares.push(i);
					i = i + 10;
				}
				return squares;
			}
		}

		if (Math.abs(kSq - checking) % 8 === 0) {
			if (kSq > checking) {
				const squares = [];
				let i = kSq - 8;
				while (i !== checking) {
					squares.push(i);
					i = i - 8;
				}
				return squares;
			} else if (kSq < checking) {
				const squares = [];
				let i = kSq + 8;
				while (i !== checking) {
					squares.push(i);
					i = i + 8;
				}
				return squares;
			}
		}
		return [];
	}

	isCanPutSquare(square: number, owner: number): boolean {
		const capPieces = this.getCapList(owner);
		for (const piece of capPieces) {
			if (this.isPutable(square, owner, piece)) {
				return true;
			}
		}
		return false;
	}

	getCapList(owner: number): number[] {
		const cap = this.cap[owner];
		const pieces = [];
		for (const key in cap) {
			if (cap[key] > 0) {
				pieces.push(parseInt(key));
			}
		}
		return pieces;
	}

	// 王様を動かして王手回避できるか判定
	// ownerは王手をかけている側
	isCanEscape(kSq: number, owner: number): boolean {
		const movable = this.getPieceMovableArea(kSq);
		const kingOwner = this.getReverseOwner(owner);
		let result = false;
		for (const sq of movable) {
			const beforePiece = this.board[sq].koma;
			const beforeOwner = this.board[sq].owner;

			this.board[sq] = {
				koma: OU,
				owner: kingOwner
			};
			this.board[kSq] = {
				koma: NONE,
				owner: PLAYER_NONE
			};
			if (this.getCanMovedList(sq, owner).length === 0) {
				result = true;
			}
			this.board[sq] = {
				koma: beforePiece,
				owner: beforeOwner
			};
			this.board[kSq] = {
				koma: OU,
				owner: kingOwner
			};
		}
		return result;
	}

	isCanMoveSquare(checkingSq: number, kingOwner: number): boolean {
		const kSq = this.getKingSquare(kingOwner);
		const guardians = this.getCanMovedList(checkingSq, kingOwner);
		const owner = this.getReverseOwner(kingOwner);

		if (kSq === false) {
			return false;
		}
		let canGet = false;
		if (guardians.length > 0) {
			for (const guard of guardians) {
				const guardingPiece = this.board[guard].koma;
				const checkingPiece = this.board[checkingSq].koma;
				const beforeOwner = this.board[checkingSq].owner;

				this.board[guard] = {
					koma: NONE,
					owner: PLAYER_NONE
				};
				this.board[checkingSq] = {
					koma: guardingPiece,
					owner: kingOwner
				};

				if (guardingPiece !== OU) {
					if (this.getCanMovedList(kSq, owner).length === 0) {
						canGet = true;
					}
				} else {
					if (this.getCanMovedList(checkingSq, owner).length === 0) {
						canGet = true;
					}
				}

				this.board[guard] = {
					koma: guardingPiece,
					owner: kingOwner
				};
				this.board[checkingSq] = {
					koma: checkingPiece,
					owner: beforeOwner
				};
			}
		}
		return canGet;
	}

	/*
	 * 指定された場所に動ける駒がある升の一覧を取得する
	 * kSq = 指定されているマス
	 * owner側の駒が動けるのかをチェック
	 */
	getCanMovedList(kSq: number, owner: number): number[] {
		const func = getCanMovedList.bind(this);
		return func(kSq, owner);
	}

	// 本将棋的に駒を動かせる場所を取得
	getPieceMovableArea(sq: number): number[] {
		const abilityList = this.getAbilityList(this.board[sq].koma, this.board[sq].owner);
		let movable: number[] = [];
		for (const i in abilityList) {
			movable = movable.concat(this.getMovableArea(abilityList[i], sq));
		}
		return movable;
	}

	// 駒が指定されたアビリティを持っているかチェックする関数
	checkHaving(ability: number, koma: number, owner: number): boolean {
		if (owner === PLAYER_NONE) {
			return false;
		}
		const abilityList = this.getAbilityList(koma, owner);
		if (abilityList.includes(ability)) {
			return true;
		} else {
			return false;
		}
	}
}
