function checkMessageOwner(res, $auth) {
  const currentUserId = $auth.getPayload().sub;
  if(res.data[0].userOneId._id === currentUserId || res.data[0].userTwoId._id ===currentUserId ) return true;
}

export default checkMessageOwner;
