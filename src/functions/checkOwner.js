function checkOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  if(res.data.owner === currentUserId || res.data.id === currentUserId) return true;
}

export default checkOwner;
