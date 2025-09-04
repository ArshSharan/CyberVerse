import './ShinyText.css';

const ShinyText = ({ children, text, disabled = false, speed = 'medium', className = '', variant = '' }) => {
  const speedMap = {
    'slow': '6s',
    'medium': '4s',
    'fast': '2s'
  };
  
  const animationDuration = speedMap[speed] || '4s';
  const content = children || text;

  return (
    <div 
      className={`shiny-text ${disabled ? 'disabled' : ''} ${variant} ${className}`} 
      style={{ 
        animationDuration: disabled ? '0s' : animationDuration 
      }}
    >
      {content}
    </div>
  );
};

export default ShinyText;
