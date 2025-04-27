import React from 'react';
import '../index.css';
import img1 from '../assets/aditya.png'; // Change path according to your setup
import img2 from '../assets/aman.jpg';
import img3 from '../assets/snj.png';

const teamMembers = [
  {
    name: 'Aditya Raj',
    description: 'A passionate full-stack developer known for creative problem-solving, seamless front-end and back-end integration, and outstanding leadership in tech-driven teams.',
    image: img1,
  },
  {
    name: 'Aman Kumar Verma',
    description: 'A front-end developer and data science enthusiast who leverages big data, machine learning, and user-centered design to create innovative, data-driven digital experiences.',
    image: img2,
  },
  {
    name: 'Riya Singh',
    description: ' An innovative front-end developer and data science student focused on building intuitive, visually engaging interfaces backed by data-driven insights to enhance user experiences worldwide.',
    image: img3,
  },
];

const AboutUs = () => {
  return (
    <div className="about-mt">
      <h1 className="text-4xl font-bold text-blue-900 mb-5 text-center text-italic tracking-tight">Meet Our Team</h1>
      {teamMembers.map((member, index) => (
        <div key={index} className={`about-member ${index % 2 === 0 ? 'left' : 'right'}`}>
          <div className="about-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="about-content">
          <h2><span className="font-bold">{member.name}</span></h2>
            <p>{member.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
