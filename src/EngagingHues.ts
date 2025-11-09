type Identifier = Touch['identifier']
/**
* Helper to provide pleasing colors to use for the players.
* They should be as visually distinct as possible, whilst not reusing previous hues.
* An assigned colour should not change. Hues are normalised between [0, 360).
*/
export class EngagingHues {
  #randomSequence: AsyncIterator<number>;
  #assignments: Map<Identifier, number> = new Map();
  #previousAssignments: Set<number> = new Set();

  constructor(randomSequence: AsyncIterator<number>) {
    this.#randomSequence = randomSequence;
  }

  drop(identifier: Identifier) {
    this.#assignments.delete(identifier)
  }

  lookup(identifier: Identifier): number | undefined {
    return this.#assignments.get(identifier)
  }

  get assignments(): Iterator<[Identifier, number]> {
    return this.#assignments.entries()
  }

  /**
  * Add a new player's hue randomly assigned.
  * The assignment is random but the probability is not .
  */
  add(identifier: Identifier): number {

  }
}
