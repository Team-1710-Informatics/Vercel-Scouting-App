import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { readable } from 'svelte/store'

// Ensure TextEncoder is available
if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util')
    global.TextEncoder = TextEncoder
    global.TextDecoder = TextDecoder
}

// Mock SvelteKit's navigation and page stores
vi.mock('$app/stores', () => ({
    navigating: readable(null),
    page: readable({ url: new URL('http://localhost'), params: {} }),
}))
