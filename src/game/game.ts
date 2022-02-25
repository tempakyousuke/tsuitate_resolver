import { HU, NONE, BLACK, WHITE, PLAYER_NONE } from './constant';
import { GameAbility } from './gameAbility';
import getPieceChar from './util/getPieceChar';
import getUnPromotePiece from './util/getUnPromotePiece';
import getSquareString from './util/getSquareString';
export class Game extends GameAbility {
	get blackBoard(): GAME.Board {
		const board: GAME.Board = {};
		for (const k in this.board) {
			if (this.board[k].owner === WHITE) {
				board[k] = {
					koma: NONE,
					owner: PLAYER_NONE
				};
			} else {
				board[k] = this.board[k];
			}
		}
		return board;
	}

	get whiteBoard(): GAME.Board {
		const board: GAME.Board = {};
		for (const k in this.board) {
			if (this.board[k].owner === BLACK) {
				board[k] = {
					koma: NONE,
					owner: PLAYER_NONE
				};
			} else {
				board[k] = this.board[k];
			}
		}
		return board;
	}

	get blackHistory(): GAME.HiddenHis[] {
		return this.his.map((v) => {
			if (v.turn === WHITE) {
				const his: GAME.HiddenHis = {
					get: v.get,
					checking: v.checking,
					turn: v.turn,
					is_faul: v.is_faul
				};
				if (v.get !== NONE) {
					his.after = v.after;
				}
				return his;
			} else {
				return v;
			}
		});
	}

	get whiteHistory(): GAME.HiddenHis[] {
		return this.his.map((v) => {
			if (v.turn === BLACK) {
				const his: GAME.HiddenHis = {
					get: v.get,
					checking: v.checking,
					turn: v.turn,
					is_faul: v.is_faul
				};
				if (v.get !== NONE) {
					his.after = v.after;
				}
				return his;
			} else {
				return v;
			}
		});
	}

	get faulCount() {
		const arr = this.his.filter((v) => {
			return v.is_faul;
		});
		return arr.length;
	}

	get blackFaulCount() {
		const arr = this.his.filter((v) => {
			return v.turn === BLACK && v.is_faul;
		});
		return arr.length;
	}

	get turnCount(): number {
		return this.his.length - this.faulCount;
	}

	// 手番を変更する
	turnChange(): void {
		this.turn = this.turnReverse;
	}

	// 現在の指し手を取得
	getHistory(): GAME.His | null {
		if (this.turn_number === 0) {
			return null;
		}
		if (this.turn_number - 1 in this.his) {
			return this.his[this.turn_number - 1];
		} else {
			return null;
		}
	}

	// 現在の指し手が反則かを取得 0の場合判定不可能
	isNowFaul(): boolean | 0 {
		if (this.turn_number - 1 in this.his) {
			return this.his[this.turn_number - 1].is_faul;
		} else {
			return 0;
		}
	}

	// 持ち駒に追加
	addToCap(piece: number, owner: number): void {
		if (piece === NONE) {
			return;
		}
		const unprom = getUnPromotePiece(piece);
		this.cap[owner][unprom] += 1;
	}

	// 持ち駒から削除
	remFromCap(koma: number, owner: number): void {
		const unprom = getUnPromotePiece(koma);
		this.cap[owner][unprom] -= 1;
	}

	// 指定した位置に持ち駒を置く
	putFromCap(koma: number, sq: number, consumptionTime = null): boolean {
		this.board[sq] = {
			koma: koma,
			owner: this.turn
		};
		if (koma === HU) {
			if (this.isCheckmate(this.turnReverse)) {
				this.board[sq] = {
					koma: NONE,
					owner: PLAYER_NONE
				};
				const his = {
					koma,
					before: 81,
					after: sq,
					is_promote: false,
					is_faul: true,
					get: NONE,
					checking: false
				};
				this.addHistory(his, consumptionTime);
				return false;
			}
		}

		const checkingMe = this.getCheckingStatus(this.turn);
		if (checkingMe) {
			this.board[sq] = {
				koma: NONE,
				owner: PLAYER_NONE
			};
			const his = {
				koma,
				before: 81,
				after: sq,
				is_promote: false,
				is_faul: true,
				get: NONE,
				checking: false
			};
			this.addHistory(his, consumptionTime);
			return false;
		}

		this.remFromCap(koma, this.turn);
		const checking = this.getCheckingStatus(this.turnReverse);
		const his = {
			koma,
			before: 81,
			after: sq,
			is_promote: false,
			is_faul: false,
			get: NONE,
			checking
		};
		this.addHistory(his, consumptionTime);
		this.turnChange();
		return true;
	}

	// 指定した位置に移動
	// 反則を指した場合trueを返す
	putFromBoard(fromSq: number, sq: number, isPromote: boolean, consumptionTime = null): boolean {
		const { koma } = this.board[fromSq];
		if (this.checkMove(fromSq, sq)) {
			// 反則でない場合
			let afterPiece = koma;
			if (isPromote) {
				afterPiece = this.getPromotePiece(koma);
			}
			// マスの書き換えの前にとった駒を持ち駒に追加
			const get = this.board[sq].koma;

			this.board[sq] = {
				koma: afterPiece,
				owner: this.turn
			};

			this.board[fromSq] = {
				koma: NONE,
				owner: PLAYER_NONE
			};
			this.addToCap(get, this.turn);
			const checking = this.getCheckingStatus(this.turnReverse);
			const his = {
				koma,
				before: fromSq,
				after: sq,
				is_promote: isPromote,
				is_faul: false,
				get,
				checking
			};
			this.addHistory(his, consumptionTime);
			this.turnChange();
			return false;
		} else {
			// 反則の場合
			const his = {
				koma,
				before: fromSq,
				after: sq,
				is_promote: isPromote,
				is_faul: true,
				get: NONE,
				checking: false
			};
			this.addHistory(his, consumptionTime);
			return true;
		}
	}

