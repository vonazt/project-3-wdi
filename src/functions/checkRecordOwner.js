function checkRecordOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  if(res.data.owner.id === currentUserId) return true;
}

export default checkRecordOwner;
