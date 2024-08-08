import React from 'react';
import { Navbar } from '../components/navbar';
import { useState, useEffect } from "react"; import "../components/ui.css";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  const handleScroll = () => setScrollPosition(window.pageYOffset);
  const handleClick = () => navigate("/signup/student")
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='top'>
      <Navbar />
      <section
        style={{
          backgroundSize: `${(window.outerHeight - scrollPosition) / 7}%`,
        }}
        className="bannerr containerr"
      >
        <h2>Student Portal</h2>
        <button onClick={handleClick} style={{ ":hover": { cursor: "pointer" } }}>Get Started</button>
      </section>
      <section className="containerr">
        <h2>What is Student Portal?</h2>
        <p>
          A student portal is a digital platform that serves as a centralized hub for students within an educational institution. It offers essential functionalities such as e-complaint management, additional course enrollment, and timetable access.
          With the e-complaint feature, students can easily submit grievances electronically, track their status, and ensure prompt resolution. The additional course enrollment functionality provides students with opportunities to explore and sign up for extra courses or workshops beyond their regular curriculum. Timetable management allows students to view their class schedules, receive real-time updates, and effectively plan their academic activities. These features streamline administrative processes, enhance communication, and empower students to navigate their academic journey efficiently.
        </p>
        <p>

        </p>
        <p>
          . We wanted to
          create a centralized system that makes life simpler for
          students. We noticed that students often struggle with
          different systems and websites when it comes to things like
          checking their timetable, lodging complaints, or signing up
          for extra courses. This can be frustrating and time consuming.
          So, we set out to create a student portal that brings all these
          essential functions together in one easy-to-use platform.
          With the portal, students can easily access their timetable.
          They can also lodge complaints quickly and efficiently,
          ensuring that any issues are addressed promptly.
        </p>
        <p>
          One of the highlights of the portal is the ability for students
          to enroll in additional courses. We believe that learning
          should extend beyond the classroom, and by offering a
          variety of supplementary courses and workshops, we're
          giving students the opportunity to explore their interests
          and develop new skills.
          Overall, our goal with this student portal is to make life
          easier for students and to enhance their academic journey.
          We want to empower them with the convenience and
          flexibility to manage various aspects of their academic life
          from one central platform, ultimately fostering a more
          streamlined and user-centric approach to student
          management
        </p>
      </section>
    </div>
  );
};
