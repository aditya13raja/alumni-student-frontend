import React, { useState } from 'react';

const roadmapStagesBTech = [
  {
    title: 'Define Your Ultimate Goal (Big Picture)',
    description: `Start with understanding what success means to you after you complete your BTech. 
    It could be landing your dream job, starting your own company, pursuing higher studies (like an MS or MBA), 
    or achieving a particular level of expertise in a specific technology.`,
    goalExample: '"I want to secure a top position at a leading tech company like Google or Microsoft after completing my BTech."',
    actionItems: []
  },
  {
    title: 'Build Strong Academic Foundations (Excel in Your Studies)',
    description: `Your academic performance plays a significant role in shaping your future opportunities. Focus on mastering 
    the concepts and building a deep understanding of your coursework.`,
    actionItems: [
      'Prioritize understanding key subjects in your domain (e.g., Computer Science, Electrical Engineering, Civil Engineering, etc.)',
      'Maintain good grades in essential subjects (core subjects) like Data Structures, Algorithms, Mathematics, etc.',
      'Use online resources (like Coursera, edX, Udemy) to supplement your learning.',
      'Don\'t just focus on theory—work on practical application through assignments and projects.'
    ]
  },
  {
    title: 'Develop Technical Skills (Hands-on Practice)',
    description: `Building technical skills is crucial for career success. Work on relevant technologies that are in demand in your field.`,
    actionItems: [
      'Master programming languages that are popular in your field (e.g., C/C++, Java, Python, JavaScript)',
      'Start working on personal projects or contribute to open-source. This gives you hands-on experience and builds your portfolio.',
      'Learn the relevant tools and frameworks used in your field (e.g., React, Node.js, machine learning libraries, databases like MySQL or MongoDB, etc.)',
      'Participate in coding competitions or hackathons. These events challenge your skills and are great for learning and networking.'
    ]
  },
  {
    title: 'Build a Strong Online Presence (Portfolio & Networking)',
    description: `As a BTech student, it’s important to build a professional identity online. Employers and universities often look at your online presence when making decisions.`,
    actionItems: [
      'Create a strong LinkedIn profile that highlights your skills, projects, and achievements. Connect with industry professionals, professors, and alumni.',
      'Maintain a GitHub account to showcase your coding projects. This acts as your digital portfolio for potential recruiters.',
      'Create a personal website or blog to showcase your projects, achievements, and thoughts on various technical topics.'
    ]
  },
  {
    title: 'Internships and Real-World Experience (Learn by Doing)',
    description: `Internships play a key role in building practical experience, understanding the work culture, and making professional connections.`,
    actionItems: [
      'Apply for internships in your field as early as possible. Summer internships or winter internships are great opportunities.',
      'Focus on both technical internships and roles that allow you to explore the industry, leadership, and business aspects.',
      'Try to intern with startups or well-established companies—both offer valuable experiences.',
      'If internships aren’t available, try freelance projects, volunteering, or even personal projects.'
    ]
  },
  {
    title: 'Focus on Soft Skills (Communication, Leadership, Teamwork)',
    description: `While technical skills are essential, soft skills like communication, teamwork, and leadership are equally important in the workplace.`,
    actionItems: [
      'Practice presenting your ideas clearly. This can be through presentations in class or by participating in group discussions and projects.',
      'Work on group projects and learn to collaborate effectively with others.',
      'Take on leadership roles in college clubs or activities (e.g., tech clubs, robotics teams, event organizing).'
    ]
  },
  {
    title: 'Networking (Building Professional Relationships)',
    description: `Building a network of professionals, professors, and industry peers will help you get career opportunities, insights, and advice.`,
    actionItems: [
      'Attend college career fairs, guest lectures, and workshops.',
      'Network with professors, alumni, and professionals in your field.',
      'Join relevant online communities (e.g., Reddit, Stack Overflow, GitHub) to engage with other learners and professionals.',
      'Use LinkedIn to follow industry leaders and companies you’re interested in.'
    ]
  },
  {
    title: 'Plan for Higher Studies (Optional Path)',
    description: `If you’re interested in pursuing higher studies (like MS, MTech, or MBA), you should start preparing early.`,
    actionItems: [
      'Research the requirements for the higher education programs you’re interested in (GMAT/GRE scores, specific prerequisites, etc.)',
      'Maintain a strong academic record and build a research-oriented mindset for MS programs (if applicable).',
      'For MBA aspirants, focus on gaining leadership experience and participating in extracurricular activities.'
    ]
  },
  {
    title: 'Job Search & Career Development (Start Preparing Early)',
    description: `In the later years of your BTech, focus on preparing for the job market. Many companies start hiring interns or freshers even before graduation.`,
    actionItems: [
      'Prepare for Placements: Begin preparing for campus recruitment by practicing coding problems, aptitude tests, and interview questions.',
      'Build a Resume: Create a professional resume that highlights your skills, projects, internships, and achievements.',
      'Apply to multiple companies, including startups, mid-sized firms, and large corporations.',
      'Practice mock interviews and technical interviews to prepare for real-world assessments.'
    ]
  },
  {
    title: 'Stay Consistent, Be Adaptable, and Keep Learning (Continuous Growth)',
    description: `Success doesn’t happen overnight. You’ll need to keep pushing forward, adapting to changes, and learning new things.`,
    actionItems: [
      'Stay consistent in working towards your goals every day—whether it’s studying, coding, or networking.',
      'Be open to feedback and willing to learn from failures.',
      'Keep updating your skill set to stay relevant in a rapidly changing tech world.',
      'Keep working on your personal development alongside your technical expertise.'
    ]
  }
];