	// 履歴を登録
	addHistory(his: Omit<GAME.His, 'turn'>, consumptionTime: number | null = null): void {
		// consumptionTimeがnullの時は詰将棋の登録中などとみなす
		if (consumptionTime === null) {
			this.his.splice(this.turn_number);
		}
		const { koma, before, after, is_promote, is_faul, get, checking } = his;
		const history: GAME.His = {
			koma, // afterに置かれた駒（成っていても成る前の状態が書かれる）
			before, // afterの駒がもともとあったマス持ち駒なら81
			after, // 駒が置かれた場所
			is_promote, // 駒が成ったかどうか
			is_faul, // 反則かどうか
			get, // 取得した駒
			checking, // 王手をその手でかけたか
			turn: this.turn // どちらがその手を指したか,
		};
		if (consumptionTime !== null) {
			history.consumptionTime = consumptionTime;
		}
		this.his.push(history);
		this.turn_number++;
		if (is_faul) {
			if (this.turn === BLACK) {
				if (this.blackLife !== undefined) {
					this.blackLife--;
				}
			} else {
				if (this.whiteLife !== undefined) {
					this.whiteLife--;
				}
			}
		}
	}

	get lastHistory() {
		if (this.turn_number === 0) {
			return { before: 81, after: 81, is_faul: false };
		}
		return this.his[this.turn_number - 1];
	}

	// 最終手が反則かを返す
	get isLastHistoryFaul() {
		return this.lastHistory.is_faul;
	}

	get historyTexts(): string[] {
		return this.his.map((history) => this.getHistoryText(history));
	}

	// 棋譜作成
	getHistoryText = (history: GAME.His): string => {
		let historyText = '';
		if (history.turn === BLACK) {
			historyText = '▲';
		} else if (history.turn === WHITE) {
			historyText = '△';
		}
		if (history.turn === BLACK) {
			historyText += getSquareString(history.after) + getPieceChar(history.koma);
			if (history.is_promote) {
				historyText += '成';
			}
		} else if (history.turn === WHITE) {
			if (history.get) {
				historyText += getSquareString(history.after);
			}
			historyText += '？(' + getSquareString(history.after) + getPieceChar(history.koma);
			if (history.is_promote) {
				historyText += '成';
			}
			historyText += ')';
		}

		if (history.is_faul) {
			historyText = historyText + '(反則)';
		}
		if (history.turn === BLACK && history.get) {
			historyText = historyText + '(' + getPieceChar(getUnPromotePiece(history.get)) + '獲得)';
		}
		return historyText;
	};

	historyGo(): void {
		if (!(this.turn_number in this.his)) {
			return;
		}
		const history = this.his[this.turn_number];
		this.turn_number++;
		if (history.consumptionTime) {
			const key = history.turn === BLACK ? 'blackTime' : 'whiteTime';
			this[key] -= history.consumptionTime;
			this[key] += this.fisher;
		}
		if (!history.is_faul) {
			this.turn = this.getReverseOwner(history.turn);
			// 反則でない場合だけ盤面の変更が必要
			if (history.before === 81) {
				// 持ち駒をおいていた場合
				const koma = history.koma;
				this.cap[history.turn][koma]--;
				this.board[history.after] = {
					koma,
					owner: history.turn
				};
			} else {
				let koma;
				// 盤上の駒を動かしていた場合
				if (history.is_promote) {
					koma = this.getPromotePiece(history.koma);
				} else {
					koma = history.koma;
				}
				this.board[history.before] = {
					koma: NONE,
					owner: PLAYER_NONE
				};
				this.board[history.after] = {
					koma: koma,
					owner: history.turn
				};
				if (history.get !== NONE) {
					this.addToCap(getUnPromotePiece(history.get), history.turn);
				}
			}
		} else if (history.turn === BLACK) {
			if (this.blackLife !== undefined) {
				this.blackLife -= 1;
			}
		} else if (this.whiteLife !== undefined) {
			this.whiteLife -= 1;
		}
	}

	historyAllBack(): void {
		while (this.turn_number > 0) {
			this.historyBack();
		}
	}

	historyBack(): void {
		if (this.turn_number === 0) {
			return;
		}
		this.turn_number--;
		const history = this.his[this.turn_number];
		if (history.consumptionTime) {
			const key = history.turn === BLACK ? 'blackTime' : 'whiteTime';
			this[key] += history.consumptionTime;
			this[key] -= this.fisher;
		}
		if (!history.is_faul) {
			this.turn = this.turnReverse;
			// 反則でない場合だけ盤面の変更が必要
			if (history.before === 81) {
				// 持ち駒をおいていた場合
				this.addToCap(history.koma, this.turn);
				this.board[history.after] = {
					koma: NONE,
					owner: PLAYER_NONE
				};
			} else {
				let koma;
				// 盤上の駒を動かしていた場合
				if (history.is_promote) {
					koma = getUnPromotePiece(history.koma);
				} else {
					koma = history.koma;
				}
				this.board[history.before] = {
					koma,
					owner: this.turn
				};
				if (history.get === NONE) {
					this.board[history.after] = {
						koma: NONE,
						owner: PLAYER_NONE
					};
				} else {
					this.board[history.after] = {
						koma: history.get,
						owner: this.turnReverse
					};
					// 取った駒を持ち駒から削除
					this.cap[this.turn][getUnPromotePiece(history.get)] -= 1;
				}
			}
		} else if (history.turn === BLACK) {
			if (this.blackLife !== undefined) {
				this.blackLife += 1;
			}
		} else if (this.whiteLife !== undefined) {
			this.whiteLife += 1;
		}
	}
}
