import { useEffect, useState } from 'react';
// import './DotCursor.css'; // Custom CSS for the dot cursor

const DotCursor = ({expand=false}:{expand?:boolean}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e:any) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    
    import("./DotCursor.css")
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePos]);

  return (
    <>
      <div
        className="dot-cursor"
        style={{
          width: expand ? '250px' : '15px' ,
          height: expand ? '250px' : '15px',
          filter: expand ? 'invert(0.85)' : 'none',
          mixBlendMode: expand ? 'difference' : undefined,
          border: '1px solid #ccc',
          // ...(!expand && {filter: 'none'}),
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />
    </>
  );
};

export default DotCursor;
