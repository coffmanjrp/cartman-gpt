'use client';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  onSampleText?: () => void;
}

export default function TextArea({
  value,
  onChange,
  placeholder = 'Enter your polite text here...',
  maxLength = 500,
  onSampleText,
}: TextAreaProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative">
      <textarea
        id="input"
        rows={4}
        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear text"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Bottom bar with character counter and sample text button */}
      <div className="flex justify-between items-center mt-2">
        <button
          type="button"
          onClick={onSampleText}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Try sample text
        </button>

        <span
          className={`text-sm ${
            value.length > maxLength * 0.9
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );
}
