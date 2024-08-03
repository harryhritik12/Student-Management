import mongoose from "mongoose";

const timetableId = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),

  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const timetables = [
    {
        _id: timetableId[0],
        "program": "BTech",
        "branch": "CSE",
        "batch": "CS31",
        "semester": 1,
        "days": {
          "Monday": [
            {"subject": "Math", "time": "9:00-10:00", "room": "201"},
            {"subject": "Physics", "time": "10:00-11:00", "room": "302"},
            {"subject": "Computer Science", "time": "11:00-12:00", "room": "203"},
            {"subject": "Chemistry", "time": "1:00-2:00", "room": "304"},
            {"subject": "Biology", "time": "2:00-3:00", "room": "205"},
            {"subject": "Economics", "time": "3:00-4:00", "room": "207"},
            {"subject": "Sociology", "time": "4:00-5:00", "room": "209"}
          ],
          "Tuesday": [
            {"subject": "Physics", "time": "9:00-10:00", "room": "302"},
            {"subject": "Computer Science", "time": "10:00-11:00", "room": "203"},
            {"subject": "Chemistry", "time": "11:00-12:00", "room": "304"},
            {"subject": "Biology", "time": "1:00-2:00", "room": "205"},
            {"subject": "Economics", "time": "2:00-3:00", "room": "207"},
            {"subject": "Sociology", "time": "3:00-4:00", "room": "209"},
            {"subject": "Math", "time": "4:00-5:00", "room": "201"}
          ],
          "Wednesday": [
            {"subject": "Computer Science", "time": "9:00-10:00", "room": "203"},
            {"subject": "Chemistry", "time": "10:00-11:00", "room": "304"},
            {"subject": "Biology", "time": "11:00-12:00", "room": "205"},
            {"subject": "Economics", "time": "1:00-2:00", "room": "207"},
            {"subject": "Sociology", "time": "2:00-3:00", "room": "209"},
            {"subject": "Math", "time": "3:00-4:00", "room": "201"},
            {"subject": "Physics", "time": "4:00-5:00", "room": "302"}
          ],
          "Thursday": [
            {"subject": "Chemistry", "time": "9:00-10:00", "room": "304"},
            {"subject": "Biology", "time": "10:00-11:00", "room": "205"},
            {"subject": "Economics", "time": "11:00-12:00", "room": "207"},
            {"subject": "Sociology", "time": "1:00-2:00", "room": "209"},
            {"subject": "Math", "time": "2:00-3:00", "room": "201"},
            {"subject": "Physics", "time": "3:00-4:00", "room": "302"},
            {"subject": "Computer Science", "time": "4:00-5:00", "room": "203"}
          ],
          "Friday": [
            {"subject": "Biology", "time": "9:00-10:00", "room": "205"},
            {"subject": "Economics", "time": "10:00-11:00", "room": "207"},
            {"subject": "Sociology", "time": "11:00-12:00", "room": "209"},
            {"subject": "Math", "time": "1:00-2:00", "room": "201"},
            {"subject": "Physics", "time": "2:00-3:00", "room": "302"},
            {"subject": "Computer Science", "time": "3:00-4:00", "room": "203"},
            {"subject": "Chemistry", "time": "4:00-5:00", "room": "304"}
          ]
        }
      },
      {
        _id: timetableId[1],
        "program": "BTech",
        "branch": "CSE",
        "batch": "CS32",
        "semester": 1,
        "days": {
          "Monday": [
            {"subject": "Math", "time": "9:00-10:00", "room": "201"},
            {"subject": "Physics", "time": "10:00-11:00", "room": "302"},
            {"subject": "Computer Science", "time": "11:00-12:00", "room": "203"},
            {"subject": "Chemistry", "time": "1:00-2:00", "room": "304"},
            {"subject": "Biology", "time": "2:00-3:00", "room": "205"},
            {"subject": "Economics", "time": "3:00-4:00", "room": "207"},
            {"subject": "Sociology", "time": "4:00-5:00", "room": "209"}
          ],
          "Tuesday": [
            {"subject": "Physics", "time": "9:00-10:00", "room": "302"},
            {"subject": "Computer Science", "time": "10:00-11:00", "room": "203"},
            {"subject": "Chemistry", "time": "11:00-12:00", "room": "304"},
            {"subject": "Biology", "time": "1:00-2:00", "room": "205"},
            {"subject": "Economics", "time": "2:00-3:00", "room": "207"},
            {"subject": "Sociology", "time": "3:00-4:00", "room": "209"},
            {"subject": "Math", "time": "4:00-5:00", "room": "201"}
          ],
          "Wednesday": [
            {"subject": "Computer Science", "time": "9:00-10:00", "room": "203"},
            {"subject": "Chemistry", "time": "10:00-11:00", "room": "304"},
            {"subject": "Biology", "time": "11:00-12:00", "room": "205"},
            {"subject": "Economics", "time": "1:00-2:00", "room": "207"},
            {"subject": "Sociology", "time": "2:00-3:00", "room": "209"},
            {"subject": "Math", "time": "3:00-4:00", "room": "201"},
            {"subject": "Physics", "time": "4:00-5:00", "room": "302"}
          ],
          "Thursday": [
            {"subject": "Chemistry", "time": "9:00-10:00", "room": "304"},
            {"subject": "Biology", "time": "10:00-11:00", "room": "205"},
            {"subject": "Economics", "time": "11:00-12:00", "room": "207"},
            {"subject": "Sociology", "time": "1:00-2:00", "room": "209"},
            {"subject": "Math", "time": "2:00-3:00", "room": "201"},
            {"subject": "Physics", "time": "3:00-4:00", "room": "302"},
            {"subject": "Computer Science", "time": "4:00-5:00", "room": "203"}
          ],
          "Friday": [
            {"subject": "Biology", "time": "9:00-10:00", "room": "205"},
            {"subject": "Economics", "time": "10:00-11:00", "room": "207"},
            {"subject": "Sociology", "time": "11:00-12:00", "room": "209"},
            {"subject": "Math", "time": "1:00-2:00", "room": "201"},
            {"subject": "Physics", "time": "2:00-3:00", "room": "302"},
            {"subject": "Computer Science", "time": "3:00-4:00", "room": "203"},
            {"subject": "Chemistry", "time": "4:00-5:00", "room": "304"}
          ]
        }
      },

      {
        _id: timetableId[2],
        "program": "BTech",
        "branch": "ECE",
        "batch": "EC31",
        "semester": 1,
        "days": {
          "Monday": [
            {"subject": "Analog Electronics", "time": "9:00-10:00", "room": "101"},
            {"subject": "Digital Signal Processing", "time": "10:00-11:00", "room": "102"},
            {"subject": "Electromagnetic Fields", "time": "11:00-12:00", "room": "103"},
            {"subject": "Control Systems", "time": "1:00-2:00", "room": "104"},
            {"subject": "Communication Systems", "time": "2:00-3:00", "room": "105"},
            {"subject": "Microprocessors", "time": "3:00-4:00", "room": "106"},
            {"subject": "VLSI Design", "time": "4:00-5:00", "room": "107"}
          ],
          "Tuesday": [
            {"subject": "Digital Signal Processing", "time": "9:00-10:00", "room": "102"},
            {"subject": "Electromagnetic Fields", "time": "10:00-11:00", "room": "103"},
            {"subject": "Control Systems", "time": "11:00-12:00", "room": "104"},
            {"subject": "Communication Systems", "time": "1:00-2:00", "room": "105"},
            {"subject": "Microprocessors", "time": "2:00-3:00", "room": "106"},
            {"subject": "VLSI Design", "time": "3:00-4:00", "room": "107"},
            {"subject": "Analog Electronics", "time": "4:00-5:00", "room": "101"}
          ],
          "Wednesday": [
            {"subject": "Electromagnetic Fields", "time": "9:00-10:00", "room": "103"},
            {"subject": "Control Systems", "time": "10:00-11:00", "room": "104"},
            {"subject": "Communication Systems", "time": "11:00-12:00", "room": "105"},
            {"subject": "Microprocessors", "time": "1:00-2:00", "room": "106"},
            {"subject": "VLSI Design", "time": "2:00-3:00", "room": "107"},
            {"subject": "Analog Electronics", "time": "3:00-4:00", "room": "101"},
            {"subject": "Digital Signal Processing", "time": "4:00-5:00", "room": "102"}
          ],
          "Thursday": [
            {"subject": "Control Systems", "time": "9:00-10:00", "room": "104"},
            {"subject": "Communication Systems", "time": "10:00-11:00", "room": "105"},
            {"subject": "Microprocessors", "time": "11:00-12:00", "room": "106"},
            {"subject": "VLSI Design", "time": "1:00-2:00", "room": "107"},
            {"subject": "Analog Electronics", "time": "2:00-3:00", "room": "101"},
            {"subject": "Digital Signal Processing", "time": "3:00-4:00", "room": "102"},
            {"subject": "Electromagnetic Fields", "time": "4:00-5:00", "room": "103"}
          ],
          "Friday": [
            {"subject": "Communication Systems", "time": "9:00-10:00", "room": "105"},
            {"subject": "Microprocessors", "time": "10:00-11:00", "room": "106"},
            {"subject": "VLSI Design", "time": "11:00-12:00", "room": "107"},
            {"subject": "Analog Electronics", "time": "1:00-2:00", "room": "101"},
            {"subject": "Digital Signal Processing", "time": "2:00-3:00", "room": "102"},
            {"subject": "Electromagnetic Fields", "time": "3:00-4:00", "room": "103"},
            {"subject": "Control Systems", "time": "4:00-5:00", "room": "104"}
          ]
        }
      },

      {
        _id: timetableId[3],
        "program": "BTech",
        "branch": "ECE",
        "batch": "EC32",
        "semester": 1,
        "days": {
          "Monday": [
            {"subject": "Analog Electronics", "time": "9:00-10:00", "room": "201"},
            {"subject": "Digital Signal Processing", "time": "10:00-11:00", "room": "202"},
            {"subject": "Electromagnetic Fields", "time": "11:00-12:00", "room": "203"},
            {"subject": "Control Systems", "time": "1:00-2:00", "room": "204"},
            {"subject": "Communication Systems", "time": "2:00-3:00", "room": "205"},
            {"subject": "Microprocessors", "time": "3:00-4:00", "room": "206"},
            {"subject": "VLSI Design", "time": "4:00-5:00", "room": "207"}
          ],
          "Tuesday": [
            {"subject": "Digital Signal Processing", "time": "9:00-10:00", "room": "202"},
            {"subject": "Electromagnetic Fields", "time": "10:00-11:00", "room": "203"},
            {"subject": "Control Systems", "time": "11:00-12:00", "room": "204"},
            {"subject": "Communication Systems", "time": "1:00-2:00", "room": "205"},
            {"subject": "Microprocessors", "time": "2:00-3:00", "room": "206"},
            {"subject": "VLSI Design", "time": "3:00-4:00", "room": "207"},
            {"subject": "Analog Electronics", "time": "4:00-5:00", "room": "201"}
          ],
          "Wednesday": [
            {"subject": "Electromagnetic Fields", "time": "9:00-10:00", "room": "203"},
            {"subject": "Control Systems", "time": "10:00-11:00", "room": "204"},
            {"subject": "Communication Systems", "time": "11:00-12:00", "room": "205"},
            {"subject": "Microprocessors", "time": "1:00-2:00", "room": "206"},
            {"subject": "VLSI Design", "time": "2:00-3:00", "room": "207"},
            {"subject": "Analog Electronics", "time": "3:00-4:00", "room": "201"},
            {"subject": "Digital Signal Processing", "time": "4:00-5:00", "room": "202"}
          ],
          "Thursday": [
            {"subject": "Control Systems", "time": "9:00-10:00", "room": "204"},
            {"subject": "Communication Systems", "time": "10:00-11:00", "room": "205"},
            {"subject": "Microprocessors", "time": "11:00-12:00", "room": "206"},
            {"subject": "VLSI Design", "time": "1:00-2:00", "room": "207"},
            {"subject": "Analog Electronics", "time": "2:00-3:00", "room": "201"},
            {"subject": "Digital Signal Processing", "time": "3:00-4:00", "room": "202"},
            {"subject": "Electromagnetic Fields", "time": "4:00-5:00", "room": "203"}
          ],
          "Friday": [
            {"subject": "Communication Systems", "time": "9:00-10:00", "room": "205"},
            {"subject": "Microprocessors", "time": "10:00-11:00", "room": "206"},
            {"subject": "VLSI Design", "time": "11:00-12:00", "room": "207"},
            {"subject": "Analog Electronics", "time": "1:00-2:00", "room": "201"},
            {"subject": "Digital Signal Processing", "time": "2:00-3:00", "room": "202"},
            {"subject": "Electromagnetic Fields", "time": "3:00-4:00", "room": "203"},
            {"subject": "Control Systems", "time": "4:00-5:00", "room": "204"}
          ]
        }
      },
]

