import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";
import "./UserRole.sol";
import "./User.sol";

/**
 * Consumer data contract
 */
contract Student is User, ErrorCodes, Version, UserRole {

  function Consumer(address _account, string _username, bytes32 _pwHash, uint _id, string _URL)
   User(_account, _username, _pwHash, _id, UserRole.STUDENT) {

  }

  function createStudent(address account, string username, bytes32 pwHash) returns (ErrorCodes) {
      return(createUser(account, username, pwHash, UserRole.STUDENT));
  }

}
