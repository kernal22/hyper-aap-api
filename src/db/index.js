const mysql = require('mysql');
const config = require('config');
const dbConfig = config.get('db.mysql');
// const partnerdbConfig = config.get('db.partnerdb');
module.exports = {
	/**
     * @param {string} query
     * @param {array} params
     */
	execute: (query, params) => new Promise((resolve, reject) => {
		try {
			const pool = mysql.createPool({
				host: dbConfig.host,
				user: dbConfig.user,
				password: dbConfig.password,
				database: dbConfig.database,
				typeCast: (field, useDefaultTypeCasting) => {
					try {
						if (field.type === 'BIT' && field.length === 1) {
							const bytes = field.buffer();
							return bytes[0] === 1;
						}
						return useDefaultTypeCasting();
					} catch (error) {
						console.log('Casting failed ', error);
					}
				},
			});
			pool.config.queryFormat = function (q, values) {
				try {
					if (!values) return q;
					if (q.indexOf(':') === -1) {
						return mysql.format(q, values);
					}
					const finalQuery = q.replace(/:(\w+)/g, (txt, key) => {
						if (values.hasOwnProperty(key)) {
							return this.escape(values[key]);
						}
						return txt;
					});
					return finalQuery;
				} catch (_) {
					return q;
				}
			};
			pool.getConnection(function (err, connection) {
        if(err) {
          return reject(error);
        }
        connection.query(query, params, (error, data) => {
          if (error) {
            return reject(error);
          }
          connection.release();
          return resolve(data);
        });
      });
		} catch (error) {
			reject(error);
		}
	}),

	mongoConnect: (done) => {
		try {
			mongoose.connect(config.get('db.mongoUrl'),{ useNewUrlParser: true });
			mongodb = mongoose.connection;
			mongodb.on('error', () => {
				console.log('Mongo Connection Error');
			});
			mongodb.once('open', () => {
				console.log('Mongo Connected');
			});
			done();
		} catch (error) {
			done(error);
		}
	}
};
