//App
import { markNotificationAsRead, markAllNotificationAsRead } from "./app";
// Dashboard
import {
  getDashboardReport,
  getDashboardCourseCollectionStatus,
} from "./dashboard";
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
  deleteCourse,
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
  unmarkLessonAsComplete,
  getTraineeReport,
  getMiniFiedTraineeCollectionData,
  assignCourseCollection,
  deassignCourseCollection,
} from "./trainee";
// User
import { updateUserDetails } from "./user";
// Profile
import {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
} from "./profile";
// forgot-password
import { sendResetEmail, verifyOTP, resetPassword } from "./forgot-password";
// Examination
import {
  scheduleExam,
  getScheduledExam,
  getExamDetails,
  cancelScheduledExam,
  updateExam,
} from "./examination";

export {
  // App
  markNotificationAsRead,
  markAllNotificationAsRead,
  // Dashboard
  getDashboardReport,
  getDashboardCourseCollectionStatus,
  // Members
  getMentors,
  getTrainees,
  addMember,
  deleteMember,
  getMemberInfo,
  // Course
  getCourses,
  getCourseDetails,
  deleteCourse,
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
  unmarkLessonAsComplete,
  getTraineeReport,
  getMiniFiedTraineeCollectionData,
  assignCourseCollection,
  deassignCourseCollection,
  // User
  updateUserDetails,
  // Profile
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
  // forgot-password
  sendResetEmail,
  verifyOTP,
  resetPassword,
  // Examination
  scheduleExam,
  getScheduledExam,
  getExamDetails,
  cancelScheduledExam,
  updateExam,
};
