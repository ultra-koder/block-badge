const ba = require('blockapps-rest');
const rest = ba.rest;
const util = ba.common.util;
const config = ba.common.config;
const Promise = ba.common.Promise;

const userManagerJs = require(process.cwd() + '/' + config.libPath + '/user/userManager');
const courseManagerJs = require(process.cwd() + '/' + config.libPath + '/course/courseManager');
const badgeManagerJs = require(process.cwd() + '/' + config.libPath + '/badge/badgeManager');

const ErrorCodes = ba.rest.getEnums(`${config.libPath}/common/ErrorCodes.sol`).ErrorCodes;

const contractName = 'AdminInterface';
const contractFilename = '/admin/AdminInterface.sol';
const subContractsNames = ['userManager', 'courseManager', 'badgeManager'];

function* uploadContract(admin, libPath) {
  const contract = yield rest.uploadContract(admin, contractName, libPath + contractFilename);
  contract.src = 'removed';
  yield compileSearch();
  return yield setContract(admin, contract);
}

function* compileSearch() {
  yield userManagerJs.compileSearch();
  yield courseManagerJs.compileSearch();
  yield badgeManagerJs.compileSearch();
}

function* getSubContracts(contract) {
  rest.verbose('getSubContracts', {contract, subContractsNames});
  const state = yield rest.getState(contract);
  const subContracts = {}
  subContractsNames.map(name => {
    const address = state[name];
    if (address === undefined || address == 0) throw new Error('Sub contract address not found ' + name);
    subContracts[name] = {
      name: name[0].toUpperCase() + name.substring(1),
      address: address,
    }
  });
  return subContracts;
}

function* setContract(admin, contract) {
  rest.verbose('setContract', {admin, contract});
  // set the managers
  const subContarcts = yield getSubContracts(contract);
  const userManager = userManagerJs.setContract(admin, subContarcts['userManager']);
  const courseManager = courseManagerJs.setContract(admin, subContarcts['courseManager']);

  contract.getUser = function* (username) {
    rest.verbose('dapp: getUser', username);
    return yield userManager.getUser(username);
  }

  contract.getUsers = function* () {
    rest.verbose('dapp: getUsers');
    return yield userManager.getUsers();
  }

  contract.getBalance = function* (username) {
    rest.verbose('dapp: getBalance', username);
    return yield userManager.getBalance(username);
  }

  // login
  contract.login = function* (username, password) {
    return yield login(userManager, username, password);
  }
  // deploy
  contract.deploy = function* (dataFilename, deployFilename) {
    return yield deploy(admin, contract, userManager, dataFilename, deployFilename);
  }

  function* createCourse(courseManager, args) {
    rest.verbose('dapp: createCourse', {args});
    args.created = + new Date();
    const course = yield courseManager.createCourse(args);
    return course;
  }

  // course by name
  contract.getCourse = function* (name) {
    rest.verbose('dapp: getCourse', name);
    return yield courseManager.getCourse(name);
  }
  // course - by provider
  contract.getCourseByProvider = function* (provider) {
    rest.verbose('dapp: getCourseByProvider', provider);
    return yield courseManager.getCourseByProvider(provider);
  }
  contract.getCourses = function* () {
    rest.verbose('dapp: getCourses');
    return yield courseManager.getCourses();
  }

  return contract;
}

// =========================== business functions ========================

function* login(userManager, username, password) {
  rest.verbose('dapp: login', {username, password});
  const args = {username:username, password:password};
  const result = yield userManager.login(args);
  // auth failed
  if (!result) {
    return {authenticate: false};
  }
  // auth OK
  const baUser = yield userManager.getUser(username);
  return {authenticate: true, user: baUser};
}


function* createPresetUsers(userManager, presetUsers) {
  const UserRole = rest.getEnums(`${config.libPath}/user/contracts/UserRole.sol`).UserRole;
  const users = [];
  for (let presetUser of presetUsers) {
    const args = {
      username: presetUser.username,
      password: presetUser.password,
      role: UserRole[presetUser.role],
    }
    const user = yield userManager.createUser(args);
    users.push(user);
  }
  return users;
}

function* deploy(admin, contract, userManager, presetDataFilename, deployFilename) {
  rest.verbose('dapp: deploy', {presetDataFilename, deployFilename});
  const fsutil = ba.common.fsutil;

  const presetData = fsutil.yamlSafeLoadSync(presetDataFilename);
  if (presetData === undefined) throw new Error('Preset data read failed ' + presetDataFilename);
  console.log('Preset data', JSON.stringify(presetData, null, 2));

  // create preset users
  const users = yield createPresetUsers(userManager, presetData.users);   // TODO test the users are all in

  const deployment = {
    url: config.getBlocUrl(),
    admin: admin,
    contract: {
      name: contract.name,
      address: contract.address,
    },
    users: presetData.users,
  };
  // write
  console.log('deploy filename:', deployFilename);
  console.log(fsutil.yamlSafeDumpSync(deployment));

  fsutil.yamlWrite(deployment, deployFilename);
  return deployment;
}

module.exports = {
  setContract: setContract,
  compileSearch: compileSearch,
  uploadContract: uploadContract,
};
