function isMultipleRecordsOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  return res.data.forEach(record => {
    if(record.owner.id === currentUserId);
  });
}

export default isMultipleRecordsOwner;
