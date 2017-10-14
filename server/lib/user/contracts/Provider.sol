import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";
import "./UserRole.sol";
import "./User.sol";

/**
 * Provider data contract
 */
contract Provider is User, ErrorCodes, Version, UserRole {
  string public URL;

  function Provider(address _account, string _username, bytes32 _pwHash, uint _id, string _URL)
   User(_account, _username, _pwHash, _id, UserRole.PROVIDER) {
    URL= _URL;
  }

  function createProvider(address account, string username, bytes32 pwHash, string URL) returns (ErrorCodes) {
    URL= url;
    return(createUser(account, username, pwHash, UserRole.PROVIDER));
  }


}