export const additionalCourseData = [
  {
    _id: timetableId[4],
    facultyID: 303,
    courseName: "Artificial Intelligence Fundamentals",
    courseID: "AI101",
    description: "An introductory course to artificial intelligence covering basic concepts and algorithms.",
    startDate: "2024-09-15",
    endDate: "2024-11-15",
    totalSeats: 40,
    availableSeats: 40,
    day: ["Saturday"],
    venue: "Room F606",
    timing: "10:00-12:00",
    status: "Ongoing"
  },
  {
    _id: timetableId[5],
    facultyID: 404,
    courseName: "Cybersecurity Essentials",
    courseID: "CYB101",
    description: "A beginner-friendly course providing essential knowledge in cybersecurity.",
    startDate: "2024-10-01",
    endDate: "2024-12-01",
    totalSeats: 35,
    availableSeats: 35,
    day: ["Sunday"],
    venue: "Room G707",
    timing: "14:00-16:00",
    status: "Comming Soon!"
  },
  {
    _id: timetableId[6],
    facultyID: 505,
    courseName: "Introduction to Blockchain Technology",
    courseID: "BLK101",
    description: "An overview of blockchain technology and its applications.",
    startDate: "2024-11-15",
    endDate: "2025-01-15",
    totalSeats: 30,
    availableSeats: 30,
    day: ["Saturday"],
    venue: "Room H808",
    timing: "16:00-18:00",
    status: "Completed"
  },
  {
    _id: timetableId[7],
    facultyID: 606,
    courseName: "Mobile App Development",
    courseID: "MOB101",
    description: "A practical course on developing mobile applications for iOS and Android platforms.",
    startDate: "2024-12-01",
    endDate: "2025-02-01",
    totalSeats: 25,
    availableSeats: 25,
    day: ["Sunday"],
    venue: "Room I909",
    timing: "18:00-20:00",
    status: "Comming Soon!"
  },
  {
    _id: timetableId[8],
    facultyID: 707,
    courseName: "Advanced Data Analysis",
    courseID: "ADA201",
    description: "An advanced course covering various statistical and machine learning techniques for data analysis.",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    totalSeats: 35,
    availableSeats: 35,
    day: ["Saturday"],
    venue: "Room J1010",
    timing: "08:00-10:00",
    status: "Ongoing"
  },
  {
    _id: timetableId[9],
    facultyID: 808,
    courseName: "Cloud Computing Fundamentals",
    courseID: "CLOUD101",
    description: "An introductory course to cloud computing concepts and platforms.",
    startDate: "2025-02-01",
    endDate: "2025-04-01",
    totalSeats: 30,
    availableSeats: 30,
    day: ["Sunday"],
    venue: "Room K1111",
    timing: "14:00-16:00",
    status: "Comming Soon!"
  },
  // Add more dummy data entries if needed
];




