import React from 'react';

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = React.memo(({ text }) => {
  return (
    <div className="badge">
      {text}
    </div>
  );
});

export default Badge;
