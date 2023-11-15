import React from 'react'

const Input = ({ label, error, ...props }) => {
  return (
    <div className='flex flex-col gap-x-0.5 relative' role="group">
        <label className="text-gray-400 text-sm">{label}</label>
        <input 
            {...props}
            className="border border-zinc-800 text-zinc-400 text-[.95rem] px-3 py-2 h-10 bg-transparent outline-none rounded-sm w-full placeholder:text-[.92rem] hover:border-teal-200 transition-all duration-200 focus:ring-1 focus:ring-teal-600"
        />
        {error && <span className='text-sm text-rose-700'>{error}</span>}
    </div>
  )
}

export { Input };

const Textarea = ({ label, error, ...props }) => {
    return (
        <div className='flex flex-col gap-x-0.5 relative' role="group">
            <label className="text-gray-400 text-sm">{label}</label>
            <textarea 
                {...props}
                className="border border-zinc-800 text-zinc-400 text-[.95rem] px-3 py-2 h-24 bg-transparent rounded-sm w-full placeholder:text-[.92rem] hover:border-teal-200 transition-all duration-200 focus:ring-1 focus:ring-teal-600 focus-visible:outline-none"
            />
            {error && <span className='text-sm text-rose-700'>{error}</span>}
        </div>
      )   
}

export { Textarea };