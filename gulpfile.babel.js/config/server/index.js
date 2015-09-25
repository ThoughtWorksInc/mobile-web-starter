import gulp from 'gulp'
import compress from 'compression'
import middlewareMockServer from './libs/middlewareMockServer'

export default ()=> {

  const middlewares = [];

  middlewares.push(middlewareMockServer())

  if (process.env.NODE_ENV === 'production') {
    middlewares.push(compress())
  }

  return {
    src: [
      `${gulp.config('root.dist')}/{,**/}*.*'`
    ],
    options: {
      notify: false,
      logSnippet: false,
      snippetOptions: {
        ignorePaths: 'index.html'
      },
      port: process.env.PORT || 3000,
      server: {
        baseDir: `${gulp.config('root.dist')}`,
        middleware: middlewares
      },
      ui: {
        port: 9999
      }
    }
  }
}