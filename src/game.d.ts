declare namespace GAME {
	interface Square {
		koma: number;
		owner: number;
	}

	interface Board {
		[key: number]: Square;
	}

	interface Cap {
		[key: number]: number;
	}

	interface BoardCap {
		[key: number]: Cap;
	}

	interface His {
		koma: number;
		before: number;
		after: number;
		is_promote: boolean;
		is_faul: boolean;
		get: number;
		checking: boolean;
		turn: number;
		consumptionTime?: number;
	}

	interface HiddenHis {
		koma?: number;
		before?: number;
		after?: number;
		is_promote?: boolean;
		is_faul: boolean;
		get: number;
		checking: boolean;
		turn: number;
	}

	interface BoardData {
		board: Board;
		black_cap: Cap;
		white_cap: Cap;
		his: His[];
		comment: string[];
		turn: number | undefined;
		whiteLife: number | undefined;
		blackLife: number | undefined;
		blackTime?: number;
		whiteTime?: number;
		fisher?: number;
	}

	interface SelectingCap {
		koma: number;
		owner: number;
	}
}
