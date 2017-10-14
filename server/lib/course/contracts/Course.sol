import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";

/**
 * Course data contract
 */
contract Course is ErrorCodes, Version {
  // NOTE: members must be public to be indexed for search
  string public name;
  uint public id;
  address public providerID = 0x1234;
  string courseURL;
  string imageURL;

  function Course(string _name, uint _id, address _providerID, string _courseURL, string _imageURL) {
    name = _name;
    id = _id;
    providerID= _providerID;
    courseURL= _courseURL;
    imageURL= _imageURL;
    version = 1;
  }
}
