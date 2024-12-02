import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import TodayIcon from '@mui/icons-material/Today';
import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';


// Event data interface
interface Event {
  imageCount: number;
  id: number;
  imageUrl: string;
  name: string;
  date: string;
}

// Event list component
const GalleryList: React.FC = () => {
    const events: Event[] = [
        {
          id: 1,
          imageUrl: '/dinger1.png',
          name: 'DINGER ROUND',
          date: 'Aug 8th 2022',
          imageCount:4
        },
        {
          id: 2,
          imageUrl: '/logodes1.png',
          name: 'Logo-Design 	Competition',
          date: 'Aug 25th 2022',
          imageCount:5
        },
        {
          id: 3,
          imageUrl: '/codeSprint1.0.jpeg',
          name: 'Code Sprint 1.0',
          date: 'July 20th & August 1st 2023',
          imageCount:8
        },
        // {
        //   id: 4,
        //   imageUrl: 'https://as2.ftcdn.net/v2/jpg/05/62/02/41/1000_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg',
        //   name: 'Event 1',
        //   date: 'JAN 1,2024',
        //   imageCount:50
        // },
        // {
        //   id: 5,
        //   imageUrl: 'https://i.pinimg.com/564x/0d/7e/82/0d7e82b92410eaa678875baeb5f89c48.jpg',
        //   name: 'Event 2',
        //   date: 'JAN 1,2024',
        //   imageCount:50
        // },
        // {
        //   id: 6,
        //   imageUrl: 'https://i.pinimg.com/474x/e1/1a/c0/e11ac0f5655e23c127b0781d5cd0fc87.jpg',
        //   name: 'Event 3',
        //   date: 'JAN 1,2024',
        //   imageCount:50
        // },
      ];
  const navigate = useNavigate();
 
  return (
    <div>
      <Navbar time={1} />
      <div style={{ width: 'max-content', padding: '10px', marginInline: 'auto', marginTop: '60px' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '30px' }} gutterBottom>Gallery</Typography>
      </div>

      <div style={{ margin:'auto',padding: '16px', maxWidth:"1224px"}}>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                elevation={4}
                sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}
                onClick={() => navigate(`/home/gallery/${event.id}`)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={event.imageUrl}
                  alt={event.name}
                />
                
                {/* Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.2)',
                    color: 'white',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="div" color="inherit">
                      {event.name}
                    </Typography>
                    <Typography variant="body2" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                      <TodayIcon sx={{ mr: 0.5 }} />
                      {event.date}
                    </Typography>
                  </Box>
                  {/* Image count badge */}
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(255, 69, 58, 0.85)',
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                  }}>
                    <PhotoLibraryIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{event.imageCount}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default GalleryList;
