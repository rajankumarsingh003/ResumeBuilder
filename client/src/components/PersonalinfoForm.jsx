


import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalinfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

  const handlechange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fields = [
    { key: 'full_name', label: 'full name', icon: User, type: 'text', required: true },
    { key: 'email', label: 'email address', icon: Mail, type: 'email', required: true },
    { key: 'phone', label: 'phone number', icon: Phone, type: 'tel' },
    { key: 'location', label: 'location', icon: MapPin, type: 'text' },
    { key: 'profession', label: 'profession', icon: BriefcaseBusiness, type: 'text' },
    { key: 'linkedin', label: 'Linkedin profile', icon: Linkedin, type: 'url' },
    { key: 'website', label: 'Personal website', icon: Globe, type: 'url' },
  ]

  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Info</h3>
      <p className='text-sm text-gray-600'>Get statted with personal information</p>

      <div className='flex items-center gap-2 '>
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === 'string'
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt='user-image'
              className='w-16 h-16 rounded-full object-cover mt-5 ring rng-slate-300 hover:opacity-80'
            />
          ) : (
            <div className='inline-flexitems-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
              <User className='size-10 p-2.5 border rounded-full' />
              Upload user image
            </div>
          )}
          <input
            type='file'
            accept='image/jpeg, image/png'
            className='hidden'
            onChange={(e) => handlechange('image', e.target.files[0])}
          />
        </label>

    
      {typeof data.image === "object" && (
  <div className="flex flex-col gap-2 px-4 text-sm">
    <p className="text-slate-700 font-medium">Remove Background</p>

    <label className="relative inline-flex items-center cursor-pointer gap-3">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={() => setRemoveBackground(prev => !prev)}
        checked={removeBackground}
      />

      {/* Toggle track */}
      <div
        className="
          w-10 h-5
          bg-slate-300
          rounded-full
          peer-checked:bg-green-600
          transition-colors
          duration-300
          relative
        "
      >
        {/* Toggle dot */}
        <span
          className="
            absolute top-[2px] left-[2px]
            w-4 h-4
            bg-white
            rounded-full
            shadow
            transition-transform
            duration-300
            peer-checked:translate-x-5
          "
        />
      </div>

      {/* Status text */}
      <span
        className="
          text-xs
          font-medium
          text-slate-500
          peer-checked:text-green-600
          transition-colors
        "
      >
        {removeBackground ? "Enabled" : "Disabled"}
      </span>
    </label>
  </div>
)}








      </div>

      {fields.map((field) => {
        const Icon = field.icon
        return (
          <div key={field.key} className='space-y-1 mt-5'>
            <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
              <Icon className='size-4' />
              {field.label}
              {field.required && <span className='text-red-500'>*</span>}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ''}
              onChange={(e) => handlechange(field.key, e.target.value)}
              className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm'
              placeholder={`enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PersonalinfoForm
