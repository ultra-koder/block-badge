import "../../common/ErrorCodes.sol";
import "../../common/Version.sol";

/**
 * Course data contract
 */
contract Badge is ErrorCodes, Version {
  // NOTE: members must be public to be indexed for search
  string public badgeName;
  uint public id;
  string courseName;
  string studentName;
  string providerName;

  string issueDate;
  string expirationDate;
  string bakedImageURL;

  function Badge(string _name, uint _id, string _courseName, string _studentName, string _providerName) {
    badgeName = _name;
    id = _id;
    courseName= _courseName;
    studentName= _studentName;
    providerName= _providerName;
    version = 1;
  }
}
