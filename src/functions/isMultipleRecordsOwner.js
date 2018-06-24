function isMultipleRecordsOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  res.data.forEach(record => {
    if(record.owner === currentUserId) record.isOwner = true;
    //checks the id of the logged in user and the record owner, then sets isOwner to true so that it will be displayed in collections
  });
}

export default isMultipleRecordsOwner;
