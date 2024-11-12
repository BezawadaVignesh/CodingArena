
interface Event {
    id: number;
    name: string;
    subline: string;
    description: string;
    date: string;
    time: string;
    location: string;
    teamSize: number;
    registrationFee: number;
    eligibility: string;
    registrationStart: string;
    registrationDeadline: string;
    registeredStudents: number;
    hostedBy: string;
    hostNames: string[];
    imageUrl: string;
    shareUrls: { [key: string]: string };
    locationUrl: string;
  }
  
  type Events = {
    [key: number]: Event;
  };
  const eventDetails = `
  # Code Sprint 1.0 - Upcoming Event

**Organized by:** GCET_Coding_Club  
**Expected Participants:** 300+ students

## Event Overview

Code Sprint 1.0 is an exciting upcoming coding competition organized by the GCET_Coding_Club. The event will consist of two rounds:

### Round 1: Online MCQ Test  
- **Date:** July 20th, 2024  
- **Platform:** Google Platform  
- **Details:** Participants will be given 30 multiple-choice questions (MCQs). Out of all participants, the top 80 students will be shortlisted with a minimum score of 60%.  

### Round 2: Offline Coding Challenge  
- **Date:** August 1st, 2024 (Postponed from July 22nd, 2024 due to weather conditions in Hyderabad)  
- **Mode:** Offline  
- **Venue:** Geethanjali College of Engineering and Technology, Block-V E201 & E211 Laboratories  
- **Time:** 10:00 AM onwards  
- **Details:** The shortlisted students from Round 1 will be invited to the second round, which will take place offline at our college. The event was rescheduled due to heavy rains in Hyderabad, and all shortlisted students will be notified about the new date through email communication.  

## Event Platform

The event will be hosted on **HackerRank** platform. Each student will be given 5 coding problems to solve. The competition will test participants’ problem-solving skills, speed, and accuracy.

## Prizes

The top three students in the event will be awarded cash prizes as follows:

- **1st Prize:** ₹20,000  
- **2nd Prize:** ₹15,000  
- **3rd Prize:** ₹10,000  

## Acknowledgments

We are grateful to our beloved Chairman, **Shri G. Ravindar Reddy Garu**, for his generous financial support and motivation. Our dynamic **Principal, Dr. Udaya Kumar Susarla Garu**, and **Dean SCS&I, Dr. V. Madhusudhan Rao**, have been instrumental in supporting this event.

We would also like to express our gratitude to the **Coding Club Convener, Dr. A. SriLakshmi** (HOD-CSE) for her leadership in organizing the event, along with **Faculty Coordinators Keerthi M. and S. Ramanjaneyulu** for their continued efforts in encouraging students and staff to participate.

Special thanks to our **Student Coordinators** for their dedication in campaigning the event across both **Inter-College** and **Intra-College** levels, helping us to make this event a success!

## Contact Information
For any inquiries or further information about the event, feel free to reach out to the event coordinators at [event_email@example.com](mailto:event_email@example.com).

  `;
  const events:Events = {
    1: {
      id: 1,
      name: "Code Sprint 1.0",
      subline: "Code Sprint 1.0, organized by GCET_Coding_Club",
      description: eventDetails,
      date: "July 20th ,2023",
      time: " ",
      location: "online",
      teamSize: 1,
      registrationFee: 100,
      eligibility: "All tech enthusiasts and professionals",
      registrationStart: "Jul 1, 2023",
      registrationDeadline: "Jul 19, 2023",
      registeredStudents: 120,
      hostedBy: "Coding Club",
      hostNames: ["Keerthi. M", "S. Ramanjaneyulu", "P. Chandra Shekar"],
      imageUrl: "/codeSprint1.0.jpeg",
      shareUrls: {
        whatsapp: "https://wa.me/?text=Check%20out%20this%20event%3A%20Tech%20Conference%202025",
        twitter: "https://twitter.com/share?text=Join%20the%20Tech%20Conference%202025",
        linkedin: "https://linkedin.com/shareArticle?mini=true&url=https://example.com",
        facebook: "https://facebook.com/sharer/sharer.php?u=https://example.com"
      },
      locationUrl: "https://www.google.com/maps?q=Convention+Center+Silicon+Valley"
    },
    2: {
      id: 2,
      name: "Coding Marathon",
      subline: "Compete with the best coders",
      description: `
        ## Event Details
        **Description:** A thrilling 24-hour coding marathon to solve real-world problems.
  
        ### Schedule
        - **Date:** April 10, 2025
        - **Time:** 6:00 PM (24 hours)
  
        ### Location
        - **Venue:** Online
  
        ### Activities
        - Coding Challenges
        - Problem-Solving Workshops
      `,
      date: "April 10, 2025",
      time: "6:00 PM - 24 hours",
      location: "Online",
      teamSize: 4,
      registrationFee: 50,
      eligibility: "Engineering students and recent graduates",
      registrationStart: "Mar 1, 2025",
      registrationDeadline: "Apr 5, 2025",
      registeredStudents: 300,
      hostedBy: "Coding Club",
      hostNames: ["Tom White", "Sarah Miller", "Emily Davis"],
      imageUrl: "https://example.com/event-image2.jpg",
      shareUrls: {
        whatsapp: "https://wa.me/?text=Join%20the%20Coding%20Marathon%202025",
        twitter: "https://twitter.com/share?text=Challenge%20yourself%20at%20the%20Coding%20Marathon",
        linkedin: "https://linkedin.com/shareArticle?mini=true&url=https://example.com",
        facebook: "https://facebook.com/sharer/sharer.php?u=https://example.com"
      },
      locationUrl: "https://www.google.com/maps?q=Online"
    },
    // Additional events can follow the same structure
  };
  
export default events;