const port = 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = `mongodb://localhost/tall-man-records-${env}`;
const secret = 'rahLxf,y8$KAv23:';

module.exports = { port, dbURI, secret };
