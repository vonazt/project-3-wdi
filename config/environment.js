const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/tall-man-records-${env}`;
const secret = 'rahLxf,y8$KAv23:';

module.exports = { port, dbURI, secret };
