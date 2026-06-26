import { DraggableStateSnapshot, DraggableStyle } from '@hello-pangea/dnd';
import { CSSProperties } from 'react';

export const getTaskDropStyle = (
  draggableStyle: DraggableStyle | undefined,
  snapshot: DraggableStateSnapshot
): CSSProperties | undefined => {
  if (!snapshot.isDropAnimating) {
    return draggableStyle;
  }

  return {
    ...draggableStyle,
    transition: `all 0.3s ease`,
    backgroundColor: 'var(--task-item-bg)',
    boxShadow: 'var(--task-item-shadow)',
  };
};
