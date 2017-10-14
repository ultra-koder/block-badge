import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";

/**
 * Course data contract
 */
contract Course is ErrorCodes, Version {
  // NOTE: members must be public to be indexed for search
  string public name;
  uint public id;
  string public providerName;
  string courseURL;
  string imageURL;

  function Course(string _name, uint _id, string _provider, string _courseURL, string _imageURL) {
    name = _name;
    id = _id;
    providerName= _provider;
    courseURL= _courseURL;
    imageURL= _imageURL;
    version = 1;
  }
}
