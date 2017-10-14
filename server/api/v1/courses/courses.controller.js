const co = require('co');
const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const config = common.config;
const util = common.util;
const path = require('path');
const serverPath = './server';
const dappJs = require(`${path.join(process.cwd(), serverPath)}/dapp/dapp.js`);

const coursesController = {
  create: function(req, res) {
    const deploy = req.app.get('deploy');
    const courseArgs = req.body;

    co(function* () {
      const dapp = yield dappJs.setContract(deploy.admin, deploy.contract);
      const result = yield dapp.createCourse(courseArgs);
      util.response.status200(res, {
        course: result,
      });
    }).catch(err => {
      console.log('Create Course Error:', err);
      util.response.status500(res, 'Unable to create course');
    });
  },

  get: function(req, res) {
    const deploy = req.app.get('deploy');
    const courseName = decodeURIComponent(req.params['name']);

    co(function* () {
      const dapp = yield dappJs.setContract(deploy.admin, deploy.contract);
      const result = yield dapp.getCourse(courseName);
      util.response.status200(res, {
        course: result,
      });
    }).catch(err => {
      console.log('Get ProCourse Error:', err);
      util.response.status500(res, 'Cannot fetch course');
    });
  },

  list: function(req, res) {
    const deploy = req.app.get('deploy');

    let listCallback, listParam;
    switch (req.query['filter']) {
      case 'provider':
        listCallback = 'getCourseByProvider';
        listParam = req.query['provider'];
        break;
      default:
        listCallback = 'getCourses'
    }

    co(function* () {
      const dapp = yield dappJs.setContract(deploy.admin, deploy.contract);
      const courses = yield dapp[listCallback](listParam);
      util.response.status200(res, {
        courses: courses,
      });
    }).catch(err => {
      console.log('List Courses Error', err);
      util.response.status500(res, 'Error occurred while trying to list courses');
    });
  },

};

module.exports = coursesController;
