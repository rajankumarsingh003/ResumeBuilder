

import { Loader2Icon, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, onAISuccess }) => {
  const { token } = useSelector((state) => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      if (!data || data.trim() === '') {
        return toast.error('Professional summary is empty')
      }

      setIsGenerating(true)

      const prompt = `Enhance my professional summary:\n"${data}"`

      const response = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const enhancedText = response.data.enhancedContent


      onChange(enhancedText)


      if (typeof onAISuccess === 'function') {
        onAISuccess(enhancedText)
      }

      toast.success('Summary enhanced')
    } catch (error) {
      console.error('AI summary error:', error)
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Professional Summary</h3>
          <p className="text-sm text-gray-500">
            Add summary for resume here
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded"
        >
          {isGenerating ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Sparkle className="size-4" />
          )}
          {isGenerating ? 'Enhancing...' : 'AI Enhance'}
        </button>
      </div>

      <textarea
        value={data || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        className="w-full p-3 border rounded"
        placeholder="Write a professional summary..."
      />
    </div>
  )
}

export default ProfessionalSummaryForm
