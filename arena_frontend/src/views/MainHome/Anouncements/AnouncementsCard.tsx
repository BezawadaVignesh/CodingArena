// import { ArrowRight, Calendar, Clock, Link as LinkIcon, MapPin, Users } from 'lucide-react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GroupIcon from '@mui/icons-material/Group';
import LinkIcon from '@mui/icons-material/Link';
import { CalendarIcon } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import './anouncements.css';

interface AnnouncementProps {
  title: string;
  date: string;
  time: string;
  description: string;
  isNew?: boolean;
  category: 'event' | 'news' | 'update';
  link: string;
  poster?: string;
  venue?: string;
  capacity?: string;
  registrationSteps?: readonly string[];
  additionalDetails?: string;
  organizer?: string;
  deadline?: string;
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({
  title,
  date,
  time,
  description,
  isNew = false,
  category,
  link,
  poster = 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070',
  venue,
  capacity,
  registrationSteps = [],
  additionalDetails,
  organizer,
  deadline,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`announcement-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="announcement-content">
        {isNew && <span className="new-badge">New!</span>}
        <span className={`category-badge ${category}`}>{category}</span>
        
        <div className="card-main-content">
          <div className="text-content">
            <h3 className="announcement-title">{title}</h3>
            <p className="announcement-description">{description}</p>
            <div className="announcement-meta">
              <div className="meta-item">
                <CalendarMonthIcon />
                <span>{date}</span>
              </div>
              <div className="meta-item">
                <AccessTimeIcon />
                <span>{time}</span>
              </div>
            </div>

            {isExpanded && (
              <div className="expanded-details">
                {venue && (
                  <div className="detail-item">
                    <GpsFixedIcon />
                    <span>Venue: {venue}</span>
                  </div>
                )}
                {capacity && (
                  <div className="detail-item">
                    <GroupIcon />
                    <span>Capacity: {capacity}</span>
                  </div>
                )}
                {deadline && (
                  <div className="detail-item important">
                    <CalendarIcon />
                    <span>Registration Deadline: {deadline}</span>
                  </div>
                )}
                {organizer && (
                  <div className="detail-item">
                    <GroupIcon />
                    <span>Organized by: {organizer}</span>
                  </div>
                )}
                
                {registrationSteps.length > 0 && (
                  <div className="registration-steps">
                    <h4>How to Register:</h4>
                    <ol>
                      {registrationSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {additionalDetails && (
                  <div className="additional-details">
                    <h4>Additional Information:</h4>
                    <p>{additionalDetails}</p>
                  </div>
                )}

                <a href={link} className="register-button">
                  <LinkIcon />
                  Register Now
                </a>
              </div>
            )}
          </div>

          <div className="poster-container">
            <img 
              src={poster} 
              alt={title} 
              className="announcement-poster"
              loading="lazy"
            />
          </div>
        </div>

        <button className="read-more" onClick={toggleExpand}>
          {isExpanded ? (
            <>View Less <ArrowRightAltIcon className="rotate-90" /></>
          ) : (
            <>Read More <ArrowRightAltIcon className="-rotate-90" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default AnnouncementCard;