// Get today's date
const today = new Date();

// Yesterday's date
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

// Day before yesterday's date
const dayBeforeYesterday = new Date(today);
dayBeforeYesterday.setDate(today.getDate() - 2);

// Two days before yesterday's date
const twoDaysBeforeYesterday = new Date(today);
twoDaysBeforeYesterday.setDate(today.getDate() - 3);

// Three days before yesterday's date
const threeDaysBeforeYesterday = new Date(today);
threeDaysBeforeYesterday.setDate(today.getDate() - 4);

// Four days before yesterday's date
const fourDaysBeforeYesterday = new Date(today);
fourDaysBeforeYesterday.setDate(today.getDate() - 5);

// Dummy data for today
const todayData = {
  _id: timetableId[10],
  staffID: 101,
  title: "Today's Announcement",
  description: "This is an announcement for today.",
  date: today,
  filePath: ["Screenshot (44).png"]
};

// Dummy data for yesterday
const yesterdayData = {
  _id: timetableId[11],
  staffID: 202,
  title: "Yesterday's Announcement",
  description: "This is an announcement from yesterday.",
  date: yesterday,
};

// Dummy data for the day before yesterday
const dayBeforeYesterdayData = {
  _id: timetableId[12],
  staffID: 303,
  title: "Day Before Yesterday's Announcement",
  description: "This is an announcement from the day before yesterday.",
  date: dayBeforeYesterday,
};

