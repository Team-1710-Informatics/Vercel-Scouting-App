import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import { cleanup } from '@testing-library/svelte'
import fs from 'fs'
import path from 'path'

// Helper function to determine if a path is a page
function isPage(filePath) {
    // Exclude files in component directories
    if (
        filePath.includes('/components/') ||
        filePath.includes('\\components\\') ||
        // Exclude files that start with _ (SvelteKit convention for non-pages)
        path.basename(filePath).startsWith('_') ||
        // Exclude files in lib directory
        filePath.includes('/lib/') ||
        filePath.includes('\\lib\\')
    ) {
        return false
    }

    // Check if it's in a route directory or is a +page.svelte file
    return (
        filePath.includes('+page.svelte') ||
        filePath.includes('+layout.svelte') ||
        filePath.includes('routes')
    )
}

// Helper function to get all Svelte page files
function getSveltePageFiles(dir) {
    const files = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
        const fullPath = path.join(dir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            files.push(...getSveltePageFiles(fullPath))
        } else if (item.endsWith('.svelte') && isPage(fullPath)) {
            files.push(fullPath)
        }
    }

    return files
}

// Helper function to test page rendering
async function testPageRendering(pagePath) {
    try {
        const Page = await import(pagePath)
        const { container } = render(Page.default)
        expect(container).toBeTruthy()
        return true
    } catch (error) {
        console.error(`Error rendering ${pagePath}:`, error)
        return false
    } finally {
        cleanup()
    }
}

describe('Page Rendering Tests', () => {
    const pagesDir = path.resolve('./src/routes')
    const pageFiles = getSveltePageFiles(pagesDir)

    // Log which files will be tested
    console.log('Testing the following pages:')
    pageFiles.forEach((file) =>
        console.log('- ' + path.relative(pagesDir, file))
    )

    pageFiles.forEach((pagePath) => {
        const relativePath = path.relative(pagesDir, pagePath)
        test(`${relativePath} should render without errors`, async () => {
            const rendered = await testPageRendering(pagePath)
            expect(rendered).toBe(true)
        })
    })
})
