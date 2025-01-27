import {
  getMentors,
  getTrainees,
  addMember,
  deleteMember,
  getMemberInfo,
} from "./members";
// Collection of courses and course details
import {
  getCourses,
  getCourseDetails,
  createNewCourse,
  createNewCollection,
  getCourseCollection,
  getCourseCollectionDetails,
  deleteCollection,
  updateCollection,
  removeCourseFromCollection,
  addCourseToCollection,
} from "./course";
// Trainees and mentors
import {
  getTarineeAggignedCollection,
  setStartCourse,
  markLessonAsComplete,
  getTraineeReport,
  getMiniFiedTraineeCollectionData,
  assignCourseCollection,
  deassignCourseCollection,
} from "./trainee";
// User
import { updateUserDetails } from "./user";

export {
  // Members
  getMentors,
  getTrainees,
  addMember,
  deleteMember,
  getMemberInfo,
  // Course
  getCourses,
  getCourseDetails,
  createNewCourse,
  createNewCollection,
  getCourseCollection,
  getCourseCollectionDetails,
  deleteCollection,
  updateCollection,
  removeCourseFromCollection,
  addCourseToCollection,
  // Trinee and mentors
  getTarineeAggignedCollection,
  setStartCourse,
  markLessonAsComplete,
  getTraineeReport,
  getMiniFiedTraineeCollectionData,
  assignCourseCollection,
  deassignCourseCollection,
  // User
  updateUserDetails,
};
