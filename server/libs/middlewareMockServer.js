export default mockServer;

function mockServer() {

  const prism = require('connect-prism')

  prism.create({
    name: 'serve',
    mode: 'mock',
    context: '/api',
    host: 'localhost',
    port: 443,
    delay: '200',
    mockFilenameGenerator: function (config, request) {
      const httpVerb = request.method;
      const parsedUrl = request._parsedUrl;

      const urlPath = parsedUrl.pathname;
      let newMockFileName = urlPath.replace(/\//g, '_');
      newMockFileName = `${httpVerb}_${newMockFileName}.json`;

      return newMockFileName;
    },
    ignoreParameters: true,
    useApi: true
  });

  return prism.middleware
}