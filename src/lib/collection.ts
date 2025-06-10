/**
 * Represents a point in 2D space with x and y coordinates
 */
class Point {
  constructor(public x: number, public y: number) {}

  /**
   * Returns a string representation of the point
   * @returns String in the format "Point(x, y)"
   */
  public toString(): string {
    return `Point(${this.x}, ${this.y})`;
  }

  /**
   * Calculates the distance to another point
   * @param other - The other point to calculate distance to
   * @returns The Euclidean distance between this point and the other point
   */
  public distanceTo(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Creates a new point that is the sum of this point and another point
   * @param other - The point to add to this point
   * @returns A new Point instance
   */
  public add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  /**
   * Creates a new point that is this point minus another point
   * @param other - The point to subtract from this point
   * @returns A new Point instance
   */
  public subtract(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y);
  }

  /**
   * Scales this point by a given factor
   * @param factor - The scaling factor
   * @returns A new Point instance
   */
  public scale(factor: number): Point {
    return new Point(this.x * factor, this.y * factor);
  }
}
