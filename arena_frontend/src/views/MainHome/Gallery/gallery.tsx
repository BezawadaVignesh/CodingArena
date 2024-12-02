import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import './gallery.css';


// const Gallery: React.FC = () => {
//   return (
//     <div className="gallery">
//       {images.map((url, index) => (
//         <div key={index} className="gallery-item">
//           <img src={url} alt={`Gallery Image ${index + 1}`} />
//         </div>
//       ))}
//     </div>
//   );
// };
interface Event{
  name:string,
  images:string[],
  description:string,
}
const eventData: Record<number, Event> = {
  1: {
    images: [
      // Replace with URLs of your images
      '/dinger1.png',
      '/dinger2.png',
      '/dinger3.png',
      '/dinger4.png',
    ],
    name: ' DINGER ROUND',
    description: 'This is the gallery for Event 1.',
  },
  2: {
    images: [
      '/logodes1.png',
      '/logodes2.png',
      '/logodes3.png',
      '/logodes4.png',
    ],
    name: 'Logo-Design 	Competition',
    description: 'This is the gallery for Event 2.',
  },
  3: {
    images: [
      '/codesprint11.png',
      '/codesprint12.png',
      '/codesprint13.png',
      '/codesprint14.png',
      '/codesprint15.png',
      '/codesprint16.png',
      '/codesprint17.png',
      '/codeSprint1.0.jpeg'
    ],
    name: 'Code Sprint 1.0',
    description: 'This is the gallery for Event 3.',
  },
  // Add more events here
};
  const Gallery: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [slideDirection, setSlideDirection] = useState<string>('');
    const eventId = id ? Number(id) : NaN;
    const event = eventData[eventId];

    if (!event) {
      return <div>Event not found</div>;
    }
    const openModal = (index: number) => {
      setCurrentIndex(index);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
      setCurrentIndex(null);
    };
  
    const showPrevious = () => {
      if (currentIndex !== null) {
        if(currentIndex!=0){
          setSlideDirection('left');
          setCurrentIndex((prevIndex) => (prevIndex! === 0 ?  event.images.length - 1: prevIndex! - 1));
        }
        //askk vig
      }
    };
  
    const showNext = () => {
      if (currentIndex !== null) {
        setSlideDirection("right");
        setCurrentIndex((prevIndex) => (prevIndex! === event.images.length - 1 ? 0 : prevIndex! + 1));
      }
    };
  
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
  
      const swipeDistance = touchStart - touchEnd;
      if (swipeDistance > 50) {
        showNext(); 
      }
      if (swipeDistance < -50) {
        showPrevious();
      } 
      setTouchStart(null);
      setTouchEnd(null);
    };
    const theme = useTheme(); // Access the current theme

  // Use useEffect to update CSS variable on theme change
  useEffect(() => {
    const root = document.documentElement;
    if (theme.palette.mode === 'dark') {
      root.style.setProperty('--modal-background-color', '#333333');
      root.style.setProperty('--modal-button-color', '#fff');
      // root.style.setProperty('--modal-button-hover-color', '#ccc');
    } else {
      root.style.setProperty('--modal-background-color', '#ffffff');
      root.style.setProperty('--modal-button-color', 'black');
      // root.style.setProperty('--modal-button-hover-color', '#555');
    }
  }, [theme.palette.mode]);

    const breakpointColumns = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1,
    };
    
    return (
      <div>
        <Navbar time={1}/>
         <div style={{width:'max-content', marginInline:'auto', padding:"10px", marginTop:'65px'}}>
            <Typography  sx={{fontWeight:700, fontSize: '30px'}} gutterBottom >{event.name}</Typography>
      </div>
        {event.images.length!==0?
        <Masonry breakpointCols={breakpointColumns} className="gallery" columnClassName="gallery-column">
          {event.images.map((url, index) => (
            <div key={index} className="gallery-item" onClick={() => openModal(index)}>
              <img src={url} alt={`Gallery Image ${index + 1}`} />
            </div>
          ))}
        </Masonry>:(
        // Show the "No images uploaded" message if all events have no images
        <Box
          sx={{
            // flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" color="textSecondary">
            No images uploaded
          </Typography>
        </Box>
      )
        }
        {isOpen && currentIndex !== null && (
          <div
            className="modal"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="modal-overlay" onClick={closeModal}></div>
            <div 
            className="modal-content"
            >
              <img src={event.images[currentIndex]} alt={`Full Screen Image ${currentIndex + 1}`}
              className={`modal-image slide-in-${slideDirection}`}
              onAnimationEnd={() => setSlideDirection('')}
               />
              {/* <button className="modal-button close" onClick={closeModal}>✕</button>
              <button className="modal-button left" onClick={showPrevious}>◀</button>
              <button className="modal-button right" onClick={showNext}>▶</button> */}
              
               <button className="modal-button close" onClick={closeModal} >
                  <CloseIcon />
                </button>
                <button className="modal-button left" onClick={showPrevious}>
                  <ChevronLeftIcon />
                </button>
                <button className="modal-button right" onClick={showNext}>
                  <ChevronRightIcon />
                </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default Gallery;
