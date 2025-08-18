export type School = {
  name: string;
  shortName: string;
  mascot: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  conference: string;
};

export const schools: School[] = [
  {
    name: "University of Washington",
    shortName: "Washington",
    mascot: "Huskies",
    logo: "/Jonah_Washington.webp", // Using existing athlete photo as placeholder
    colors: {
      primary: "from-purple-600",
      secondary: "to-blue-600",
      accent: "purple"
    },
    conference: "Big Ten"
  },
  {
    name: "Notre Dame",
    shortName: "Notre Dame",
    mascot: "Fighting Irish",
    logo: "/IMG_8057.webp", // Using existing athlete photo as placeholder
    colors: {
      primary: "from-blue-600",
      secondary: "to-yellow-500",
      accent: "blue"
    },
    conference: "Independent"
  },
  {
    name: "UCLA",
    shortName: "UCLA",
    mascot: "Bruins",
    logo: "/IMG_5310.webp", // Using existing athlete photo as placeholder
    colors: {
      primary: "from-blue-600",
      secondary: "to-yellow-500",
      accent: "blue"
    },
    conference: "Big Ten"
  },
  {
    name: "Cal",
    shortName: "Cal",
    mascot: "Golden Bears",
    logo: "/Image-1.webp", // Using existing athlete photo as placeholder
    colors: {
      primary: "from-blue-600",
      secondary: "to-yellow-500",
      accent: "blue"
    },
    conference: "ACC"
  },
  {
    name: "USC",
    shortName: "USC",
    mascot: "Trojans",
    logo: "/IMG_8057.webp", // Using existing athlete photo as placeholder
    colors: {
      primary: "from-red-600",
      secondary: "to-yellow-500",
      accent: "red"
    },
    conference: "Big Ten"
  },
  {
    name: "Fresno State",
    shortName: "Fresno State",
    mascot: "Bulldogs",
    logo: "/IMG_4305_dcdcea1a-a3ad-4712-9bc5-13f84f6380a9.webp",
    colors: {
      primary: "from-blue-600",
      secondary: "to-red-600",
      accent: "blue"
    },
    conference: "Mountain West"
  },
  {
    name: "Arizona State University",
    shortName: "Arizona State",
    mascot: "Sun Devils",
    logo: "/IMG_4472.webp",
    colors: {
      primary: "from-red-600",
      secondary: "to-yellow-500",
      accent: "red"
    },
    conference: "Big 12"
  },
  {
    name: "Oregon State University",
    shortName: "Oregon State",
    mascot: "Beavers",
    logo: "/IMG_8057.webp",
    colors: {
      primary: "from-orange-600",
      secondary: "to-black",
      accent: "orange"
    },
    conference: "Pac-12"
  },
  {
    name: "University of Arizona",
    shortName: "Arizona",
    mascot: "Wildcats",
    logo: "/IMG_8057.webp",
    colors: {
      primary: "from-red-600",
      secondary: "to-blue-600",
      accent: "red"
    },
    conference: "Big 12"
  },
  {
    name: "BYU",
    shortName: "BYU",
    mascot: "Cougars",
    logo: "/IMG_8057.webp",
    colors: {
      primary: "from-blue-600",
      secondary: "to-white",
      accent: "blue"
    },
    conference: "Big 12"
  },
  {
    name: "Auburn",
    shortName: "Auburn",
    mascot: "Tigers",
    logo: "/IMG_8057.webp",
    colors: {
      primary: "from-orange-600",
      secondary: "to-blue-600",
      accent: "orange"
    },
    conference: "SEC"
  },
  {
    name: "Portland State University",
    shortName: "Portland State",
    mascot: "Vikings",
    logo: "/IMG_8057.webp",
    colors: {
      primary: "from-green-600",
      secondary: "to-white",
      accent: "green"
    },
    conference: "Big Sky"
  },
  {
    name: "Nevada",
    shortName: "Nevada",
    mascot: "Wolf Pack",
    logo: "/IMG_8057.webp",
    colors: {
      primary: "from-blue-600",
      secondary: "to-silver-500",
      accent: "blue"
    },
    conference: "Mountain West"
  }
];

// Helper function to get school by name
export const getSchoolByName = (schoolName: string): School | undefined => {
  return schools.find(school => 
    school.name.toLowerCase() === schoolName.toLowerCase() ||
    school.shortName.toLowerCase() === schoolName.toLowerCase()
  );
};

// Helper function to get all schools
export const getAllSchools = (): School[] => {
  return schools;
};