// Dummy data for two days before yesterday
const twoDaysBeforeYesterdayData = {
  _id: timetableId[13],
  staffID: 404,
  title: "Two Days Before Yesterday's Announcement",
  description: "This is an announcement from two days before yesterday.",
  date: twoDaysBeforeYesterday,
};

// Dummy data for three days before yesterday
const threeDaysBeforeYesterdayData = {
  _id: timetableId[14],
  staffID: 505,
  title: "Three Days Before Yesterday's Announcement",
  description: "This is an announcement from three days before yesterday.",
  date: threeDaysBeforeYesterday,
};

// Dummy data for four days before yesterday
const fourDaysBeforeYesterdayData = {
  _id: timetableId[15],
  staffID: 606,
  title: "Four Days Before Yesterday's Announcement",
  description: "This is an announcement from four days before yesterday.",
  date: fourDaysBeforeYesterday,
};

// Combine all dummy data
export const announcementData = [
  todayData,
  yesterdayData,
  dayBeforeYesterdayData,
  twoDaysBeforeYesterdayData,
  threeDaysBeforeYesterdayData,
  fourDaysBeforeYesterdayData
];

// Export dummy data


const facultyIDs = ["303", "404", "505", "606", "707", "808"];

export const faculties = [
    {
      _id: timetableId[16],
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@iiitg.ac.in",
        password: "password123",
        facultyID: facultyIDs[0],
        department: "Computer Science",
        yearOfJoining: 2018,
        releasedCourses: ["AI101"]
    },
    {
      _id: timetableId[17],
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@iiitg.ac.in",
        password: "password456",
        facultyID: facultyIDs[1],
        department: "Electrical Engineering",
        yearOfJoining: 2019,
        releasedCourses: ["CYB101"]
    },
    {
      _id: timetableId[18],
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@iiitg.ac.in",
        password: "password789",
        facultyID: facultyIDs[2],
        department: "Mathematics",
        yearOfJoining: 2020,
        releasedCourses: ["BLK101"]
    },
    {
      _id: timetableId[19],
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@iiitg.ac.in",
        password: "passwordabc",
        facultyID: facultyIDs[3],
        department: "Physics",
        yearOfJoining: 2017,
        releasedCourses: ["MOB101"]
    },
    {
      _id: timetableId[20],
        firstName: "Eve",
        lastName: "Wilson",
        email: "eve.wilson@iiitg.ac.in",
        password: "passwordefg",
        facultyID: facultyIDs[4],
        department: "Chemistry",
        yearOfJoining: 2016,
        releasedCourses: ["ADA201"]
    },
    {
      _id: timetableId[21],
        firstName: "Michael",
        lastName: "Davis",
        email: "michael.davis@iiitg.ac.in",
        password: "passwordxyz",
        facultyID: facultyIDs[5],
        department: "Biology",
        yearOfJoining: 2021,
        releasedCourses: ["CLOUD101"]
    }
];


