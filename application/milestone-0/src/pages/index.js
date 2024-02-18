import React from 'react';
import '../AboutUsPage.css'; // Import the CSS file
//import each pic like this:
//Name of the picture object, and path:
import Yakoub from '../pics/yak.jpg'

const AboutUsPage = () => {
    return (
        <>
            <header class = "AboutUs">
                <h1 className="about-us-title">About Us</h1>
                <p class="about-us-description">Welcome to our company's About Us page! Here, you can learn more about who we are, what we do, and our
                    mission.</p>
            </header>
            <h2>Team Memembers:</h2>
            <div className="team-members-container">
                <div className="team-member">
                    <h3>Yuto Mori</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png"></img>
                    <p class = "title">Founder/God</p>
                    <p class = "Description"></p>
                    <p><a href ="https://github.com/phodgkinson1" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Paige Hodgkinson</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png"></img>
                    <p class = "title">Scrum Master</p>
                    <p class = "Description">
                        Paige is a San Francisco State student and Hispanic Foundation of Silicon Valley’s LITSI Scholar whose special
                        interests include neural net mapping/design,  LLM, and soft computing applications in environmental data sciences.
                        As a practitioner of Buddhist mindfulness, she organized an SFSU instructor cohort between the computer science
                        and holistic health departments to explore a Mindfulness for Computer Science course as a potential replacement
                        for the current Ethics in Computer Science GWAR.
                    </p>
                    <p><a href ="https://github.com/phodgkinson1" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Aleia Natividad</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png"></img>
                    <p class = "title">Back-end lead</p>
                    <p class = "Description"></p>
                    <p><a href ="https://github.com/leileigoose" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Carlos Posadas</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png"></img>
                    <p class = "title">Front-end lead</p>
                    <p class = "Description"></p>
                    <p><a href ="https://github.com/c-posadas" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Yakoub Alkabsh</h3>
                    <img src={Yakoub}></img>
                    <p class = "title">Front-end Floater</p>
                    <p class = "Description">Yakoub is a SFSU student working on obtaining a bacholers degree in computer science, Currently working on the front-end with the help of Carlos and is eager to get into the CS field and make fat racks 🗣️💵🤑</p>
                    <p><a href ="https://github.com/Yakkubs" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Wing Lee</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png"></img>
                    <p class = "title">Git-Hub Master</p>
                    <p class = "Description"></p>
                    <p><a href ="https://github.com/Ayanamesu" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
            </div>
        </>
    );
};
export default AboutUsPage;