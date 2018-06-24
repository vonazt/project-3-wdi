function isRecordOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  if(res.data.owner === currentUserId) res.data.isOwner = true;
}

export default isRecordOwner;
