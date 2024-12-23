// AboutPage.jsx
import React from 'react';
import styles from '../styles/about.module.css';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const AboutPage = () => {
  const developers = [
    {
      name: 'Abhinav Vishwakarma',
      photo: '/assets/images/Abhinav.jpg',
      linkedin: 'https://www.linkedin.com/in/abhinav-vishwakarma-9a4b62274/',
      instagram: 'https://www.instagram.com/abhinav_97945/',
      email: 'avrk97945@gmail.com',
      des:'@Full Stack'
    },
    {
      name: 'Mahima Joshi',
      photo: '/assets/images/Mahima.png',
      linkedin: 'https://www.linkedin.com/in/mahima-joshi-998ba92b0/',
      instagram: 'https://www.instagram.com/mj.wrapp99/',
      email: 'joshi789mahi2@gmail.com',
      des:'@UI/UX'
    },
    {
        name: 'Rohit Bhardwaj',
        photo: '/assets/images/Rohit.png',
        linkedin: 'https://www.linkedin.com/in/rohit-bhardwaj-590725297/',
        instagram: 'https://www.instagram.com/_rohitbhardwaj.py_/',
        email: 'rb8329563@gmail.com',
        des:'@Frontend'
      },
    // Add more developers as needed
  ];

  return (
    <div className={styles.container}>
      <section className={styles.description}>
        <h1>About Our Website</h1>
        <p>📚 <strong>NextGen Nirmann</strong> is a revolutionary platform designed to simplify how college students access and manage their study resources. Our mission is to bring all your learning materials—lecture notes, sessional test papers, and university question papers—under one roof. No more sifting through scattered social media groups or endlessly searching PDFs! 🚀</p>

  <p>🔍 With our AI-powered features, you can instantly find specific topics, get concise summaries, and even explore trends from past question papers to predict potential questions for upcoming exams. 🧠✨ Whether it's first-year subjects or final-year challenges, our platform offers seamless navigation, easy downloads, and smart insights to enhance your academic journey.</p>

  <p>💾 Backed by reliable storage solutions like Google Drive API or Amazon S3, and built using cutting-edge technologies like React.js and Node.js, we ensure scalability, security, and user-friendly access anytime, anywhere. Join us to streamline your learning experience and focus on what truly matters—your success! 🎓💡</p>
      </section>

      <section className={styles.developers}>
        <h2>Meet the Developers</h2>
        <div className={styles.developerList}>
          {developers.map((dev, index) => (
            <div key={index} className={styles.developerCard}>
              <img src={dev.photo} alt={dev.name} className={styles.photo} />
              <h3>{dev.name}</h3>
              <h6>{dev.des}</h6>
              <div className={styles.socialLinks}>
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className={styles.icon} />
                </a>
                <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className={styles.icon} />
                </a>
                <a href={`mailto:${dev.email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className={styles.icon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
