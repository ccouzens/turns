import { wrappingDifference } from "./EngagingHues/wrappingDifference";

function hueLikelihoodScore(
	currentDistances: IteratorObject<number>,
	formerDistances: IteratorObject<number>,
): number {
	return (
		currentDistances.reduce((sum, distance) => sum + 20 / (distance + 0.1), 0) +
		formerDistances
			.map((i) => i)
			.reduce((sum, distance) => sum + 1 / (distance + 0.1), 0)
	);
}
const candidates = 360;
const previousHuesSize = 10;

/**
Take a sequence of numbers. Find the minimum amongst them, and randomly pick one of their indexes.

@param arr a array of numbers with a length of at least 1
@param random a random number between 0 (inclusive) and 1 (exclusive)
*/
function pickRandomMinimum(arr: number[], random: number): number {
	let count = 0;
	let min = arr[0];
	for (const n of arr) {
		if (n === min) {
			count += 1;
		} else if (n < min) {
			min = n;
			count = 1;
		}
	}

	let minIndex = Math.floor(random * count);
	for (const [i, n] of arr.entries()) {
		if (n === min) {
			if (minIndex === 0) {
				return i;
			} else {
				minIndex--;
			}
		}
	}

	throw new Error("Did not return an index");
}

type Identifier = Touch["identifier"];
/**
 * Helper to provide pleasing colors to use for the players.
 * They should be as visually distinct as possible, whilst not reusing previous hues.
 * An assigned colour should not change. Hues are normalised between [0, 360).
 */
export class EngagingHues {
	#randomSequence: Iterator<number>;
	#assignments: Map<Identifier, number> = new Map();
	#previousHues: number[] = [];

	constructor(randomSequence: Iterator<number>) {
		this.#randomSequence = randomSequence;
	}

	remove(identifier: Identifier) {
		const hue = this.#assignments.get(identifier);
		if (hue !== undefined) {
			this.#assignments.delete(identifier);
			this.#previousHues.push(hue);
			while (this.#previousHues.length > previousHuesSize) {
				this.#previousHues.shift();
			}
		}
	}

	lookup(identifier: Identifier): number | undefined {
		return this.#assignments.get(identifier);
	}

	get assignments(): Iterable<[Identifier, number]> &
		Iterator<[Identifier, number]> {
		return this.#assignments.entries();
	}

	/**
	 * Add a new player's hue.
	 * The assignment is randomly selected out of the set of candidates.
	 */
	add(identifier: Identifier): number {
		const candidateHues: number[] = new Array(candidates);
		for (let i = 0; i < candidates; i++) {
			const currentDistances = this.#assignments
				.values()
				.map((a) => wrappingDifference(i, a));
			const formerDistances = this.#previousHues[Symbol.iterator]().map((a) =>
				wrappingDifference(i, a),
			);
			candidateHues[i] = hueLikelihoodScore(currentDistances, formerDistances);
		}

		const hue = pickRandomMinimum(
			candidateHues,
			this.#randomSequence.next().value,
		);
		this.#assignments.set(identifier, hue);
		return hue;
	}
}
