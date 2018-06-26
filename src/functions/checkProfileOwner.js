function checkProfileOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  if(res.data._id === currentUserId) return true;
}

export default checkProfileOwner;
