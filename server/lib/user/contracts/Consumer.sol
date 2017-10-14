import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";
import "./UserRole.sol";
import "./User.sol";

/**
 * Consumer data contract
 */
contract Consumer is User, ErrorCodes, Version, UserRole {
  string public URL;

  function Consumer(address _account, string _username, bytes32 _pwHash, uint _id, string _URL)
   User(_account, _username, _pwHash, _id, UserRole.CONSUMER) {
    URL= _URL;
  }

  function createConsumer(address account, string username, bytes32 pwHash, string url) returns (ErrorCodes) {
    URL= url;
    return(createUser(account, username, pwHash, UserRole.CONSUMER));
  }

}
