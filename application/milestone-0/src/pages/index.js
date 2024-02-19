import React from 'react';
import '../AboutUsPage.css'; // Import the CSS file

const AboutUsPage = () => {
    return (
        <>
            <header class = "AboutUs">
                <h1 className="about-us-title">About Us</h1>
                <p>Welcome to our company's About Us page! Here, you can learn more about who we are, what we do, and our
                    mission.</p>
            </header>
            <h2>Team Memembers:</h2>
            <div className="team-members-container">
                <div className="team-member">
                    <h3>Yuto Mori</h3>
                    <img src="https://cdn.discordapp.com/attachments/835160897696956456/1196185042888708116/IMG_9934.png?ex=65e4d9a2&is=65d264a2&hm=e65e87059ca473dce3dd7cd72a230ba56cdb2fbaa9e1b30df4d82db3de5a1e75&"></img>
                    <p class = "title">Team Leader</p>
                    <p class = "Description">
                    Senior computer science student.
                    </p>
                    <p><a href ="https://github.com/phodgkinson1" target = "_blank"><button class = "button">GitHub</button></a></p>
                </div>
                <div className="team-member">
                    <h3>Paige Hodgkinson</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png"></img>
                    <p class = "title">Scrum Master</p>
                    <p class = "Description"></p>
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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png"></img>
                    <p class = "title">Front-end Floater</p>
                    <p class = "Description">The biggest bum at sfsu</p>
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