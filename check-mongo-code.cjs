const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'src/hooks.server.ts')

// Define the block of code to check
const codeBlock = `try {
    if (dev) await mongoose.connect(MONGODB_COMMUNITY)
    else if (!dev) await mongoose.connect(MONGODB_MAIN)
    console.log('Connected to MongoDB')
} catch (error) {
    console.log('Error connecting to MongoDB:', error)
}`

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err)
        process.exit(1)
    }

    // Check if the code block is present in the file
    if (data.includes(codeBlock)) {
        console.log(
            'The MongoDB connection code is present in the hooks.server.ts file.'
        )
        process.exit(0) // success
    } else {
        console.log('The MongoDB connection code has been modified or removed!')
        process.exit(1) // failure
    }
})
