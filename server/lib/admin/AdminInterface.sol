import "../user/contracts/UserManager.sol";
import "../badge/contracts/BadgeManager.sol";
import "../course/contracts/CourseManager.sol";

/**
  * Interface to global contracts
*/
contract AdminInterface {
  // NOTE: variable name must match contract name
  UserManager public userManager;
  BadgeManager public badgeManager;
  CourseManager public courseManager;

  /**
    * Constructor. Initialize global contracts and pointers
  */
  function AdminInterface() {
    userManager = new UserManager();
    badgeManager = new BadgeManager();
    courseManager = new CourseManager();
  }
}
