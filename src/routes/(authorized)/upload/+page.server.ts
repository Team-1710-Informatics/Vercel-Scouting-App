import { error } from '@sveltejs/kit'
import { put } from '@vercel/blob'
import { list } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'

export const actions = {
    upload: async ({ locals, request }: any) => {
        const form = await request.formData()

        console.log(form)

        const file = form.get('image-upload') as File

        console.log(file)

        if (!file) {
            error(400, { message: 'No file to upload.' })
        }

        const { url } = await put(locals.user.username, file, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN,
        })

        console.log(url)

        const { blobs } = await list({
            token: BLOB_READ_WRITE_TOKEN,
        })
        console.log(blobs)

        return {
            blobs: blobs,
            url: url,
        }
    },
}
