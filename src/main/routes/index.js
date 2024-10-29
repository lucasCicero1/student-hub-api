import healthCheck from "./health-check-route";
import createStudentRoute from "./create-student-route";
import listStudentsRoute from "./list-students-route";
import updateStudentRoute from "./update-student-route";
import deleteStudentRoute from "./delete-student-route";

export default [
  healthCheck,
  createStudentRoute,
  listStudentsRoute,
  updateStudentRoute,
  deleteStudentRoute,
];
