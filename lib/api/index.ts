//App
import { markNotificationAsRead, markAllNotificationAsRead } from "./app";
// Dashboard
import { getDashboardReport } from "./dashboard";
// Members
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
  setDefaultCollection,
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
  // App
  markNotificationAsRead,
  markAllNotificationAsRead,
  // Dashboard
  getDashboardReport,
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
  setDefaultCollection,
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
