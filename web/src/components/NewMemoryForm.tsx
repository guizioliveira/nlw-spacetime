'use client'

import React, { FormEvent } from 'react'
import { MediaPicker } from './MediaPicker'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-sm text-gray-200 transition-colors hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Attach media
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 transition-colors hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
          Make this memory public
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        id="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Feel free to add photos, videos and stories about that experience you want to remember forever."
      />

      <button
        type="submit"
        className="items-center self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase text-black transition-colors hover:bg-green-700"
      >
        Save
      </button>
    </form>
  )
}
