import gulp from 'gulp'
import gutil from 'gulp-util'
import _ from 'lodash'
import through from 'through'
import mergeStream from 'merge-stream'

const options = {}

export function config(path, value) {
  if (value) {
    return _.set(options, path, value)
  }
  return _.get(options, path)
}

export const DEV_MODE = 'devMode'

export function pipeTimer(taskname = 'some task') {
  const startTime = new Date()

  function start() {
  }

  function end() {
    if (gulp.config(DEV_MODE)) {
      this.on('end', ()=> {
        const time = new Date() - startTime
        gutil.log('Watcher:',
          '\'' + gutil.colors.cyan(taskname) + '\'',
          're-bundle after',
          gutil.colors.magenta(time > 1000 ? time / 1000 + ' s' : time + ' ms'))
      })
    }
    this.queue(null)
  }

  return through(start, end)
}

export function autoRegister(TASK_NAME, bundleFn, devModelFn) {
  let conf = gulp.config(['tasks', TASK_NAME])

  conf = conf.index || conf;
  conf = conf.default || conf;

  if (_.isFunction(conf)) {
    conf = conf();
  }

  function register(commonOptions, combinedConfig) {
    let combinedConf = combinedConfig;

    if (_.isObject(combinedConf)) {
      combinedConf.options = _.merge({}, commonOptions, combinedConf.options)
    } else {
      combinedConf = commonOptions
    }

    if (_.isFunction(devModelFn) && gulp.config(DEV_MODE)) {
      devModelFn(combinedConf)
    }

    return bundleFn(combinedConf)
  }

  if (_.isEmpty(conf)) {
    throw new gutil.PluginError(TASK_NAME, 'missing configure')
  }

  if (conf.files && _.isArray(conf.files)) {
    return mergeStream.apply(gulp, _.map(conf.files, register.bind(gulp, conf.options)))
  }

  return register(conf)
}


export default function bindToGulp(targetGulp) {
  targetGulp.DEV_MODE = DEV_MODE
  targetGulp.config = config
  targetGulp.pipeTimer = pipeTimer
  targetGulp.autoRegister = autoRegister
}

