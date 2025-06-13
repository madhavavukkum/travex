const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Bengaluru, Karnataka",
    type: "Full-time",
    remote: true,
    salary: "₹30,00,000 - ₹40,00,000",
    posted: "2023-04-10",
    summary: "Join our core team to build amazing user experiences with modern frontend technologies.",
    description: `
      <p>We're looking for a Senior Frontend Developer to help us build the next generation of our web applications. You'll be working closely with designers, product managers, and backend developers to create intuitive and responsive user interfaces.</p>
      
      <h4>Responsibilities:</h4>
      <ul>
        <li>Develop new user-facing features using React.js and modern frontend tools</li>
        <li>Build reusable components and libraries for future use</li>
        <li>Translate designs and wireframes into high-quality code</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
      </ul>
      
      <h4>Requirements:</h4>
      <ul>
        <li>5+ years of experience with frontend development</li>
        <li>3+ years of experience with React.js</li>
        <li>Strong proficiency in JavaScript, HTML, and CSS</li>
        <li>Experience with responsive design and cross-browser compatibility</li>
        <li>Familiarity with RESTful APIs and modern frontend build pipelines</li>
        <li>Excellent communication skills and ability to work in a team</li>
      </ul>
    `,
    tags: ["React", "JavaScript", "CSS", "Senior", "Frontend"]
  },
  {
    id: 2,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    remote: true,
    salary: "₹25,00,000 - ₹35,00,000",
    posted: "2023-04-15",
    summary: "Build robust and scalable backend systems that power our applications.",
    description: `
      <p>We are seeking a Backend Engineer to design and implement scalable and maintainable server-side applications. You'll be responsible for the server architecture and ensuring high performance and responsiveness to requests from the front-end.</p>
      
      <h4>Responsibilities:</h4>
      <ul>
        <li>Design and implement robust and scalable backend services</li>
        <li>Integrate with databases, caches, queues, and other backend systems</li>
        <li>Write clean, testable code with extensive test coverage</li>
        <li>Collaborate with frontend developers to define and implement APIs</li>
        <li>Continuously improve our engineering practices and codebase</li>
      </ul>
      
      <h4>Requirements:</h4>
      <ul>
        <li>3+ years of experience in backend development</li>
        <li>Strong knowledge of Node.js or Python</li>
        <li>Experience with SQL and NoSQL databases</li>
        <li>Understanding of RESTful APIs and microservices architecture</li>
        <li>Experience with cloud services (AWS, GCP, or Azure)</li>
        <li>Ability to write efficient, secure, and testable code</li>
      </ul>
    `,
    tags: ["Node.js", "Python", "Databases", "Backend", "API"]
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department: "Design",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    remote: false,
    salary: "₹20,00,000 - ₹30,00,000",
    posted: "2023-04-20",
    summary: "Create beautiful, intuitive experiences that delight our users.",
    description: `
      <p>We're looking for a talented UX/UI Designer to create amazing user experiences. You will work with our product and engineering teams to design interfaces that are intuitive, effective, and delightful.</p>
      
      <h4>Responsibilities:</h4>
      <ul>
        <li>Create user flows, wireframes, prototypes, and high-fidelity mockups</li>
        <li>Conduct user research and usability testing</li>
        <li>Develop UI style guides and design systems</li>
        <li>Collaborate closely with product managers and engineers</li>
        <li>Stay up-to-date with the latest UI trends, techniques, and technologies</li>
      </ul>
      
      <h4>Requirements:</h4>
      <ul>
        <li>3+ years of experience in UX/UI design</li>
        <li>Strong portfolio demonstrating your design process and solutions</li>
        <li>Proficiency in design tools such as Figma, Sketch, or Adobe XD</li>
        <li>Understanding of HTML, CSS, and JavaScript capabilities</li>
        <li>Experience with user research and usability testing</li>
        <li>Excellent visual design skills with attention to detail</li>
      </ul>
    `,
    tags: ["UI", "UX", "Figma", "Design Systems", "User Research"]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    remote: true,
    salary: "₹25,00,000 - ₹35,00,000",
    posted: "2023-04-25",
    summary: "Build and maintain our cloud infrastructure and deployment pipelines.",
    description: `
      <p>We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines. You'll work closely with our engineering team to ensure that our applications are deployed reliably and efficiently.</p>
      
      <h4>Responsibilities:</h4>
      <ul>
        <li>Design, implement and maintain CI/CD pipelines</li>
        <li>Manage and improve our cloud infrastructure</li>
        <li>Implement monitoring, alerting, and logging solutions</li>
        <li>Automate repetitive tasks and improve developer experience</li>
        <li>Collaborate with developers to ensure application deployability</li>
      </ul>
      
      <h4>Requirements:</h4>
      <ul>
        <li>3+ years of experience in a DevOps or SRE role</li>
        <li>Strong knowledge of AWS or other cloud platforms</li>
        <li>Experience with Infrastructure as Code (Terraform, CloudFormation)</li>
        <li>Experience with CI/CD tools (Jenkins, GitHub Actions, etc.)</li>
        <li>Strong scripting skills (Bash, Python, etc.)</li>
        <li>Knowledge of containerization technologies (Docker, Kubernetes)</li>
      </ul>
    `,
    tags: ["DevOps", "AWS", "CI/CD", "Docker", "Kubernetes"]
  },
  {
    id: 5,
    title: "Product Manager",
    department: "Product",
    location: "Delhi, NCR",
    type: "Full-time",
    remote: false,
    salary: "₹30,00,000 - ₹45,00,000",
    posted: "2023-05-01",
    summary: "Define and drive product vision, strategy, and roadmap to deliver exceptional user experiences.",
    description: `
      <p>We're looking for a Product Manager to help us shape the future of our products. You'll work with cross-functional teams to define product requirements, prioritize features, and deliver exceptional user experiences.</p>
      
      <h4>Responsibilities:</h4>
      <ul>
        <li>Define product vision, strategy, and roadmap</li>
        <li>Gather and analyze user feedback and market research</li>
        <li>Write detailed product requirements and user stories</li>
        <li>Work closely with design and engineering teams</li>
        <li>Monitor and analyze product metrics to measure success</li>
      </ul>
      
      <h4>Requirements:</h4>
      <ul>
        <li>3+ years of experience in product management</li>
        <li>Experience with agile development methodologies</li>
        <li>Strong analytical and problem-solving skills</li>
        <li>Excellent communication and presentation skills</li>
        <li>Ability to prioritize and make data-driven decisions</li>
        <li>Technical background or familiarity with software development</li>
      </ul>
    `,
    tags: ["Product Management", "Agile", "Strategy", "User Research"]
  },
  {
    id: 6,
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    remote: true,
    salary: "₹35,00,000 - ₹50,00,000",
    posted: "2023-05-05",
    summary: "Transform raw data into actionable insights that drive business decisions.",
    description: `
      <p>We are seeking a Data Scientist to help us extract valuable insights from our data. You'll work with large datasets to build models that solve complex business problems and drive decision-making.</p>
      
      <h4>Responsibilities:</h4>
      <ul>
        <li>Analyze large datasets to identify patterns and trends</li>
        <li>Build and deploy machine learning models</li>
        <li>Collaborate with product and engineering teams to implement data-driven solutions</li>
        <li>Communicate findings and recommendations to stakeholders</li>
        <li>Stay up-to-date with the latest developments in data science and machine learning</li>
      </ul>
      
      <h4>Requirements:</h4>
      <ul>
        <li>3+ years of experience in data science or related field</li>
        <li>Strong programming skills in Python or R</li>
        <li>Experience with machine learning frameworks (e.g., TensorFlow, PyTorch, scikit-learn)</li>
        <li>Proficiency in SQL and data manipulation</li>
        <li>Experience with data visualization tools</li>
        <li>MS or PhD in Computer Science, Statistics, or related field</li>
      </ul>
    `,
    tags: ["Data Science", "Machine Learning", "Python", "Analytics"]
  }
]

export default jobsData