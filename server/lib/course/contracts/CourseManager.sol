import "./Course.sol";
import "../../common/ErrorCodes.sol";
import "../../common/Util.sol";

/**
* Interface for Course data contracts
*/
contract CourseManager is ErrorCodes, Util {
  Course[] courses;
  /*
    note on mapping to array index:
    a non existing mapping will return 0, so 0 should not be a valid value in a map,
    otherwise exists() will not work
  */
  mapping (bytes32 => uint) courseNameToIdMap;

  /**
  * Constructor
  */
  function CourseManager() {
    courses.length = 1; // see above note
  }

  function exists(string coursename) returns (bool) {
    return courseNameToIdMap[b32(coursename)] != 0;
  }

  function getCourse(string coursename) returns (address) {
    uint courseId = courseNameToIdMap[b32(coursename)];
    return courses[courseId];
  }

  function createCourse(string _name, uint _id, string _provider, string _courseURL, string _imageURL) returns (ErrorCodes) {
    // name must be < 32 bytes
    if (bytes(_name).length > 32) return ErrorCodes.ERROR;
    // fail if name exists
    if (exists(_name)) return ErrorCodes.EXISTS;
    // add course
    uint courseId = courses.length;
    courseNameToIdMap[b32(_name)] = _id;
    courses.push(new Course(_name, _id, _provider, _courseURL, _imageURL));
    return ErrorCodes.SUCCESS;
  }

}
