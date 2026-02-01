import { MousePointer2, Layout, Type, Image, MoreHorizontal } from 'lucide-react';
import '../styles/layout.css';
import { Button } from './ui/Button';

export const LeftToolbar = () => {
  return (
    <aside className="left-toolbar">
      <Button variant="icon"><MousePointer2 size={20} /></Button>
      <Button variant="icon"><Layout size={20} /></Button>
      <Button variant="icon"><Type size={20} /></Button>
      <Button variant="icon"><Image size={20} /></Button>
      <div style={{ flex: 1 }} />
      <Button variant="icon"><MoreHorizontal size={20} /></Button>
    </aside>
  );
};
