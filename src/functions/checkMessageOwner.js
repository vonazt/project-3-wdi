function checkMessageOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  if(res.data.userOneId === currentUserId || res.data.userTwoId ===currentUserId ) return true;
}

export default checkMessageOwner;