const roadmapStagesMTech = [
  {
    title: 'Define Your Research Area (Big Picture)',
    description: `Identify and define your research area for your MTech thesis. This will be critical to your academic and career success.`,
    goalExample: '"I want to work in the field of Artificial Intelligence and contribute to cutting-edge research."',
    actionItems: []
  },
  {
    title: 'Refine Core Knowledge (Advanced Courses)',
    description: `In MTech, you’ll take advanced-level courses that will build on your foundational knowledge.`,
    actionItems: [
      'Focus on mastering advanced subjects that complement your research interests (e.g., AI, Data Science, Cloud Computing, etc.)',
      'Make sure to work on projects that reflect real-world applications of what you are learning.',
      'Consider taking online courses or certifications to supplement your learning (e.g., Coursera, edX).'
    ]
  },
  {
    title: 'Research & Development (Hands-on Practice)',
    description: `In MTech, you will be required to focus more on research and practical implementations in your area of interest.`,
    actionItems: [
      'Work on your thesis or research project under the guidance of a mentor.',
      'Develop prototypes or systems based on your research area.',
      'Publish research papers or collaborate with other researchers to gain recognition in the field.'
    ]
  },
  {
    title: 'Networking with Experts and Industry Leaders',
    description: `Networking in MTech is more focused on research collaborations and connecting with experts in your field.`,
    actionItems: [
      'Attend research conferences and workshops to learn about recent advancements and meet experts.',
      'Network with professors, researchers, and professionals who share your research interests.',
      'Join online research communities or groups in platforms like LinkedIn, ResearchGate, or specific tech groups.'
    ]
  },
  {
    title: 'Internships and Industry Collaboration',
    description: `An internship or collaboration with the industry can provide real-world applications of your research.`,
    actionItems: [
      'Apply for internships in companies that focus on research or development in your area of expertise.',
      'Work on collaborative projects that involve both academia and industry partners.',
      'Seek internships that provide you with the opportunity to work on real-world problems related to your research.'
    ]
  },
  {
    title: 'Develop Soft Skills for Academia and Industry',
    description: `Soft skills are essential in both research and industry roles in MTech.`,
    actionItems: [
      'Improve your technical communication skills to present complex ideas clearly.',
      'Work on teamwork and collaboration skills, as most research work is done in teams.',
      'Develop leadership qualities if you aim to lead research projects or teams in the future.'
    ]
  },
  {
    title: 'Prepare for Career Opportunities or PhD',
    description: `After MTech, you will need to decide whether to enter the workforce or continue with further studies (PhD).`,
    actionItems: [
      'If aiming for a job, apply for roles in research and development departments of top tech companies or academic institutes.',
      'If considering a PhD, prepare by looking for suitable research topics and professors to collaborate with.',
      'Develop a strong portfolio of your research papers, thesis, and projects.'
    ]
  },
  {
    title: 'Contribute to the Community',
    description: `MTech is an excellent time to start contributing back to the academic and research community.`,
    actionItems: [
      'Publish your research findings in reputable journals and conferences.',
      'Get involved in mentoring undergraduate students or guiding research groups.',
      'Participate in community-driven projects or open-source research initiatives.'
    ]
  }
];

const roadmaps = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isMTech, setIsMTech] = useState(false);  // To toggle between BTech and MTech roadmap

  const roadmapStages = isMTech ? roadmapStagesMTech : roadmapStagesBTech;

  return (
    <div className="flex flex-col items-center text-white-500 p-8 min-h-screen">
  <h1 className="text-4xl font-semibold mb-6">Student's Roadmap TO Success</h1>


      <div className="mb-4 shadow-lg">
        <button
          onClick={() => setIsMTech(false)}
          className={`px-4 py-2 rounded-md ${!isMTech ? 'bg-blue-600' : 'bg-gray-200'} hover:bg-blue-700`}
        >
          BTech Roadmap
        </button>
        <button
          onClick={() => setIsMTech(true)}
          className={`px-4 py-2 rounded-md ${isMTech ? 'bg-blue-600' : 'bg-gray-200'} hover:bg-blue-700`}
        >
          MTech Roadmap
        </button>
      </div>

      <div className="bg-transparent-900 p-6 rounded-lg w-full max-w-3xl shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-500">{roadmapStages[currentStage].title}</h2>
        <p className="text-black-400 mt-2">{roadmapStages[currentStage].description}</p>

        {roadmapStages[currentStage].goalExample && (
          <div className="mt-4 text-black-300 italic">
            <strong>Goal Example:</strong> {roadmapStages[currentStage].goalExample}
          </div>
        )}

        <ul className="mt-4 list-disc pl-5 space-y-2 text-black-300">
          {roadmapStages[currentStage].actionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentStage(currentStage > 0 ? currentStage - 1 : 0)}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Previous Stage
          </button>
          <button
            onClick={() => setCurrentStage(currentStage < roadmapStages.length - 1 ? currentStage + 1 : roadmapStages.length - 1)}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Next Stage
          </button>
        </div>
      </div>
    </div>
  );
};

export default roadmaps;
