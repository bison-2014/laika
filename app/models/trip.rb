class Trip
  include Mongoid::Document
  field :origin, type: Location
  field :destination, type: Location
  field :waypoints, type: Array
end
