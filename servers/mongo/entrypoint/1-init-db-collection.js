db = db.getSiblingDB('transitweb');
db.createCollection('init', { capped: false });
db.init.insert([{ message: 'Created database.' }]);
