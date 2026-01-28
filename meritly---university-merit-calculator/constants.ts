
import { University } from './types';

export const ENTRY_TESTS = [
  { id: 'mdcat', name: 'MDCAT', total: 180, category: 'Medical' },
  { id: 'ecat', name: 'ECAT', total: 400, category: 'Engineering' },
  { id: 'net', name: 'NET (NUST)', total: 200, category: 'Engineering/CS' },
  { id: 'usat', name: 'USAT (HEC)', total: 100, category: 'General' },
  { id: 'sat', name: 'SAT', total: 1600, category: 'International' },
  { id: 'hat', name: 'HAT', total: 100, category: 'General' },
  { id: 'custom', name: 'Other / Custom', total: 100, category: 'N/A' }
];

export const UNIVERSITIES: University[] = [
  // --- MAJOR MEDICAL INSTITUTIONS ---
  {
    id: 'aku',
    name: 'Aga Khan University Medical College',
    abbreviation: 'AKU',
    city: 'Karachi',
    programs: [{ id: 'aku-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 92.5 }]
  },
  {
    id: 'kemu',
    name: 'King Edward Medical University',
    abbreviation: 'KEMU',
    city: 'Lahore',
    programs: [{ id: 'ke-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 93.4 }]
  },
  {
    id: 'duhs',
    name: 'Dow University of Health Sciences',
    abbreviation: 'DUHS',
    city: 'Karachi',
    programs: [
      { id: 'duhs-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 89.2 },
      { id: 'duhs-bds', name: 'BDS', category: 'BDS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 85.1 }
    ]
  },
  {
    id: 'uhs',
    name: 'University of Health Sciences',
    abbreviation: 'UHS',
    city: 'Lahore',
    programs: [{ id: 'uhs-mbbs', name: 'MBBS (Centralized)', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 91.5 }]
  },
  {
    id: 'szabmu',
    name: 'Shaheed Zulfiqar Ali Bhutto Medical University',
    abbreviation: 'SZABMU',
    city: 'Islamabad',
    programs: [{ id: 'sz-mbbs', name: 'MBBS (FMDC)', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 91.2 }]
  },
  {
    id: 'nums',
    name: 'National University of Medical Sciences',
    abbreviation: 'NUMS',
    city: 'Rawalpindi',
    programs: [{ id: 'amc-mbbs', name: 'Army Medical College (MBBS)', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 92.1 }]
  },

  // --- PUBLIC SECTOR MEDICAL COLLEGES ---
  { id: 'aimc', name: 'Allama Iqbal Medical College', abbreviation: 'AIMC', city: 'Lahore', programs: [{ id: 'ai-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 91.8 }] },
  { id: 'fjmu', name: 'Fatima Jinnah Medical University', abbreviation: 'FJMU', city: 'Lahore', programs: [{ id: 'fj-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 90.4 }] },
  { id: 'rmu', name: 'Rawalpindi Medical University', abbreviation: 'RMU', city: 'Rawalpindi', programs: [{ id: 'rm-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 90.1 }] },
  { id: 'nishtar', name: 'Nishtar Medical College', abbreviation: 'NMC', city: 'Multan', programs: [{ id: 'ni-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 90.3 }] },
  { id: 'qamc', name: 'Quaid-e-Azam Medical College', abbreviation: 'QAMC', city: 'Bahawalpur', programs: [{ id: 'qa-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 89.8 }] },
  { id: 'smc-sgd', name: 'Sargodha Medical College', abbreviation: 'SMC', city: 'Sargodha', programs: [{ id: 'smc-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 89.2 }] },
  { id: 'szmc', name: 'Sheikh Zayed Medical College', abbreviation: 'SZMC', city: 'Rahim Yar Khan', programs: [{ id: 'sz-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 89.1 }] },
  { id: 'sims', name: 'Services Institute of Medical Sciences', abbreviation: 'SIMS', city: 'Lahore', programs: [{ id: 'sims-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 91.2 }] },
  { id: 'amc-abbott', name: 'Ayub Medical College', abbreviation: 'AMC', city: 'Abbottabad', programs: [{ id: 'amc-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 87.5 }] },
  { id: 'smc-swat', name: 'Saidu Medical College', abbreviation: 'SMC', city: 'Swat', programs: [{ id: 'sa-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 86.2 }] },
  { id: 'bkmc', name: 'Bacha Khan Medical College', abbreviation: 'BKMC', city: 'Mardan', programs: [{ id: 'bk-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 87.1 }] },
  { id: 'bmc-bannu', name: 'Bannu Medical College', abbreviation: 'BMC', city: 'Bannu', programs: [{ id: 'bn-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 85.8 }] },
  { id: 'gmc', name: 'Gomal Medical College', abbreviation: 'GMC', city: 'D. I. Khan', programs: [{ id: 'go-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 85.5 }] },
  { id: 'kgmc', name: 'Khyber Girls Medical College', abbreviation: 'KGMC', city: 'Peshawar', programs: [{ id: 'kg-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 88.0 }] },

  // --- PRIVATE MEDICAL COLLEGES ---
  { id: 'shifa', name: 'Shifa College of Medicine', abbreviation: 'Shifa', city: 'Islamabad', programs: [{ id: 'sh-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 88.5 }] },
  { id: 'fmh', name: 'FMH College of Medicine & Dentistry', abbreviation: 'FMH', city: 'Lahore', programs: [{ id: 'fmh-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 83.2 }] },
  { id: 'shalamar', name: 'Shalamar Medical & Dental College', abbreviation: 'SMDC', city: 'Lahore', programs: [{ id: 'sl-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 82.5 }] },
  { id: 'lmdc', name: 'Lahore Medical & Dental College', abbreviation: 'LMDC', city: 'Lahore', programs: [{ id: 'lm-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 81.5 }] },
  { id: 'cmh-lhr', name: 'CMH Lahore Medical College', abbreviation: 'CMH LHR', city: 'Lahore', programs: [{ id: 'cmh-mbbs', name: 'MBBS', category: 'MBBS', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 87.2 }] },

  // --- ENGINEERING & TECHNOLOGY ---
  {
    id: 'nust',
    name: 'National University of Sciences and Technology',
    abbreviation: 'NUST',
    city: 'Islamabad',
    programs: [
      { id: 'ns-cs', name: 'Computer Science', category: 'Computer Science', weightage: { matric: 10, hssc: 15, test: 75 }, lastYearMerit: 78.5 },
      { id: 'ns-se', name: 'Software Engineering', category: 'Software Engineering', weightage: { matric: 10, hssc: 15, test: 75 }, lastYearMerit: 77.8 },
      { id: 'ns-ai', name: 'Artificial Intelligence', category: 'Artificial Intelligence', weightage: { matric: 10, hssc: 15, test: 75 }, lastYearMerit: 77.2 }
    ]
  },
  {
    id: 'fast',
    name: 'National University of Computer and Emerging Sciences',
    abbreviation: 'FAST-NUCES',
    city: 'National',
    programs: [
      { id: 'fs-cs', name: 'Computer Science', category: 'Computer Science', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 74.5 },
      { id: 'fs-se', name: 'Software Engineering', category: 'Software Engineering', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 73.8 }
    ]
  },
  { id: 'giki', name: 'Ghulam Ishaq Khan Institute', abbreviation: 'GIKI', city: 'Topi', programs: [{ id: 'gk-me', name: 'Mechanical Engineering', category: 'Mechanical Engineering', weightage: { matric: 5, hssc: 10, test: 85 }, lastYearMerit: 68.5 }] },
  { id: 'uet-lhr', name: 'University of Engineering and Technology', abbreviation: 'UET LHR', city: 'Lahore', programs: [{ id: 'uet-ee', name: 'Electrical Engineering', category: 'Electrical Engineering', weightage: { matric: 25, hssc: 45, test: 30 }, lastYearMerit: 72.4 }] },
  { id: 'pieas', name: 'Pakistan Institute of Engineering and Applied Sciences', abbreviation: 'PIEAS', city: 'Islamabad', programs: [{ id: 'pi-ee', name: 'Electrical Engineering', category: 'Electrical Engineering', weightage: { matric: 15, hssc: 25, test: 60 }, lastYearMerit: 71.2 }] },
  { id: 'ist', name: 'Institute of Space Technology', abbreviation: 'IST', city: 'Islamabad', programs: [{ id: 'ist-ae', name: 'Aerospace Engineering', category: 'Aerospace Engineering', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 65.5 }] },
  
  // --- GENERAL & BUSINESS ---
  { id: 'lums', name: 'Lahore University of Management Sciences', abbreviation: 'LUMS', city: 'Lahore', programs: [{ id: 'lu-ba', name: 'Business Administration', category: 'Business Administration', weightage: { matric: 10, hssc: 20, test: 70 }, lastYearMerit: 84.5 }] },
  { id: 'iba-khi', name: 'Institute of Business Administration', abbreviation: 'IBA', city: 'Karachi', programs: [{ id: 'iba-acc', name: 'Accounting & Finance', category: 'Accounting & Finance', weightage: { matric: 15, hssc: 15, test: 70 }, lastYearMerit: 81.2 }] },
  { id: 'qau', name: 'Quaid-i-Azam University', abbreviation: 'QAU', city: 'Islamabad', programs: [{ id: 'qa-law', name: 'Law (LLB)', category: 'Law (LLB)', weightage: { matric: 20, hssc: 30, test: 50 }, lastYearMerit: 78.5 }] },
  { id: 'uop', name: 'University of Peshawar', abbreviation: 'UoP', city: 'Peshawar', programs: [{ id: 'up-ir', name: 'International Relations', category: 'International Relations', weightage: { matric: 10, hssc: 90, test: 0 }, lastYearMerit: 62.4 }] },
  { id: 'pucit', name: 'Punjab University College of IT', abbreviation: 'PUCIT', city: 'Lahore', programs: [{ id: 'pu-it', name: 'Information Technology', category: 'Information Technology', weightage: { matric: 25, hssc: 75, test: 0 }, lastYearMerit: 88.5 }] },
  { id: 'dow-dpt', name: 'Dow University of Health Sciences (DPT)', abbreviation: 'DUHS-DPT', city: 'Karachi', programs: [{ id: 'du-dpt', name: 'Physiotherapy (DPT)', category: 'Physiotherapy (DPT)', weightage: { matric: 10, hssc: 40, test: 50 }, lastYearMerit: 78.5 }] }
];

export const CATEGORIES = [
  'All', 
  'MBBS',
  'BDS',
  'Nursing',
  'Computer Science', 
  'Software Engineering',
  'Artificial Intelligence',
  'Data Science',
  'Cyber Security',
  'Information Technology',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Mechatronics Engineering',
  'Aerospace Engineering',
  'Biomedical Engineering',
  'Architecture',
  'Business Administration',
  'Accounting & Finance',
  'Economics',
  'Law (LLB)',
  'Psychology',
  'International Relations',
  'Media Studies',
  'Pharm-D',
  'Physiotherapy (DPT)',
  'Biotechnology',
  'English Literature',
  'Fashion Design',
  'Fine Arts',
  'Mass Communication'
];
