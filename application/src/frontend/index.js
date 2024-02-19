import React from 'react';
import '../frontend/AboutUsPage.css'; // Import the CSS file
//import each pic like this:
//Name of the picture object, and path:
import Yakoub from '../frontend/pics/yak.jpg'
import Wing from '../frontend/pics/wing.jpg'
import Paige from '../frontend/pics/paige.png'
import Aleia from '../frontend/pics/aleia.png'
import carlos from '../frontend/pics/carlos.jpg'

const AboutUsPage = () => {
    return (
        <>
            <header class = "AboutUs">
                <h1 className="about-us-title">About Us</h1>
                <p class="about-us-description">Welcome to our company's About Us page! <br></br> Here, you can learn more about who we are, what we do, and our
                    mission.</p>
            </header>
            <h2>Team Members:</h2>
            <div className="team-members-container">
                <div className="team-member">
                    <h3>Yuto Mori</h3>
                    <img src="https://cdn.discordapp.com/attachments/835160897696956456/1196185042888708116/IMG_9934.png?ex=65e4d9a2&is=65d264a2&hm=e65e87059ca473dce3dd7cd72a230ba56cdb2fbaa9e1b30df4d82db3de5a1e75&"></img>
                    <p class = "title">Team Leader</p>
                    <p class = "Description">
                    Senior computer science student.
                    </p>
                    <p><a href ="https://github.com/ymorisfsu" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Paige Hodgkinson</h3>
                    <img src={Paige}></img>
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
                    <img src={Aleia}></img>
                    <p class = "title">Back-end lead</p>
                    <p class = "Description">
                        SFSU Student by day, Bartender by night~ <br></br><br></br>
                        Once she graduates in May with her Bachelors in Computer Science, Aleia hopes to become the very best <i>(Tech Sis)</i> that no one ever was!
                    </p>
                    <p><a href ="https://github.com/leileigoose" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Carlos Posadas</h3>
                    <img src={carlos}></img>
                    <p class = "title">Front-end lead</p>
                    <p class = "Description">Currently in SFSU pursuing a bachelor’s in Computer Science,
                        Carlos is in front-end working with partner Yakoub to make amazing designs and understand the vast field of the technology realm.
                        They are hoping to work within web development and make an impact in this generation. </p>
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
                    <img src={Wing}></img>
                    <p class = "title">Git-Hub Master</p>
                    <p class = "Description">I am a current undergrad just trying to graduate at this point and get my Computer Science degree and hopefully go into my masters, currently I am working as a Git-Hub master and back-end flex.</p>
                    <p><a href ="https://github.com/Ayanamesu" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
            </div>
        </>
    );
    
};
export default AboutUsPage;