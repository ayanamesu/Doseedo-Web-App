import React from 'react';

const Reminders = () => {
    const dummyData = [
        {
            med_name: "crack",
            med_id: 1,
            repeat: "daily",
            frequency: 1,
            dates: ["Everyday"],
            time: "08:00 am"
        },
        {
            med_name: "meth",
            med_id: 2,
            repeat: "weekly",
            frequency: 2,
            dates: ["2022-09-06", "2022-09-08"],
            time: "09:00 am"
        },
        {
            med_name: "weed",
            med_id: 3,
            repeat: "monthly",
            frequency: 1,
            dates: ["2022-09-15"],
            time: "10:00 pm"
        },
        {
            med_name: "legos",
            med_id: 4,
            repeat: "weekly",
            frequency: 3,
            dates: ["2022-09-07", "2022-09-09", "2022-09-11"],
            time: "11:00 am"
        },
        {
            med_name: "dookie",
            med_id: 5,
            repeat: "monthly",
            frequency: 2,
            dates: ["2022-09-10", "2022-09-20"],
            time: "12:00 pm"
        }
    ];

    return (
        <div className="reminder-page">
            <h1>Notifications</h1>
            {dummyData.map((reminder) => (
                <div className="notification-box" key={reminder.id}>
                    <div className="notification-data">
                        <strong>{reminder.med_name}</strong>
                        <div className="notification-info">
                            <p>{reminder.repeat}:</p>
                            <p>{reminder.dates.join(", ")} at: </p>
                            <p>{reminder.time}</p>
                        </div>
                    </div>
                    <button>Taken</button>
                </div>
            ))}
        </div>
    );
    
};

export default Reminders;