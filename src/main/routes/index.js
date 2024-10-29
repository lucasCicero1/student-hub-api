import healthCheck from "./health-check-route";
import createStudentRoute from "./create-student-route";
import listStudentsRoute from "./list-students-route";
import updateStudentRoute from "./update-student-route";

export default [
  healthCheck,
  createStudentRoute,
  listStudentsRoute,
  updateStudentRoute,
];
