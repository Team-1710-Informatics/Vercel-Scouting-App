// test/stdDev.test.ts

import {describe, it, expect} from 'vitest'
import {stdDev} from '../src/routes/(public)/data/[event]/statistics'

describe('stdDev', () => {
    it('should calculate the correct standard deviation for the array [1, 2, 3, 4, 5]', () => {
        const input = [1, 2, 3, 4, 5]
        const expectedStdDev = Math.sqrt(2)  // The correct standard deviation value

        const result = stdDev(input)

        expect(result).toBeCloseTo(expectedStdDev, 5) // Use `toBeCloseTo` for floating point comparison
    })

    it('should return 0 for an array with all identical values', () => {
        const input = [5, 5, 5, 5, 5]
        const expectedStdDev = 0

        const result = stdDev(input)

        expect(result).toBe(expectedStdDev)
    })

    it('should handle an empty array by returning NaN', () => {
        const input: number[] = []

        const result = stdDev(input)

        expect(result).toBeNaN()
    })

    it('should calculate standard deviation for a more complex array', () => {
        const input = [1, 3, 6, 8, 10]
        const mean = input.reduce((acc, curr) => acc + curr, 0) / input.length
        const variance = input.reduce((acc, curr) => acc + (curr - mean) ** 2, 0) / input.length
        const expectedStdDev = Math.sqrt(variance)

        const result = stdDev(input)

        expect(result).toBeCloseTo(expectedStdDev, 5)
    })
})
