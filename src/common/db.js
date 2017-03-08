import Cloudant from 'cloudant';

// Main cloudant object
const cloudant = Cloudant({
  account: 'a7eaba15-d430-437c-b25f-b18ba6edaec3-bluemix',
  password: '3fd021819cdd84f17d0f4b17c33b8bd1238eff184c9262162d4f81c4a126b71d',
});

// Main db object
let db;

// Initializing db object
cloudant.db.destroy('cognitiveChallangeDB', () => {
  cloudant.db.create('cognitiveChallangeDB', () => {
    db = cloudant.use('cognitiveChallangeDB');
  });
});

// Exporting db object
export default db;
