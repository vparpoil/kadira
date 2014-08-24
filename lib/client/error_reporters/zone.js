if(window.Zone && Zone.inited && Kadira.options.appId) {
  Zone.Reporters.add('kadira', kadiraZoneReporter);
  Zone.collectAllStacks = Kadira.options.collectAllStacks;
}

function kadiraZoneReporter(zone) {
  var errorName = zone.erroredStack._e.message;
  
  if(Kadira.errors.isErrorExists(errorName)) {
    Kadira.errors.increamentErrorCount(errorName);
  } else if(Kadira.errors.canSendErrors()) {
    getErrorStack(zone, function(stacks) {
      Kadira.errors.sendError({
        appId : Kadira.options.appId,
        name : zone.erroredStack._e.message,
        source : 'client',
        startTime : zone.runAt,
        type : 'zone',
        info : getBrowserInfo(),
        stacks : stacks,
      });
    });
  }
}