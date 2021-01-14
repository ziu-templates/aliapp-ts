module.exports = {
  envComp: function(env = 'production') {
    return process.env.NODE_ENV === env
  },
  prjEnvComp: function(env = 'production') {
  return process.env.PRJ_ENV === env
}
};