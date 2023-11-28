class ChessboardGraph {
    constructor(size = 8) {
        this.size = size;
        this.nodes = new Map();
        this.generateGraph();
    }

    generateGraph() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                let currentPosition = [x, y];
                let legalMoves = this.calculateLegalMoves(x, y);
                this.addNode(currentPosition, legalMoves);
            }
        }
    }

    addNode(position, legalMoves) {
        const key = this.getKey(position);
        this.nodes.set(key, { position, legalMoves });
    }

    getKey(position) {
        return position.join(',');
    }

    calculateLegalMoves(x, y) {
        const knightOptions = [
            [1, 2],
            [1, -2],
            [2, 1],
            [2, -1],
            [-1, 2],
            [-1, -2],
            [-2, 1],
            [-2, -1],
        ];

        let legalMoves = [];

        for (let option of knightOptions) {
            let newX = x + option[0];
            let newY = y + option[1];

            if (
                newX >= 0 &&
                newX < this.size &&
                newY >= 0 &&
                newY < this.size
            ) {
                legalMoves.push([newX, newY]);
            }
        }

        return legalMoves;
    }

    getNode(position) {
        let key = this.getKey(position);
        return this.nodes.get(key);
    }
}

function knightMoves(start, end) {
    const chessBoard = new ChessboardGraph();
    let queue = [];
    queue.unshift([start, []]);
    let visited = new Set();

    for (let h of [start, end]) {
        if (
            h[0] < 0 ||
            h[0] >= chessBoard.size ||
            h[1] < 0 ||
            h[1] >= chessBoard.size
        ) {
            return -1;
        }
    }

    while (queue.length) {
        let [currentPosition, path] = queue.shift();
        let [currentX, currentY] = currentPosition;
        let key = chessBoard.getKey(currentPosition);

        if (visited.has(key)) continue;

        if (currentX === end[0] && currentY === end[1])
            return `You made it in ${path.length} moves! Here is your path:
        ${path.join(' -> ')} -> (${currentX},${currentY})`;

        let legalMoves = chessBoard.getNode(currentPosition).legalMoves;

        for (move of legalMoves) {
            queue.push([move, [...path, `(${currentX},${currentY})`]]);
        }
    }

    return -1;
}

console.log(knightMoves([3, 5], [3, 6]));
