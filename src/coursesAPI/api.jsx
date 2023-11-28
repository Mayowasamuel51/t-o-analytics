import splunk from "../assets/images/splunk.png";
import linux from "../assets/images/linux.png";
import drone from "../assets/images/drone.jpg";
import stock from "../assets/images/stock.png";
import data from "../assets/images/data.jpg";
import photography from "../assets/images/photography.jpg";
import videography from "../assets/images/videography.jpg";

export default [
    {
        id: 1,
        image: splunk,
        courseName: "splunk",
        intro: "The Complete Splunk Bootcamp",
        description: "A comprehensive course on Linux. Learn, analyze and optimize with our splunk course",
        whatToLearn: [
            "Splunk user to admin level",
            "Splunk component and splunk data flow",
            "Splunk installation and configuration",
            "Data onboarding/Data parsing",
            "Splunk SPL",
            "Splunk alerts/ reports/ saved searches",
            "Splunk Dashboarding",
            "Data enrichment (Data Model)",
            "Regular expressions (REGEX)",
            "Distributed environment configuration (Architect exam prep)",
            "Splunk clustering",
        ],
        price: 3500,
    },
    {
        id: 2,
        image: linux,
        courseName: "Linux",
        intro: "Complete  Linux Mastery",
        description: "Master the command line, harness freedom and embrace open-source awareness with our Linux course",
        whatToLearn: [
            "Introduction to Linux",
            "File system & directory structure",
            "User  & group management",
            "File permissions and security",
            "Shell scripting",
            "Networking & network configuration",
            "Package management & software installation",
            "System administration tasks",
            "Linux server management",
        ],
        price: 2000
    },
    {
        id: 3,
        image: stock,
        courseName: "Stock & Options",
        intro: "Ultimate approach to financial decisions",
        description: "Everything you need to know to unlock financial freedom and success",
        whatToLearn: [
            "Penny stocks",
            "Trading 101",
            "Financial Literacy",
            "Options trading",
            "Market psychology",
            "Reading charts",
        ],
        price: 1000
    },
    {
        id: 4,
        image: drone,
        courseName: "Drone Tech",
        intro: "Complete Drone Technology Mastery",
        description: "Learn drone tech at the forefront with our complete course.",
        whatToLearn: [
            "Introductions to drones & their components",
            "Safety & regulations",
            "Flight principles & maneuvers",
            "Drone data collection & analysis",
            "MaIntenance & troubleshooting",
            "Programming & automation",
        ],
        price: 100
    },
    {
        id: 5,
        image: data,
        courseName: "Data",
        intro: "A Comprehensive Data Analysis Course",
        description: "A step by step guide to inspecting, cleaning, transforming and modeling data",
        whatToLearn: [
            "Excel  fundamentals",
            "Power BI",
            "SQL",
            "Programming & automation",
        ],
        price: 100
    },
    {
        id: 6,
        image: videography,
        courseName: "Videography",
        intro: "Complete Mastery of Videography",
        description: "Learn the perfect way of planning, capturing and editing  clear and beautiful videos",
        whatToLearn: [
            "Camera basics & settings",
            "Composition & framing techniques",
            "Lighting techniques for video",
            "Color grading & correction<",
            "Cinematic techniques & visual effects",
            "Storytelling through visuals",
            "Shot types  & camera movements",
            "Video editing & post production",
        ],
        price: 100
    },
    {
        id: 7,
        image: photography,
        courseName: "Photography",
        intro: "The Perfect Approach to  Capturing",
        description: "Everything you need to know on how to capture and create images",
        whatToLearn: [
            "Camera basics & settings",
            "Exposure & understanding light",
            "Composition & framing techniques",
            "Studio  lighting & portrait setups",
            "Landscape & nature photography",
            "Video editing & post production",
            "Understanding different lenses & their effects",
        ],
        price: 100,
    }
]