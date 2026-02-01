import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { ModalBase } from '../ui/ModalBase';
import '../../styles/newIdeaFlow.css';

interface NodeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
  onSave: (nodeId: string, newData: any) => void;
}

export const NodeEditModal = ({ isOpen, onClose, node, onSave }: NodeEditModalProps) => {
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (node && node.data) {
        // Initialize form data with existing node data
        setFormData({ ...node.data });
    }
  }, [node, isOpen]);

  if (!isOpen || !node) return null;

  const handleChange = (field: string, value: any) => {
      setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderFields = () => {
    const type = node.data.type || 'DEFAULT';

     const isSystemNode = type !== 'DEFAULT' && type !== 'PaperNode' && type !== undefined;

     // Common field: Label (Title) - Only show for custom nodes
    const commonFields = !isSystemNode ? (
        <div className="nif-form-group">
            <label className="nif-label">Label / Title</label>
            <input 
                type="text" 
                className="nif-input"
                value={formData.label || formData.title || ''}
                onChange={(e) => handleChange('label', e.target.value)} // Update label primarily
            />
        </div>
    ) : null;

    switch (type) {
        case 'PRICING':
            return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Pricing Model</label>
                        <select 
                            className="nif-input"
                            value={formData.pricingModel || ''}
                            onChange={(e) => handleChange('pricingModel', e.target.value)}
                        >
                            <option value="">Select a model...</option>
                            <option value="subscription">Subscription (SaaS)</option>
                            <option value="freemium">Freemium</option>
                            <option value="one-time">One-time Purchase</option>
                            <option value="usage">Usage-based</option>
                            <option value="checklist">Enterprise Contract</option>
                        </select>
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">Price Point</label>
                        <input 
                            type="text" 
                            className="nif-input" 
                            placeholder="e.g. $10/month or $500 flat"
                            value={formData.price || ''}
                            onChange={(e) => handleChange('price', e.target.value)}
                        />
                    </div>
                    
                    {(formData.pricingModel === 'subscription' || formData.pricingModel === 'freemium') && (
                        <div className="nif-form-group">
                            <label className="nif-label">Billing Frequency</label>
                            <div className="nif-chip-grid">
                                {['Monthly', 'Yearly', 'One-off'].map((opt) => (
                                    <button
                                        key={opt}
                                        className={`nif-chip-wrapper ${formData.billingFrequency === opt ? 'active' : ''}`}
                                        onClick={() => handleChange('billingFrequency', opt)}
                                        style={{ 
                                            padding: '8px 16px', 
                                            border: formData.billingFrequency === opt ? '1px solid var(--primary)' : '1px solid #2C4A3A',
                                            background: formData.billingFrequency === opt ? 'rgba(19, 236, 91, 0.1)' : 'transparent',
                                            color: formData.billingFrequency === opt ? 'var(--primary)' : 'var(--color-forest-deep)',
                                            borderRadius: '20px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            );
        
        case 'MARKET':
             return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Target Customer</label>
                        <input 
                            type="text" 
                            className="nif-input" 
                            placeholder="e.g. Small Business Owners"
                            value={formData.targetCustomer || ''}
                            onChange={(e) => handleChange('targetCustomer', e.target.value)}
                        />
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">Beachhead Market</label>
                        <textarea 
                            className="nif-textarea" 
                            placeholder="Describe your initial entry market..."
                            value={formData.beachhead || ''}
                            onChange={(e) => handleChange('beachhead', e.target.value)}
                        />
                    </div>
                </>
             );

        case 'DISTRIBUTION':
            return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Primary Channel</label>
                        <input 
                            type="text" 
                            className="nif-input" 
                            placeholder="e.g. Direct Sales, SEO, App Store"
                            value={formData.channel || ''}
                            onChange={(e) => handleChange('channel', e.target.value)}
                        />
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">Est. CAC</label>
                        <input 
                            type="text" 
                            className="nif-input" 
                            placeholder="e.g. $50"
                            value={formData.cac || ''}
                            onChange={(e) => handleChange('cac', e.target.value)}
                        />
                    </div>
                </>
            );

        case 'PROBLEM':
            return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Core Pain Points</label>
                        <textarea 
                            className="nif-textarea" 
                            rows={4}
                            placeholder="List the key problems..."
                            value={formData.painPoints || ''}
                            onChange={(e) => handleChange('painPoints', e.target.value)}
                        />
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">Urgency Level</label>
                        <select 
                            className="nif-input"
                            value={formData.urgency || ''}
                            onChange={(e) => handleChange('urgency', e.target.value)}
                        >
                            <option value="">Select urgency...</option>
                            <option value="High (Hair on fire)">High (Hair on fire)</option>
                            <option value="Medium (Important)">Medium (Important)</option>
                            <option value="Low (Nice to have)">Low (Nice to have)</option>
                        </select>
                    </div>
                </>
            );

        case 'SEGMENT':
            return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                         <label className="nif-label">Persona Name</label>
                         <input 
                            type="text" 
                            className="nif-input"
                            placeholder="e.g. Marketing Mary"
                            value={formData.personaName || ''}
                            onChange={(e) => handleChange('personaName', e.target.value)}
                         />
                    </div>
                    <div className="nif-form-group">
                         <label className="nif-label">Key Demographics/Traits</label>
                         <textarea 
                            className="nif-textarea"
                            rows={3}
                            value={formData.demographics || ''}
                            onChange={(e) => handleChange('demographics', e.target.value)}
                         />
                    </div>
                </>
            );

        case 'SOLUTION':
            return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Core Feature</label>
                        <input 
                           type="text" 
                           className="nif-input"
                           value={formData.coreFeature || ''}
                           onChange={(e) => handleChange('coreFeature', e.target.value)}
                        />
                   </div>
                   <div className="nif-form-group">
                        <label className="nif-label">Tech Stack</label>
                        <input 
                           type="text" 
                           className="nif-input"
                           placeholder="e.g. React, Python, AWS"
                           value={formData.techStack || ''}
                           onChange={(e) => handleChange('techStack', e.target.value)}
                        />
                   </div>
                </>
            );

        case 'SIZING':
             return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">TAM (Total Addressable Market)</label>
                        <input className="nif-input" value={formData.tam || ''} onChange={e => handleChange('tam', e.target.value)} placeholder="$10B" />
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">SAM (Serviceable Addressable Market)</label>
                        <input className="nif-input" value={formData.sam || ''} onChange={e => handleChange('sam', e.target.value)} placeholder="$1B" />
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">SOM (Serviceable Obtainable Market)</label>
                        <input className="nif-input" value={formData.som || ''} onChange={e => handleChange('som', e.target.value)} placeholder="$100M" />
                    </div>
                </>
             );
        
        case 'EQUITY':
             return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Founders Split</label>
                        <input className="nif-input" value={formData.foundersSplit || ''} onChange={e => handleChange('foundersSplit', e.target.value)} placeholder="e.g. 50/50" />
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">Employee Pool</label>
                        <input className="nif-input" value={formData.employeePool || ''} onChange={e => handleChange('employeePool', e.target.value)} placeholder="e.g. 10%" />
                    </div>
                </>
             );

        case 'LAUNCH':
             return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Launch Strategy</label>
                         <textarea className="nif-textarea" value={formData.launchStrategy || ''} onChange={e => handleChange('launchStrategy', e.target.value)} placeholder="Soft launch vs Big bang..." />
                    </div>
                     <div className="nif-form-group">
                        <label className="nif-label">Launch Date Target</label>
                        <input type="date" className="nif-input" value={formData.launchDate || ''} onChange={e => handleChange('launchDate', e.target.value)} />
                    </div>
                </>
             );

        case 'FRICTION':
            return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Entry Model</label>
                         <select className="nif-input" value={formData.entryModel || ''} onChange={e => handleChange('entryModel', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="pay-to-play">Pay-to-play (Upfront)</option>
                            <option value="free-entry">Free Entry (Low friction)</option>
                         </select>
                    </div>
                </>
            );

        case 'PIT_STOP':
             return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Strategic Focus</label>
                        <select className="nif-input" value={formData.pitStopFocus || ''} onChange={e => handleChange('pitStopFocus', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="research">Pure Research (Stealth)</option>
                            <option value="interim-revenue">Interim Revenue (Consulting/Service)</option>
                         </select>
                    </div>
                </>
             );

        case 'EVOLUTION':
             return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Core Business Impact</label>
                        <select className="nif-input" value={formData.evolutionStrategy || ''} onChange={e => handleChange('evolutionStrategy', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="cannibalize">Cannibalize Core</option>
                            <option value="protect">Protect Core</option>
                         </select>
                    </div>
                </>
             );

        case 'NARRATIVE':
             return (
                 <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Positioning Narrative</label>
                        <select className="nif-input" value={formData.narrativeType || ''} onChange={e => handleChange('narrativeType', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="better">Better Features (Comparison)</option>
                            <option value="new-category">New Category (Different)</option>
                         </select>
                    </div>
                    <div className="nif-form-group">
                        <label className="nif-label">Tagline / Hook</label>
                        <input className="nif-input" value={formData.tagline || ''} onChange={e => handleChange('tagline', e.target.value)} placeholder="One liner..." />
                    </div>
                 </>
             );

        default:
            return (
                <>
                    {commonFields}
                    <div className="nif-form-group">
                        <label className="nif-label">Description / Notes</label>
                        <textarea 
                            className="nif-textarea"
                            rows={4}
                            value={formData.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                    </div>
                </>
            );
    }
  };



  // Validation Logic
  const checkValidity = () => {
      // If validation is needed (e.g. strict mode), check fields
      // For now, checks if at least one key field is filled for the type
      const type = node.data.type;
      
      switch (type) {
          case 'PRICING': return !!formData.pricingModel && !!formData.price;
          case 'MARKET': return !!formData.targetCustomer;
          case 'DISTRIBUTION': return !!formData.channel;
          case 'PROBLEM': return !!formData.painPoints;
          case 'SEGMENT': return !!formData.personaName;
          case 'SOLUTION': return !!formData.coreFeature;
          case 'SIZING': return !!formData.tam; // minimal check
          case 'EQUITY': return !!formData.foundersSplit;
          case 'LAUNCH': return !!formData.launchStrategy;
          case 'FRICTION': return !!formData.entryModel;
          case 'PIT_STOP': return !!formData.pitStopFocus;
          case 'EVOLUTION': return !!formData.evolutionStrategy;
          case 'NARRATIVE': return !!formData.narrativeType;
          default: return true; // Default/PaperNode logic - maybe check label/title if strict
      }
  };

  const isValid = checkValidity();
  const isLocked = node.data.isNew; // New nodes are locked from closing until saved

  const handleSave = () => {
      if (node.data.isNew && !isValid) {
          setError("Please fill in the required fields to continue.");
          return;
      }
      
      // Remove isNew flag on save
      const finalData = { ...formData, isNew: false };
      onSave(node.id, finalData);
      onClose();
  };

  return (
    <ModalBase 
        isOpen={isOpen} 
        onClose={isLocked ? () => {} : onClose} 
        className="nif-modal-container nif-modal-edit"
    >
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-forest-dark)', margin: 0 }}>Edit {node.data.type ? node.data.type : 'Node'}</h2>
                {!isLocked && (
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                )}
            </div>

            <div className="nif-form-stack" style={{ flex: 1 }}>
                {renderFields()}
            </div>

            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                {error && <div style={{ color: '#EF4444', fontSize: '14px', marginBottom: '4px' }}>{error}</div>}
                
                <div style={{ display: 'flex', gap: '12px' }}>
                    {!isLocked && (
                        <button onClick={onClose} className="nif-btn-cancel">Cancel</button>
                    )}
                     <button 
                        onClick={handleSave} 
                        className="nif-btn-primary" 
                        style={{ width: 'auto', padding: '0 24px' }}
                    >
                        <Save size={18} />
                        {node.data.isNew ? 'Save & Continue' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    </ModalBase>
  );
};
