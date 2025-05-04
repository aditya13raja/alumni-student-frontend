import img1 from '../assets/aditya.png';
import img2 from '../assets/aman.jpg';
import img3 from '../assets/snj.png';

const teamMembers = [
    {
        name: 'Aditya Raj',
        description: 'A passionate full-stack developer known for creative problem-solving, seamless front-end and back-end integration, and outstanding leadership in tech-driven teams.',
        github: 'https://github.com/aditya13raja',
        image: img1,
    },
    {
        name: 'Aman Kumar Verma',
        description: 'A front-end developer and data science enthusiast who leverages big data, machine learning, and user-centered design to create innovative, data-driven digital experiences.',
        github: 'https://github.com/aman22verma10',
        image: img2,
    },
    {
        name: 'Riya Singh',
        description: 'An innovative front-end developer and data science student focused on building intuitive, visually engaging interfaces backed by data-driven insights to enhance user experiences worldwide.',
        github: 'https://github.com/aditya13raja',
        image: img3,
    },
];

const AboutUs = () => {
    return (
        <div className="mx-auto px-4 py-5">
            <h1 className="text-4xl font-bold text-blue-900 mb-10 text-center">
                Meet Our Team
            </h1>
            {teamMembers.map((member, index) => (
                <a 
                    href={member.github}
                    target='_blank'
                    key={index}
                    className='glass-card my-8 p-4 hover:scale-103'>
                    <div
                        className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center`}
                    >
                        <div className="flex-1 flex justify-center md:mb-0">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-80 h-80 object-cover rounded-full shadow-lg"
                            />
                        </div>
                        <div className="flex-1 p-4 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">{member.name}</h2>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                {member.description}
                            </p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default AboutUs;

