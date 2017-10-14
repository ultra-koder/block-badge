import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";
import "./UserRole.sol";
import "./User.sol";
import "./Badge.sol";
import "./Course.sol";

/**
 * Provider data contract
 */
contract Provider is User, ErrorCodes, Version, UserRole {
  string public URL;
  Badge[] issuedBadges;
  mapping (bytes32 => uint) badgetoIdMap;

  Course[] offeredCourses;
  mapping (bytes32 => uint) coursetoIdMap;

  function Provider(address _account, string _username, bytes32 _pwHash, uint _id, string _URL)
   User(_account, _username, _pwHash, _id, UserRole.PROVIDER) {
    URL= _URL;
    issuedBadges.length = 1;
    offeredCourses.length= 1;
  }

  function createProvider(address account, string username, bytes32 pwHash, string URL) returns (ErrorCodes) {
    URL= url;
    return(createUser(account, username, pwHash, UserRole.PROVIDER));
  }

// Badges

  function getBadge(string badgename) returns (address) {
    uint badgeId = badgetoIdMap[b32(badgename)];
    return issuedBadges[badgeId];
  }

  function addBadge(Badge badge) returns (ErrorCodes) {
    // add badge
    uint badgeId = issuedBadges.length;
    badgetoIdMap[b32(badge.badgeName)] = badgeId;
    issuedBadges.push(badge));
    return ErrorCodes.SUCCESS;
  }

// Courses

  function hasCourse(string coursename) returns (bool) {
    return offeredCourses[b32(coursename)] != 0;
  }

  function getCourse(string coursename) returns (address) {
    uint courseId = offeredCourses[b32(coursename)];
    return offeredCourses[courseId];
  }

  function addCourse(Course course) returns (ErrorCodes) {
    // fail if coursename exists
    if (hasCoourse(course.name)) return ErrorCodes.EXISTS;
    // add course
    uint courseId = offeredCourses.length;
    offeredCourses[b32(course.name))] = courseId;
    offeredCourses.push(course));
    return ErrorCodes.SUCCESS;
  }


}
