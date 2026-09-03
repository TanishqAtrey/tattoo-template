import React, { useState, useRef } from 'react';
import { BookingWizardState } from '../../types';
import { ImagePlus, Trash2, ArrowLeft, ArrowRight, Sparkles, UploadCloud, Link2 } from 'lucide-react';

interface StepReferenceProps {
  formData: BookingWizardState;
  onChange: (updates: Partial<BookingWizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepReference: React.FC<StepReferenceProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Convert to local object URL for preview
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange({
            referenceImages: [...formData.referenceImages, reader.result],
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    onChange({
      referenceImages: [...formData.referenceImages, urlInput.trim()],
    });
    setUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    const updated = formData.referenceImages.filter((_, idx) => idx !== index);
    onChange({ referenceImages: updated });
  };

  const sampleInspiration = [
    { label: 'Botanical Floral', url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=400&q=80' },
    { label: 'Japanese Dragon', url: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=400&q=80' },
    { label: 'Geometric Mandala', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-serif-heading font-bold text-xl text-slate-950 mb-1">
          Concept Description & References
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm font-normal">
          Describe the elements, theme, and meaning of your piece. Reference images help your artist understand the vibe.
        </p>
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
          Describe Your Tattoo Idea <span className="text-amber-700">*</span>
        </label>
        <textarea
          rows={4}
          value={formData.customDescription}
          onChange={(e) => onChange({ customDescription: e.target.value })}
          placeholder="Describe key subjects, mood, symbols, meaning, or existing tattoos nearby that this needs to flow with..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors resize-none"
        />
      </div>

      {/* Reference Image Upload Area */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
          Upload Reference Photos & Sketches (Optional)
        </label>

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <UploadCloud className="w-8 h-8 text-amber-700 mx-auto mb-2" />
          <div className="text-sm font-bold text-slate-950">
            Click to upload photos or sketches
          </div>
          <div className="text-xs text-slate-500 mt-1">
            PNG, JPG, HEIC up to 10MB per image
          </div>
        </div>

        {/* Quick URL Input */}
        <div className="flex gap-2 mt-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Or paste an image web link (Pinterest / Instagram / Unsplash)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-250 flex items-center gap-1.5 shadow-sm"
          >
            <Link2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Add</span>
          </button>
        </div>

        {/* Sample Reference Clickers */}
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
          <span className="text-[11px] font-medium">Quick samples:</span>
          {sampleInspiration.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() =>
                onChange({
                  referenceImages: [...formData.referenceImages, sample.url],
                })
              }
              className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-amber-800 hover:border-amber-500 transition-colors font-medium"
            >
              + {sample.label}
            </button>
          ))}
        </div>

        {/* Image Previews */}
        {formData.referenceImages.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
            {formData.referenceImages.map((img, idx) => (
              <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <img src={img} alt="Reference" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 hover:text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="pt-4 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="glow-btn px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5"
        >
          <span>Choose Artist & Date</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
