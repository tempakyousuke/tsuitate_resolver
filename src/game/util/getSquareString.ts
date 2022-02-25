export default function (sq: number): string {
	const row = ['１', '２', '３', '４', '５', '６', '７', '８', '９'];
	const line = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
	const rowIndex = Math.floor(sq / 9);
	const lineIndex = sq % 9;
	return row[rowIndex] + line[lineIndex];
}
