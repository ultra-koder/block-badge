import "./Badge.sol";
import "../../common/ErrorCodes.sol";
import "../../common/Util.sol";

/**
* Interface for Badge data contracts
*/
contract BadgeManager is ErrorCodes, Util {
  Badge[] badges;
  /*
    note on mapping to array index:
    a non existing mapping will return 0, so 0 should not be a valid value in a map,
    otherwise exists() will not work
  */
  mapping (bytes32 => uint) badgeNameToIdMap;

  /**
  * Constructor
  */
  function BadgeManager() {
    badges.length = 1; // see above note
  }

  function exists(string badgeName) returns (bool) {
    return badgeNameToIdMap[b32(badgeName)] != 0;
  }

  function getBadge(string badgeName) returns (address) {
    uint badgeId = badgeNameToIdMap[b32(badgeName)];
    return badges[badgeId];
  }

  function createBadge(string badgename, string courseName, string studentName, string providerName) returns (ErrorCodes) {
    // name must be < 32 bytes
    if (bytes(badgename).length > 32) return ErrorCodes.ERROR;
    // fail if badgename exists
    if (exists(badgename)) return ErrorCodes.EXISTS;
    // add badge
    uint badgeId = badges.length;
    badgeNameToIdMap[b32(badgename)] = userId;
    badges.push(new Badge(badgename, badgeId, courseName, studentName, providerName));
    return ErrorCodes.SUCCESS;
  }

}
