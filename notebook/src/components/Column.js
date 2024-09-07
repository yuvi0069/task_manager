import React from 'react';
import { useDrop } from 'react-dnd';

const Column = ({ tag, children, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'note',
    drop: (item) => onDrop(item.note, tag),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgrey' : 'white', minHeight: '300px', padding: '10px', borderRadius: '5px' }}>
      {children}
    </div>
  );
};

export default Column;
