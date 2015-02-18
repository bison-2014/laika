var App = App || {};

App.AttractionCollection = { items: [] };

// check if the attraction is already added to attractions (by checking id)
App.AttractionCollection.contains = function(newAttraction) {
  var contains = false
  this.items.forEach(function(existingAttraction) {
    new_ = newAttraction
    existing_ = existingAttraction

    if (newAttraction._id == existingAttraction.attrData._id) {
      contains = true;
    }
  })
  return contains;
}


App.AttractionCollection.add = function(attractions) {
  var self = this;
  newAttraction = attractions[0]
  attractions.forEach(function(newAttraction) {
    // only add the attraction if it isn't yet added
    if (!self.contains(newAttraction)) {
      self.items.push(new App.Attraction(newAttraction));
    }
  });
}
