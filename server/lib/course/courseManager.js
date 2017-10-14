const ba = require('blockapps-rest');
const rest = ba.rest;
const util = ba.common.util;
const config = ba.common.config;

const contractName = 'CourseManager';
const contractFilename = `${config.libPath}/course/contracts/CourseManager.sol`;
const courseContractName = require('./course').contractName;

const ErrorCodes = rest.getEnums(`${config.libPath}/common/ErrorCodes.sol`).ErrorCodes;

function* uploadContract(admin, args) {
  const contract = yield rest.uploadContract(admin, contractName, contractFilename, args);
  yield compileSearch();
  contract.src = 'removed';
  return setContract(admin, contract);
}

function setContract(admin, contract) {
  contract.getState = function* () {
    return yield rest.getState(contract);
  }
  contract.createCourse = function* (args) {
    return yield createCourse(admin, contract, args);
  }
  contract.getCourse = function* (name) {
    return yield getCourse(admin, contract, name);
  }
  contract.getCourses = function* (name) {
    return yield getCourses(contract);
  }
  contract.getCourseByProvider = function* (provider) {
    return yield getCourseByProvider(contract, provider);
  }

  return contract;
}

function* compileSearch() {
  rest.verbose('compileSearch', contractName);
  if (yield rest.isCompiled(contractName)) {
    return;
  }
  const searchable = [contractName];
  yield rest.compileSearch(searchable, contractName, contractFilename);
}

// throws: ErrorCodes
// returns: record from search
function* createCourse(admin, contract, args) {
  rest.verbose('createCourse', {admin, args});
  const method = 'createCourse';

  const result = yield rest.callMethod(admin, contract, method, args);
  const errorCode = parseInt(result[0]);
  if (errorCode != ErrorCodes.SUCCESS) {
    throw new Error(errorCode);
  }
  // get the contract data from search
  const course = yield getCourse(admin, contract, args.name);
  return course;
}

function* getCourse(admin, contract, name) {
  rest.verbose('getCourse', name);

  const method = 'getCourse';
  const args = {
    name: name,
  };

  // returns address
  const address = (yield rest.callMethod(admin, contract, method, args))[0];
  // if not found - throw
  if (address == 0) {
    throw new Error(ErrorCodes.NOT_FOUND);
  }
  // found - query for the full record
  const course = (yield rest.waitQuery(`${courseContractName}?address=eq.${address}`, 1))[0];
  return course;
}

function* getCourses(contract) {
  rest.verbose('getCourses');
  const state = yield rest.getState(contract);
  const courses = state.courses.slice(1); // remove the first '0000' course
  const csv = util.toCsv(courses); // generate csv string
  const results = yield rest.query(`${courseContractName}?address=in.${csv}`);
  return results;
}

function* getCourseByProvider(contract, provider) {
  rest.verbose('getCourseByProvider', provider);
  const courses = yield getCoures(contract);
  const filtered = courses.filter(function(course) {
    return course.provider === provider;
  });
  return filtered;
}



module.exports = {
  compileSearch: compileSearch,
  uploadContract: uploadContract,
  setContract: setContract,
  // constants
  contractName: contractName,
};
