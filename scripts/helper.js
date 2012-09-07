Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});

Handlebars.registerHelper('role-checkbox-list', function(data, options) {
  var items = data.roles;
  var selected = data.user.selectedRoles;
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + '<li><input type="checkbox" id="' + items.id + '"';
    if(isSelected(items[i].id, selected))
    {
        out = out + ' checked ';
    }
    out = out + '>' + options.fn(items[i]) + '</input></li>';
  }

  return out + "</ul>";
});

var isSelected = function(id, list)
{
    for(var i = 0; i<list.length; i++)
    {
        if(id === list[i].id)
        {
            return true;
        }
    }
    return false;
}