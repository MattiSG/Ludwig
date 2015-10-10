Template.registerHelper('json', (...values) => {
  return values.map(JSON.stringify).join('\n');
});