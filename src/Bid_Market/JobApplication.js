import React, { useState, useEffect } from 'react';

function JobPostingForm() {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [jobs, setJobs] = useState([]);
    const [applying, setApplying] = useState(null);
    const [jobTitle, setJobTitle] = useState(''); // New state for job title in application form
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [resume, setResume] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !company || !description || !location || !skills) {
            alert("Please fill in all fields");
            return;
        }

        const jobPost = {
            title,
            company,
            description,
            location,
            skills: skills.split(',').map(skill => skill.trim()),
        };

        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobPost),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Job Posted:", data);
            alert("Job posted successfully!");
            setJobs([...jobs, data]);

            setTitle('');
            setCompany('');
            setDescription('');
            setLocation('');
            setSkills('');
        })
        .catch(error => {
            console.error("Error posting job:", error);
            alert("There was an error posting the job.");
        });
    };

    const handleApply = (jobId) => {
        const selectedJob = jobs.find(job => job.id === jobId);
        setApplying(jobId);
        setJobTitle(selectedJob ? selectedJob.title : ''); // Set the job title for application
    };

    const submitApplication = async(e) => {
        e.preventDefault();

        const resume1 = `http://localhost:3000/images/${resume.name}`;
    
        const formData = new FormData();
        formData.append("jobId", applying);
        formData.append("Jobtitle",jobTitle);
        formData.append("applicantName", applicantName);
        formData.append("applicantEmail", applicantEmail);
        formData.append("contactNumber", contactNumber);
        if (resume) {
            formData.append("resume", resume);
        }
    
        const response = await fetch("http://localhost:3000/application", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                jobId: applying,
                jobTitle:jobTitle,
                applicantName: applicantName,
                applicantEmail:applicantEmail,
                contactNumber:contactNumber,
                resume: resume1
            }),
        })
            if(response.ok){
                console.log("Application Submitted:" );
                alert("Application submitted!");

                // Clear form fields after successful submission
                setApplying(null);
                setApplicantName('');
                setApplicantEmail('');
                setContactNumber('');
                setResume(null);
            }
    };
    

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Job Posting Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter job title"
                    />
                </div>
                
                <div>
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter company name"
                    />
                </div>
                
                <div>
                    <label>Job Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter job description"
                    ></textarea>
                </div>
                
                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter job location"
                    />
                </div>
                
                <div>
                    <label>Required Skills (comma-separated)</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="E.g., JavaScript, React, Node.js"
                    />
                </div>
                
                <button type="submit">Post Job</button>
            </form>

            <h2>Job Listings</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                        <button onClick={() => handleApply(job.id)}>Apply</button>
                    </li>
                ))}
            </ul>

            {applying && (
                <div>
                    <h2>Apply for Job</h2>
                    <form onSubmit={submitApplication}>
                        <div>
                            <label>Job Title</label>
                            <input
                                type="text"
                                value={jobTitle}
                                readOnly // Make the job title read-only
                            />
                        </div>
                        <div>
                            <label>Your Name</label>
                            <input
                                type="text"
                                value={applicantName}
                                onChange={(e) => setApplicantName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label>Your Email</label>
                            <input
                                type="email"
                                value={applicantEmail}
                                onChange={(e) => setApplicantEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label>Contact Number</label>
                            <input
                                type="text"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                placeholder="Enter your contact number"
                            />
                        </div>
                        <div>
                            <label>Upload Resume</label>
                            <input
                                type="file"
                                onChange={(e) => setResume(e.target.files[0])}
                            />
                        </div>
                        <button type="submit">Submit Application</button>
                        <button onClick={() => setApplying(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default JobPostingForm;