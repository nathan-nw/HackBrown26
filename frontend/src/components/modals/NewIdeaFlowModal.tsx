import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Bolt, Settings as DesignServices, Code, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { ModalBase } from '../ui/ModalBase';
import { useAuth } from '../../context/AuthContext';
import '../../styles/newIdeaFlow.css';

interface NewIdeaFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  description: string;
  wedge: string;
  differentiation: string | null;
  category: string | null;
  stage: string | null;
}

const INITIAL_DATA: FormData = {
  name: '',
  description: '',
  wedge: '',
  differentiation: null,
  category: null,
  stage: null,
};

export const NewIdeaFlowModal = ({ isOpen, onClose }: NewIdeaFlowModalProps) => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setData(INITIAL_DATA);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (step === 1 && data.name && data.description) setStep(2);
    else if (step === 2 && data.differentiation) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleSubmit = async () => {
    if (!data.category || !session?.access_token) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.name,
          description: data.description,
          // We can expand the backend to accept more fields if needed
          // For now, sending the core fields
        }),
      });

      if (response.ok) {
        const newProject = await response.json();
        onClose();
        navigate(`/planning/${newProject.id}`);
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Pattern Match Panel (Right Side)
  const renderPatternMatch = () => {
    if (step === 1) return null;

    const content = step === 2 ? {
      icon: 'psychology', 
      letter: 'S',
      title: 'The Narrow Wedge',
      quote: <>Companies like <span style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>Stripe</span> started by solving for individual developers, not the entire financial system. They nailed 7 lines of code before expanding.</>,
      subtext: 'A sharp wedge cuts through market noise. A broad approach bounces off the surface.'
    } : {
      icon: 'category',
      letter: 'P',
      title: 'Category Definition',
      quote: <>Defining your category correctly sets the competitive frame. <span style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>AirBnB</span> wasn't just "lodging", it was a "Trust Platform".</>,
      subtext: 'Positioning is not what you do to a product. Positioning is what you do to the mind of the prospect.'
    };

    return (
      <div className="nif-sidebar">
        <div className="nif-sidebar-blur"></div>
        <div className="nif-sidebar-content">
          <div className="nif-sidebar-header">
             <Lightbulb size={18} />
             <span className="nif-sidebar-label">Pattern Match</span>
          </div>
          <div>
            <div className="nif-sidebar-card">
              <div className="nif-sidebar-icon">
                <span>{content.letter}</span>
              </div>
              <h4 className="nif-sidebar-title">{content.title}</h4>
              <p className="nif-sidebar-text">
                {content.quote}
              </p>
            </div>
            <div className="nif-sidebar-footer">
              <p className="nif-sidebar-label" style={{ marginBottom: '0.5rem' }}>Why this matters</p>
              <p className="nif-sidebar-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-headline)' }}>
                {content.subtext}
              </p>
            </div>
          </div>
        </div>
         <div className="nif-sidebar-graphic">
            <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="#0B1D15" strokeWidth="1"></circle>
                <circle cx="20" cy="20" r="12" stroke="#0B1D15" strokeWidth="1"></circle>
                <circle cx="20" cy="20" fill="#0B1D15" r="5"></circle>
            </svg>
        </div>
      </div>
    );
  };

  const isStepValid = () => {
    if (step === 1) return data.name.length > 0 && data.description.length > 0;
    if (step === 2) return !!data.differentiation;
    if (step === 3) return !!data.category;
    return false;
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} className="nif-modal-container">
       <button onClick={onClose} className="nif-close-btn">
          <X size={24} />
      </button>

      {/* Main Content */}
      <div className="nif-main-panel">
        
        {/* Progress Stepper */}
        <div className="nif-stepper">
            {[1, 2, 3].map((s) => (
                <div key={s} className="nif-step">
                    <div className={`nif-step-circle ${
                          step === s ? 'active' : 
                          step > s ? 'completed' : 
                          'inactive'
                    }`}>
                        {s}
                    </div>
                    {s < 3 && <div className="nif-step-line"></div>}
                </div>
            ))}
        </div>

        {/* Step 1: Identity */}
        {step === 1 && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="nif-header-section">
              <h1 className="nif-title">Define the Identity</h1>
              <p className="nif-subtitle">Give your hypothesis a name and a clear purpose.</p>
            </div>
            
            <div className="nif-form-stack">
              <div className="nif-form-group">
                 <label htmlFor="startup-name" className="nif-label">Startup Name</label>
                 <input 
                    id="startup-name"
                    type="text" 
                    className="nif-input"
                    placeholder="e.g. Arcane"
                    value={data.name}
                    onChange={e => setData({...data, name: e.target.value})}
                    autoFocus
                 />
              </div>

              <div className="nif-form-group">
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label htmlFor="elevator-pitch" className="nif-label">Elevator Pitch</label>
                    <span className="nif-helper-text">{data.description.length}/280 chars</span>
                 </div>
                 <textarea 
                    id="elevator-pitch"
                    rows={3}
                    maxLength={280}
                    className="nif-textarea"
                    placeholder="Describe the core value proposition in one sentence..."
                    value={data.description}
                    onChange={e => setData({...data, description: e.target.value})}
                 />
              </div>

               <div className="nif-prompt-box">
                    <Lightbulb style={{ color: 'var(--color-forest-light)', marginTop: '2px', flexShrink: 0 }} size={20} />
                    <div>
                        <h4 style={{ color: 'var(--color-forest-deep)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Sequoia Thinking</h4>
                        <p style={{ color: 'rgba(5, 22, 16, 0.8)', fontSize: '0.875rem', fontStyle: 'italic', fontFamily: 'var(--font-headline)' }}>"Think in terms of the first user, not the final market. Who desperately needs this right now?"</p>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Step 2: Wedge & Edge */}
        {step === 2 && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
             <div className="nif-header-section">
                <h1 className="nif-title">Define Your Edge</h1>
                <p className="nif-subtitle">How will you enter the market, and why will you win?</p>
             </div>

             <div className="nif-form-stack">
                <div className="nif-form-group">
                    <label htmlFor="wedge" className="nif-label-lg">What is your niche wedge?</label>
                    <p className="nif-helper-text" style={{ marginBottom: '1rem' }}>Identify a specific, underserved subset of users to start with.</p>
                    <textarea 
                        id="wedge"
                        className="nif-textarea-card"
                        style={{ height: '6rem' }}
                        placeholder="e.g. Small independent bookstores, not all retailers..."
                        value={data.wedge}
                        onChange={e => setData({...data, wedge: e.target.value})}
                    />
                </div>

                <div className="nif-form-group">
                    <label className="nif-label-lg" style={{ marginBottom: '1rem' }}>What is your true differentiation?</label>
                    <div className="nif-chip-grid">
                        {[
                            { id: 'insight', label: 'Proprietary Insight', icon: <Lightbulb size={20} /> },
                            { id: 'speed', label: 'Execution Speed', icon: <Bolt size={20} /> },
                            { id: 'ux', label: 'Superior UX', icon: <DesignServices size={20} /> },
                            { id: 'tech', label: 'Tech Moat', icon: <Code size={20} /> },
                        ].map((opt) => (
                             <div key={opt.id} className="nif-chip-wrapper">
                                <input 
                                    type="radio" 
                                    id={opt.id} 
                                    name="differentiation" 
                                    value={opt.id} 
                                    checked={data.differentiation === opt.id}
                                    onChange={() => setData({...data, differentiation: opt.id as any})}
                                    className="nif-chip-radio"
                                />
                                <label htmlFor={opt.id} className="nif-chip-label">
                                    {opt.icon}
                                    <span>{opt.label}</span>
                                </label>
                             </div>
                        ))}
                    </div>
                </div>
             </div>
          </div>
        )}

         {/* Step 3: Category */}
        {step === 3 && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="nif-header-section">
                    <h1 className="nif-title">Position the Company</h1>
                    <p className="nif-subtitle">Categorize the market and current stage.</p>
                </div>

                <div className="nif-form-stack">
                    <div className="nif-form-group">
                        <label className="nif-label-lg" style={{ marginBottom: '1rem' }}>Which category best describes this startup?</label>
                         <div className="nif-chip-grid">
                            {['Consumer', 'Enterprise', 'DevTools', 'FinTech', 'Healthcare', 'Climate', 'Defense'].map((cat) => (
                                <div key={cat} className="nif-chip-wrapper">
                                    <input 
                                        type="radio" 
                                        id={cat} 
                                        name="category" 
                                        value={cat.toLowerCase()} 
                                        checked={data.category === cat.toLowerCase()}
                                        onChange={() => setData({...data, category: cat.toLowerCase() as any})}
                                        className="nif-chip-radio"
                                    />
                                    <label htmlFor={cat} className="nif-chip-label">
                                        {cat}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                     <div className="nif-form-group">
                        <label className="nif-label-lg" style={{ marginBottom: '1rem' }}>Stage (Optional)</label>
                         <div className="nif-chip-grid">
                            {['Pre-seed', 'Seed', 'Series A'].map((stg) => (
                                <div key={stg} className="nif-chip-wrapper">
                                    <input 
                                        type="radio" 
                                        id={stg} 
                                        name="stage" 
                                        value={stg.toLowerCase().replace(' ', '-')} 
                                        checked={data.stage === stg.toLowerCase().replace(' ', '-')}
                                        onChange={() => setData({...data, stage: stg.toLowerCase().replace(' ', '-') as any})}
                                        className="nif-chip-radio"
                                    />
                                    <label htmlFor={stg} className="nif-chip-label">
                                        {stg}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Footer Actions */}
        <div className="nif-footer">
            {step === 1 ? (
                 <button onClick={onClose} className="nif-btn-cancel">Cancel</button>
            ) : (
                <button onClick={handleBack} className="nif-btn-back">
                    <ArrowLeft size={18} />
                    Back
                </button>
            )}

            {step < 3 ? (
                <button 
                    onClick={handleNext} 
                    disabled={!isStepValid()}
                    className="nif-btn-primary"
                >
                    <span>Next: {step === 1 ? 'Define Your Wedge' : 'Position'}</span>
                    <ArrowRight size={18} />
                </button>
            ) : (
                <button 
                    onClick={handleSubmit} 
                    disabled={!isStepValid() || isSubmitting}
                    className="nif-btn-primary"
                >
                    Generate Initial Canvas
                    <ArrowRight size={18} />
                </button>
            )}
        </div>
      </div>

      {/* Right Sidebar (Steps 2 & 3 only) */}
      {renderPatternMatch()}

    </ModalBase>
  );
};
