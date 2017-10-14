import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";
import "./UserRole.sol";
import "./User.sol";
import "./Badge.sol";

/**
 * Consumer data contract
 */
contract Student is User, ErrorCodes, Version, UserRole {
  Badge[] studentBadges;
  Consumer[] authorizedConsumers;
  /*
    note on mapping to array index:
    a non existing mapping will return 0, so 0 should not be a valid value in a map,
    otherwise exists() will not work
  */
  mapping (bytes32 => uint) badgetoIdMap;
  mapping (bytes32 => uint) consumertoIdMap;

  function Student(address _account, string _username, bytes32 _pwHash, uint _id, string _URL)
   User(_account, _username, _pwHash, _id, UserRole.STUDENT) {
    studentBadges.length= 1;
    authorizedConsumers.length= 1;
  }

  function createStudent(address account, string username, bytes32 pwHash) returns (ErrorCodes) {
      return(createUser(account, username, pwHash, UserRole.STUDENT));
  }

  function hasBadge(string badgename) returns (bool) {
    return badgetoIdMap[b32(badgename)] != 0;
  }

  function getBadge(string badgename) returns (address) {
    uint badgeId = badgetoIdMap[b32(badgename)];
    return studentBadges[badgeId];
  }

  function addBadge(Badge badge) returns (ErrorCodes) {
    // fail if badgename exists
    if (hasBadge(badge.badgeName)) return ErrorCodes.EXISTS;
    // add badge
    uint badgeId = studentBadges.length;
    badgetoIdMap[b32(badge.badgeName)] = badgeId;
    studentBadges.push(badge));
    return ErrorCodes.SUCCESS;
  }

  function isAuthorized(string consumerName) returns (bool) {
    return consumertoIdMap[b32(badgename)] != 0;
  }

  function getAuthorizedConsumer(string cousernamensumername) returns (address) {
    uint consumerId = consumertoIdMap[b32(consumername)];
    return authorizedConsumers[consumerId];
  }

  function authorizeConsumer(Consumer consumer) returns (ErrorCodes) {
    // return if consumername exists
    if (isAuthorized(consumer.username)) return ErrorCodes.SUCCESS;  // already authorized
    // add consumer
    uint consumerId = authorizedConsumers.length;
    consumertoIdMap[b32(consumer.username)] = consumerId;
    authorizedConsumers.push(consumer));
    return ErrorCodes.SUCCESS;
  }

}
